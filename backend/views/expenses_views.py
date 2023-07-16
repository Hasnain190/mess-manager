
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
        mess_bill, created = MessBill.objects.get_or_create(
            year=year, month=month)

        total_expenses_first_time_all_user, total_expenses_second_time_all_user = expenses_all_users(
                year, month)

        bill_first_time_all_users, bill_second_time_all_users = bill_all_users(
                year, month, total_expenses_first_time_all_user, total_expenses_second_time_all_user)

        calculate_bill(year, month, mess_bill,
                           bill_first_time_all_users, bill_second_time_all_users)
        mess_bill.save()
        serializers = MessBillSerializer(mess_bill, many=False)
        return Response(serializers.data)

    except Exception as e:
        logger = logging.getLogger('backend.views')
        logger.error(e)

        return Response(
            {'detail': f'An error occurred while calculating the bill.{e}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


def calculate_bill(year, month, mess_bill, bill_first_time_all_users, bill_second_time_all_users):
    year = str(year)
    month = str(month)
    # removing previous bills
    
   
    mess_bill.bills.clear()
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
            prev_year = int(year)
       
        # Get the bill for the previous month
        try:
            pre_month_bill = Bill.objects.get(student=user, month=prev_month, year=prev_year)
           
        except Bill.DoesNotExist:
            pre_month_bill = Bill.objects.create(
            student=user,
            room=room,
            month=prev_month,
            year=int(prev_year),
           
            )

        
        print(pre_month_bill.dues)
        try:
            bill = Bill.objects.get(student=user, room=room, month=month, year=int(year))
            bill.bill = total_bill_per_user
            bill.save()
        except Bill.DoesNotExist:
            bill = Bill.objects.create(
            student=user,
            room=room,
            month=month,
            year=int(year),
            bill=total_bill_per_user
            )


        
        # add payed bills if any  to calculate final bill
        
        payments = PayingBill.objects.filter(student=user,for_month = month)
        total_payments = 0
        for payment in payments:
            total_payments +=Decimal( payment.paying_bill)
        
        
        bill.dues = pre_month_bill.dues
        bill.total = bill.dues + bill.bill - total_payments
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
    for_month = int(data["for_month"])
    
    print(bill_payed)
    bill_payed_date = datetime.date.today()

    last_payed = PayingBill.objects.create(
        student=user,
        paying_date = bill_payed_date,
        current_bill = bill,
        paying_bill = bill_payed,
        for_month = month
       )
   
   
    bill.dues = bill.total - Decimal(bill_payed)
        # bill.prepayment = -dues if dues < 0 else 0
    bill.total = bill.dues
    bill.save()
    serializers = PayingBillSerializer(last_payed)
    return Response(serializers.data)
    


def get_bill_per_student(request, user_id):
    user = User.objects.get(id=user_id)
    bill_per_user = Bill.objects.get(
        student=user, month=datetime.date.today().month)
    serializers = BillSerializer(bill_per_user)

    return Response(serializers.data)
