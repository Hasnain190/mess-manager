
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

from rest_framework import status

from django.contrib.auth import get_user_model

from functools import reduce

from decimal import Decimal


@api_view(['POST'])
@permission_classes([])
def add_expenses_per_capita_per_day(request):
    data = request.data

    # try:

    if Expense.objects.filter(date=data['date']).exists():
        obj = Expense.objects.get(date=data["date"])
        obj.delete()

        Expenses_per_day = Expense.objects.create(
            date=data['date'],
            attendance_first_time=data['attendance_first_time'],
            attendance_second_time=data['attendance_second_time'],
            total_attendances=data['total_attendances'],
            expenses_first_time=data['expenses_first_time'],
            expenses_second_time=data['expenses_second_time'],
            # expenses_per_attendance=data['expenses_per_attendance'],
        )

        serializer = ExpenseSerializer(Expenses_per_day, many=False)
        return Response(serializer.data)
    else:

        Expenses_per_day = Expense.objects.create(
            date=data['date'],
            attendance_first_time=data['attendance_first_time'],
            attendance_second_time=data['attendance_second_time'],
            total_attendances=data['total_attendances'],
            expenses_first_time=data['expenses_first_time'],
            expenses_second_time=data['expenses_second_time'],
            expenses_total=data['expenses_total'],
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
def get_bill(request, year, month):
    date = datetime.datetime(year, month, 1)
    try:
        print("after try_____")
        # mess_bill = MessBill.objects.filter(dateMonth__month=month)

        mess_bill = MessBill.objects.get(dateMonth__month=month)
    except:
        print("after except____________________________")

        mess_bill = MessBill.objects.create(dateMonth=date)

        expenses_per_month = Expense.objects.filter(
            date=date).order_by("-date")

        total_expenses_first_time_all_user = 0
        total_expenses_second_time_all_user = 0
        for i in expenses_per_month:
            expenses_first_time_all_user = i.expenses_first_time
            expenses_second_time_all_user = i.expenses_second_time
            total_expenses_first_time_all_user += expenses_first_time_all_user
            total_expenses_second_time_all_user += expenses_second_time_all_user

# ## attendances ##

        # for the whole total attendances of all the users
        total_attendances_first_time_all_users = 0
        total_attendances_second_time_all_users = 0
        for i in Attendance.objects.filter(date__month=month, date__year=year):
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

        bill_first_time_all_users = total_attendances_first_time_all_users / \
            total_expenses_first_time_all_user
        bill_second_time_all_users = total_attendances_second_time_all_users / \
            total_expenses_second_time_all_user

        # print(User.objects.all())
        for i in User.objects.all():
            user = User.objects.get(username=i.username)

            room = user.room

            # for the whole total attendances of one  user
            total_attendances_of_that_user = 0
            for i in Attendance.objects.filter(date__month=month, date__year=year, student=user):
                total_attendances_first_time_per_user = 0
                if i.first_time == "present":
                    total_attendances_first_time_per_user += 1
                elif i.first_time == "double":
                    total_attendances_first_time_per_user += 2
                elif i.first_time == "absent":
                    total_attendances_first_time_per_user += 0

                total_attendances_second_time_per_user = 0
                if i.second_time == "present":
                    total_attendances_second_time_per_user += 1
                elif i.second_time == "double":
                    total_attendances_second_time_per_user += 2
                elif i.second_time == "absent":
                    total_attendances_second_time_per_user += 0

                total_attendances_of_that_user += (
                    total_attendances_first_time_per_user + total_attendances_second_time_per_user)

                bill_first_time = bill_first_time_all_users / \
                    total_attendances_first_time_per_user
                bill_second_time = bill_second_time_all_users / \
                    total_attendances_second_time_per_user

                total_bill_per_user = bill_first_time + bill_second_time

                # calculate last month total bill and how much the user had payed in the last month to calculate total dues

                bill = Bill.objects.create(
                    student=user,
                    room=room,
                    bill=total_bill_per_user,
                    dateMonth=date
                )

                mess_bill = MessBill.bill.add(bill)

        mess_bill = MessBill.objects.get(dateMonth__month=month)
    serializers = MessBillSerializer(mess_bill, many=False)
    return Response(serializers.data)


@api_view(['POST', 'PUT'])
@permission_classes([])
def add_bill_payed(request, month, user_id):
    data = request.data
    user = User.objects.get(id=user_id)

    bill = Bill.objects.get(month=month, student=user)

    last_bill_payed = data["last_bill_payed"]
    last_bill_payed_date = data["last_bill_payed_date"]

    if not PayingBill.objects.filter(student=user, last_bill_payed_date__month=month).exists():
        last_payed = PayingBill.objects.create(
            bill=bill.bill,
            student=user,
            last_bill_payed=last_bill_payed,
            last_bill_payed_date=last_bill_payed_date
        )
        dues = bill.bill - last_bill_payed
        bill.dues = dues
        bill.save()
        last_payed.save()

    else:
        last_payed = PayingBill.objects.update(
            bill=bill.id,
            student=user,
            last_bill_payed=last_bill_payed,
            last_bill_payed_date=last_bill_payed_date

        )
        dues = bill.bill - last_bill_payed
        bill.dues = dues
        bill.save()
        last_payed.save()

    serializers = PayingBillSerializer(last_payed)

    return Response(serializers.data)


@api_view(['GET'])
@permission_classes([])
def get_monthly_expenses_per_user(request, month, user_id):
    user = User.objects.get(id=user_id)
    total_expenses_in_that_month_set = Expense.objects.filter(
        date__month=month)

    total_attendances_in_that_month = 0
    for i in Attendance.objects.filter(date__month=month):
        if i["first_time"] == "present":
            total_attendances_in_that_month += 1
        elif i["second_time"] == "present":
            total_attendances_in_that_month += 1
        return total_attendances_in_that_month

    total_expenses = 0
    for i in total_expenses_in_that_month_set:
        expenses = i["expenses"]
        total_expenses += expenses
        return total_expenses

    serializers = []
    for i in User.objects.all():
        user = i
        total_monthly_attendances_from_that_user = Attendance.objects.filter(
            student=user, date__month=month)

        bill_for_that_user = total_expenses / total_attendances_in_that_month * \
            total_monthly_attendances_from_that_user

        bill = Bill.objects.create(
            student=user,
            bill=bill_for_that_user
        )
        serializer = BillSerializer(bill)
        serializers.append(serializer.data)

    return Response(serializers)
