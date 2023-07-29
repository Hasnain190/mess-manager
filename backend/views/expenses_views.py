
import datetime
import logging
from decimal import Decimal, InvalidOperation

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
    date=data.get("date")
    
    
    attendance_first_time,attendance_second_time = calculate_attendances_local(date=date) 
    
    expenses_per_day, created = Expense.objects.update_or_create(
    date = date,

        defaults={
            "attendance_first_time":attendance_first_time ,
            "attendance_second_time": attendance_second_time,
            "total_attendances": attendance_first_time+attendance_second_time,
            "expenses_meat":data['expenses_meat'],
            "expenses_vegetables":data['expenses_vegetables'],
            "expenses_grocery_and_other":data["expenses_grocery_and_other"],
            "expenses_first_time": data['expenses_first_time'],
            "expenses_second_time": data['expenses_second_time'],
            "expenses_total": data['expenses_total'],
        }
    )
    
    expenses_per_day.save()
    
    print("first:",attendance_first_time,attendance_second_time)

    serializer = ExpenseSerializer(expenses_per_day, many=False)
    return Response(serializer.data)




def calculate_attendances_local(date):
    total_attendances_first_time_all_users = 0
    total_attendances_second_time_all_users = 0
    for i in Attendance.objects.filter(date=date):
        if i.first_time in ["present", "double", "absent"]:
            total_attendances_first_time_all_users += get_numeric_attendance(i.first_time)
        else:
            try:
                total_attendances_first_time_all_users += Decimal(i.first_time)  # convert to decimal
            except InvalidOperation:
                total_attendances_first_time_all_users += 0  # Handle the exception

        if i.second_time in ["present", "double", "absent"]:
            total_attendances_second_time_all_users += get_numeric_attendance(i.second_time)
        else:
            try:
                total_attendances_second_time_all_users += Decimal(i.second_time)  # convert to decimal
            except InvalidOperation:
                total_attendances_second_time_all_users += 0  # Handle the exception

    return total_attendances_first_time_all_users,total_attendances_second_time_all_users


