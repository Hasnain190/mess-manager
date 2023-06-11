
import datetime
from logging import root
from math import fabs
from django.shortcuts import render

from backend.models import *
from backend.serializers import ExpenseSerializer

from backend.serializers import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser


@api_view(['POST'])
@permission_classes([IsAdminUser])
def add_expenses_per_capita_per_day(request):
    data = request.data

    # try:

    Expenses_per_day, created = Expense.objects.update_or_create(
        date=data['date'],

        defaults={
            "attendance_first_time": data['attendance_first_time'],
            "attendance_second_time": data['attendance_second_time'],
            "total_attendances": data['total_attendances'],
            "expenses_first_time": data['expenses_first_time'],
            "expenses_second_time": data['expenses_second_time'],
            "expenses_total": data['expenses_total'],
        }
    )

    serializer = ExpenseSerializer(Expenses_per_day, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_expenses_per_month(request, month, year):

    expenses_per_month = Expense.objects.filter(
        date__month=month, date__year=year).order_by("-date")

    serializers = ExpenseSerializer(expenses_per_month, many=True)

    return Response(serializers.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_bill(request, start_date, end_date):

    # calculating all the dates which come in between start date and the end date
    date_range = []
    current_date = start_date
    while current_date <= end_date:
        date_range.append(current_date)
        current_date += datetime.timedelta(days=1)

 # the bill will be calculated on demand

    mess_bill = MessBill.objects.create()

    total_expenses_first_time_all_user, total_expenses_second_time_all_user = expenses_all_users(
        start_date, end_date)

    # for the  total attendances of all the users
    bill_first_time_all_users, bill_second_time_all_users = bill_all_users(
        start_date, end_date, total_expenses_first_time_all_user, total_expenses_second_time_all_user)

    print("bill_first_time_all_users: ->", bill_first_time_all_users)
    # print(User.objects.all())
    calculate_bill(start_date, end_date, mess_bill,
                   bill_first_time_all_users, bill_second_time_all_users)

    serializers = MessBillSerializer(mess_bill, many=False)
    return Response(serializers.data)


def calculate_bill(start_date, end_date, mess_bill, bill_first_time_all_users, bill_second_time_all_users):
    for i in User.objects.all():
        user = User.objects.get(username=i.username)

        room = user.room

        # for the whole total attendances of one  user

        total_attendances_first_time_per_user = 0
        total_attendances_second_time_per_user = 0
        for i in Attendance.objects.filter(date__range=(start_date, end_date), student=user):
            if i.first_time == "present":
                total_attendances_first_time_per_user += 1
            elif i.first_time == "double":
                total_attendances_first_time_per_user += 2
            elif i.first_time == "absent":
                total_attendances_first_time_per_user += 0

            if i.second_time == "present":
                total_attendances_second_time_per_user += 1
            elif i.second_time == "double":
                total_attendances_second_time_per_user += 2
            elif i.second_time == "absent":
                total_attendances_second_time_per_user += 0

            # for live tracking ...
            # total_attendances_per_user += (
            #     total_attendances_first_time_per_user + total_attendances_second_time_per_user)
        try:
            bill_first_time = bill_first_time_all_users / \
                total_attendances_first_time_per_user
            bill_second_time = bill_second_time_all_users / \
                total_attendances_second_time_per_user

        except ZeroDivisionError:
            bill_first_time = 0
            bill_second_time = 0

        total_bill_per_user = bill_first_time + bill_second_time
# FIXME
        bill, created = Bill.objects.get_or_create(
            student=user,
            room=room,
            bill=total_bill_per_user,
            dateMonth=date
        )
        bill.total = float(bill.dues) + float(bill.bill)
        bill.dues = bill.total
        bill.save()

        mess_bill.bills.add(bill)


def expenses_all_users(start_date, end_date):

    expenses_per_given_range = Expense.objects.filter(
        date__range=(start_date, end_date))

    total_expenses_first_time_all_user = 0
    total_expenses_second_time_all_user = 0
    for i in expenses_per_given_range:
        expenses_first_time_all_user = i.expenses_first_time
        expenses_second_time_all_user = i.expenses_second_time
        total_expenses_first_time_all_user += expenses_first_time_all_user
        total_expenses_second_time_all_user += expenses_second_time_all_user
    print("total_expenses_first_time_all_user: ->",
          total_expenses_first_time_all_user)

    return total_expenses_first_time_all_user, total_expenses_second_time_all_user


def bill_all_users(start_date, end_date, total_expenses_first_time_all_user, total_expenses_second_time_all_user):
    total_attendances_first_time_all_users = 0
    total_attendances_second_time_all_users = 0
    for i in Attendance.objects.filter(date__range=(start_date, end_date)):
        if i.first_time == "present":
            total_attendances_first_time_all_users += 1
        elif i.first_time == "double":
            total_attendances_first_time_all_users += 2
        elif i.first_time == "absent":
            total_attendances_first_time_all_users += 0

        if i.second_time == "present":
            total_attendances_second_time_all_users += 1
        elif i.second_time == "double":
            total_attendances_second_time_all_users += 2
        elif i.second_time == "absent":
            total_attendances_second_time_all_users += 0
    try:
        bill_first_time_all_users = total_expenses_first_time_all_user / \
            total_attendances_first_time_all_users
        bill_second_time_all_users = total_expenses_second_time_all_user / \
            total_attendances_second_time_all_users
    except ZeroDivisionError:
        bill_first_time_all_users = 0
        bill_second_time_all_users = 0
    return bill_first_time_all_users, bill_second_time_all_users


@api_view(['POST', 'PUT'])
@permission_classes([IsAdminUser])
def add_bill_payed(request, year, month, user_id):
    date = datetime.date(year, month, 28)
    data = request.data
    user = User.objects.get(id=user_id)
    bill = Bill.objects.get(dateMonth__month=month,
                            dateMonth__year=year, student=user)

    bill_payed = data["paying_bill"]
    print(bill_payed)
    bill_payed_date = datetime.date.today()

    last_payed, created = PayingBill.objects.update_or_create(
        student=user,
        paying_date__year=year,
        paying_date__month=month,
        defaults={
            "current_bill": bill,
            "paying_bill": bill_payed,
            "paying_date": bill_payed_date
        }
    )

    dues = float(bill.bill) - float(bill_payed)
    bill.dues = dues
    bill.total = dues + float(bill.bill)
    bill.save()

    serializers = PayingBillSerializer(last_payed)

    return Response(serializers.data)


def get_bill_per_student(request, user_id):
    user = User.objects.get(id=user_id)
    bill_per_user = Bill.objects.get(
        student=user, dateMonth=datetime.date.today())
    serializers = BillSerializer(bill_per_user)

    return Response(serializers.data)
