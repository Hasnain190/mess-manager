
import datetime
import logging
from decimal import Decimal

from backend.models import *
from backend.serializers import ExpenseSerializer

from backend.serializers import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework import status


@api_view(['POST'])
@permission_classes([IsAdminUser])
def add_expenses_per_capita_per_day(request):
    data = request.data

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
def get_expenses_per_month(request, year, month):

    expenses_per_month = Expense.objects.filter(
        date__month=month, date__year=year).order_by("-date")

    serializers = ExpenseSerializer(expenses_per_month, many=True)

    return Response(serializers.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_bill(request, year, month):
    year = int(year)
    month = int(month)
    try:
        # FIXME: creating the messbill object every time is computationally and storage wise , very unwise,so you need to fix this
        mess_bill, created = MessBill.objects.get_or_create(
            year=year, month=month)
        print(created)
        if created:
            total_expenses_first_time_all_user, total_expenses_second_time_all_user = expenses_all_users(
                year, month)

            # for the  total attendances of all the users
            bill_first_time_all_users, bill_second_time_all_users = bill_all_users(
                year, month, total_expenses_first_time_all_user, total_expenses_second_time_all_user)

            print("bill_first_time_all_users: ->", bill_first_time_all_users)

            calculate_bill(year, month, mess_bill,
                           bill_first_time_all_users, bill_second_time_all_users)

            serializers = MessBillSerializer(mess_bill, many=False)
            return Response(serializers.data)
        serializers = MessBillSerializer(mess_bill, many=False)
        return Response(serializers.data)

    except Exception as e:
        # replace 'YourAppName' with your actual app name
        logger = logging.getLogger('backend.views')
        logger.error(e)

        return Response(
            {'detail': f'An error occurred while calculating the bill.{e}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


def calculate_bill(year, month, mess_bill, bill_first_time_all_users, bill_second_time_all_users):
    year = str(year)
    month = str(month)
    for i in User.objects.all():
        user = User.objects.get(username=i.username)

        room = user.room

        # for the whole total attendances of one  user

        total_attendances_first_time_per_user = 0
        total_attendances_second_time_per_user = 0
        for i in Attendance.objects.filter(date__year=year, date__month=month, student=user):
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

            # print(total_attendances_second_time_per_user, user)

        try:
            bill_first_time = bill_first_time_all_users * \
                total_attendances_first_time_per_user
            bill_second_time = bill_second_time_all_users * \
                total_attendances_second_time_per_user
            print(bill_first_time, total_attendances_first_time_per_user, user)
        except ZeroDivisionError:
            bill_first_time = 0
            bill_second_time = 0

        total_bill_per_user = bill_first_time + bill_second_time

        if month == 1:
            prev_month = 12
            prev_year = int(year) - 1
        else:
            prev_month = int(month) - 1
            prev_year = year

        # Get the bill for the previous month
        pre_month_bill, _ = Bill.objects.get_or_create(
            month=prev_month, year=prev_year, student=user)
        print(pre_month_bill.dues)
        bill, _ = Bill.objects.update_or_create(
            student=user,
            room=room,
            bill=total_bill_per_user,
            month=month
        )

        bill.dues = pre_month_bill.dues
        bill.total = bill.dues + bill.bill
        bill.save()

        mess_bill.bills.add(bill)


def expenses_all_users(year, month):
    year = str(year)
    month = str(month)

    expenses_per_given_month = Expense.objects.filter(
        date__year=year, date__month=month)

    total_expenses_first_time_all_user = 0
    total_expenses_second_time_all_user = 0
    for i in expenses_per_given_month:
        expenses_first_time_all_user = i.expenses_first_time
        expenses_second_time_all_user = i.expenses_second_time
        total_expenses_first_time_all_user += expenses_first_time_all_user
        total_expenses_second_time_all_user += expenses_second_time_all_user
    print("total_expenses_first_time_all_user: ->",
          total_expenses_first_time_all_user)

    return total_expenses_first_time_all_user, total_expenses_second_time_all_user


def bill_all_users(year, month, total_expenses_first_time_all_user, total_expenses_second_time_all_user):
    year = str(year)
    month = str(month)
    total_attendances_first_time_all_users = 0
    total_attendances_second_time_all_users = 0
    for i in Attendance.objects.filter(date__year=year, date__month=month):
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


@ api_view(['POST', 'PUT'])
@ permission_classes([IsAdminUser])
def add_bill_payed(request, year, month, user_id):

    data = request.data
    user = User.objects.get(id=user_id)
    bill = Bill.objects.get(month=month,
                            year=year, student=user)

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
    print(created)
    if not created:
        print(bill.dues)
        bill.dues = bill.total - Decimal(bill_payed)
        # bill.prepayment = -dues if dues < 0 else 0
        bill.total = bill.dues
        bill.save()
        serializers = PayingBillSerializer(last_payed)
        return Response(serializers.data)
    serializers = PayingBillSerializer(last_payed)
    return Response(serializers.data)


def get_bill_per_student(request, user_id):
    user = User.objects.get(id=user_id)
    bill_per_user = Bill.objects.get(
        student=user, month=datetime.date.today().month)
    serializers = BillSerializer(bill_per_user)

    return Response(serializers.data)