def get_numeric_attendance(value):
    if value == "present":
        return 1
    elif value == "double":
        return Decimal(2.50)
    elif value == "absent":
        return 0
    else:
        return 0

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_expenses_per_month(request, year, month):

    expenses_per_month = Expense.objects.filter(
        date__month=month, date__year=year).order_by("-date")

    serializers = ExpenseSerializer(expenses_per_month, many=True)

    return Response(serializers.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_summed_expenses_for_date(request, date):

    first_day_of_month = date.replace(date.split("-")[2],"01")

    meat_sum = 0
    vegetable_sum = 0
    grocery_and_other_sum = 0
    
    all_expenses_in_that_month = Expense.objects.filter(date__range=[first_day_of_month,date])
    for i in all_expenses_in_that_month:
        meat_sum +=i.expenses_meat
        vegetable_sum += i.expenses_vegetables
        grocery_and_other_sum += i.expenses_grocery_and_other
    return Response({"meat_sum":meat_sum,"vegetable_sum":vegetable_sum,"grocery_and_other_sum":grocery_and_other_sum})
    


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_bill(request, year, month):
    year = int(year)
    month = int(month)
    try:
        mess_bill, created = MessBill.objects.get_or_create(
            year=year, month=month)
# 1. sum all the expenses throughout the month 
# (separately in the first and second time)
        total_expenses_first_time_all_user, total_expenses_second_time_all_user = expenses_all(
                year, month)

        rate_first, rate_second = calculate_rate(
                year, month, total_expenses_first_time_all_user, total_expenses_second_time_all_user)

        calculate_bill(year, month, mess_bill,rate_first, rate_second)
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


def calculate_bill(year, month, mess_bill, rate_first, rate_second):
    year = str(year)
    month = str(month)
    # removing previous bills
    

    mess_bill.bills.clear()
    for i in User.objects.all():
        user = User.objects.get(username=i.username)

        room = user.room

        
# 4. Calculate total attendance of one user
        attendances_first_per_user = 0
        attendances_second_per_user = 0
        for i in Attendance.objects.filter(date__year=year, date__month=month, student=user):
            if i.first_time == "present":
                attendances_first_per_user += 1
            elif i.first_time == "double":
                attendances_first_per_user += Decimal(2.5)
            elif i.first_time == "absent":
                attendances_first_per_user += 0
            else: 
                print(i.first_time)
                attendances_first_per_user += Decimal(i.first_time)
        
            if i.second_time == "present":
                attendances_second_per_user += 1
            elif i.second_time == "double":
                attendances_second_per_user += Decimal(2.5)
            elif i.second_time == "absent":
                attendances_second_per_user += 0
            else:
                print(i.second_time)
                attendances_second_per_user += Decimal(i.second_time)

# 5. Multiply rate by total attendance eaten by user
        try:
            total_attendances = attendances_first_per_user + attendances_second_per_user
            bill_first = rate_first * \
                attendances_first_per_user
            bill_second = rate_second * \
                attendances_second_per_user
            # print(bill_first_time, attendances_first_per_user, user)
        except ZeroDivisionError:
            bill_first = 0
            bill_second = 0

        total_bill_per_user = bill_first + bill_second

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

        
       
        try:
            bill = Bill.objects.get(student=user, room=room, month=month, year=int(year))
            bill.bill = total_bill_per_user
            bill.total_attendances = total_attendances
            bill.save()
        
        except Bill.DoesNotExist:
            bill = Bill.objects.create(
            student=user,
            room=room,
            month=month,
            total_attendances = total_attendances,
            year=int(year),
            bill=total_bill_per_user
            )


        
        # add payed bills if any  to calculate final bill
        
        payments = PayingBill.objects.filter(student=user,for_month = month)
        total_payments = 0
        for payment in payments:
            total_payments +=Decimal( payment.paying_bill)
        
        
        bill.dues = pre_month_bill.dues + bill.bill - total_payments
        bill.total = bill.dues 
        bill.save()

        mess_bill.bills.add(bill)


def expenses_all(year, month):
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
    print("total_expenses_second_time_all_user: ->",
          total_expenses_second_time_all_user)

    return total_expenses_first_time_all_user, total_expenses_second_time_all_user


def calculate_rate(year, month, total_expenses_first_time_all_user, total_expenses_second_time_all_user):
# 2. Get to know all the attendances (separately for first and second time)
    year = str(year)
    month = str(month)
    total_attendances_first_time_all_users = 0
    total_attendances_second_time_all_users = 0
    for i in Attendance.objects.filter(date__year=year, date__month=month):
        if i.first_time == "present":
            total_attendances_first_time_all_users += 1
        elif i.first_time == "double":
            total_attendances_first_time_all_users += Decimal( 2.5)
        elif i.first_time == "absent":
            total_attendances_first_time_all_users += 0
        else:
            print(f"here is ${i.first_time} lies the error")
            total_attendances_first_time_all_users += Decimal( i.first_time)

        if i.second_time == "present":
            total_attendances_second_time_all_users += 1
        elif i.second_time == "double":
            total_attendances_second_time_all_users += Decimal( 2.5)
        elif i.second_time == "absent":
            total_attendances_second_time_all_users += 0
        else:
            total_attendances_second_time_all_users += Decimal(i.second_time)
    try:
    # 3. calculate kharcha per khana (rate ) like 129 pkr/ attendance jo bill k uper likha hota hai 
        rate_first = total_expenses_first_time_all_user / \
            total_attendances_first_time_all_users
        rate_second= total_expenses_second_time_all_user / \
            total_attendances_second_time_all_users
            
        print({"rate_first:",rate_first,"\n rate_second:",rate_second})
    except ZeroDivisionError:
        rate_first = 0
        rate_second = 0
    return rate_first, rate_second


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
    # print(f"total: {bill.total} \n dues:{bill.dues} \n payment: {bill_payed} \n month: {month} ")
    serializers = PayingBillSerializer(last_payed)
    return Response(serializers.data)
    


def get_bill_per_student(request, user_id):
    user = User.objects.get(id=user_id)
    bill_per_user = Bill.objects.get(
        student=user, month=datetime.date.today().month)
    serializers = BillSerializer(bill_per_user,many=False)

    return Response(serializers.data)
