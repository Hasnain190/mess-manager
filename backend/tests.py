from django.test import TestCase

from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from decimal import Decimal
from django.contrib.auth.models import User

from backend.views.expenses_views import add_bill_payed, get_bill_per_student
from .models import *

from django.test import RequestFactory, TestCase
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from .models import Bill, PayingBill, User
from .serializers import PayingBillSerializer

# class BillTests(APITestCase):
#     def setUp(self):
#         self.user1 = User.objects.create(username='user1', room=32)
#         self.user2 = User.objects.create(username='user2', room=39)

#         self.user1.save()
#         self.user2.save()

#         self.expense1 = Expense.objects.create(
#             date='2022-01-01', expenses_first_time=100, expenses_second_time=200)
#         self.expense2 = Expense.objects.create(
#             date='2022-01-02', expenses_first_time=50, expenses_second_time=150)
#         self.attendance1 = Attendance.objects.create(
#             date='2022-01-01', student=self.user1, first_time='present', second_time='present')
#         self.attendance2 = Attendance.objects.create(
#             date='2022-01-02', student=self.user1, first_time='double', second_time='double')
#         self.attendance3 = Attendance.objects.create(
#             date='2022-01-01', student=self.user2, first_time='present', second_time='present')
#         self.attendance4 = Attendance.objects.create(
#             date='2022-01-02', student=self.user2, first_time='double', second_time='double')

#     def test_get_bill(self):
#         url = reverse('get_bill', args=[1])
#         response = self.client.get(url, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data['student'], self.user1.username)
#         self.assertEqual(response.data['room'], self.user1.room.number)
#         self.assertEqual(response.data['bill_first_time'], Decimal('0.50'))
#         self.assertEqual(response.data['bill_second_time'], Decimal('1.00'))
#         self.assertEqual(response.data['total_bill'], Decimal('1.50'))


class BillTestCase(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser', password='password')

    def test_bill_create(self):
        bill = Bill.objects.create(student=self.user, room='32', dateMonth='2023-01-30',
                                   bill=Decimal('1000.00'), dues=Decimal('500.00'))
        self.assertEqual(bill.student, self.user)
        self.assertEqual(bill.room, '32')
        self.assertEqual(bill.dateMonth, '2023-01-30')
        self.assertEqual(bill.bill, Decimal('1000.00'))
        self.assertEqual(bill.dues, Decimal('500.00'))

        self.assertEqual(str(bill), 'bill of testuser  for month  2023-01-30 ')


class BillPaymentTestCase(APITestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.user = User.objects.create_user(
            username='testuser', password='password'
        )
        self.bill = Bill.objects.create(
            bill=2000, student=self.user, dateMonth='2023-01-01', dues=0
        )

    def test_add_bill_payed(self):
        request = self.factory.post(
            'api/expenses/post/paying-bill/<int:year>/<int:month>/<int:user_id>'.format(
                2023, 1, self.user.id),
            {
                "last_bill_payed": 1000,

            }
        )
        request.user = self.user

        response = add_bill_payed(request, 2023, 1, self.user.id)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(PayingBill.objects.count(), 1)
        self.assertEqual(Bill.objects.get(id=self.bill.id).dues, 1000)
        self.assertEqual(
            response.data,
            PayingBillSerializer(PayingBill.objects.first()).data
        )


class GetBillPerUserTest(APITestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.user = User.objects.create_user(
            username='testuser', password='password'
        )
        self.bill = Bill.objects.create(
            bill=2000, student=self.user, dateMonth='2023-02-02', dues=0
        )

    def test_get_bill_per_user(self):
        request = self.factory.post(
            'api/expenses/get/<int:user_id>'.format(self.user.id),

        )
        request.user = self.user

        response = get_bill_per_student(request, self.user.id)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Bill.objects.count(), 1)
        self.assertEqual(
            response.data,
            Bill(Bill.objects.first()).data
        )
