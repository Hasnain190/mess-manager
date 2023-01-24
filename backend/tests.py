from django.test import TestCase

from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from decimal import Decimal
from django.contrib.auth.models import User
from .models import *


class BillTests(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create(username='user1', room=32)
        self.user2 = User.objects.create(username='user2', room=39)

        self.user1.save()
        self.user2.save()

        self.expense1 = Expense.objects.create(
            date='2022-01-01', expenses_first_time=100, expenses_second_time=200)
        self.expense2 = Expense.objects.create(
            date='2022-01-02', expenses_first_time=50, expenses_second_time=150)
        self.attendance1 = Attendance.objects.create(
            date='2022-01-01', student=self.user1, first_time='present', second_time='present')
        self.attendance2 = Attendance.objects.create(
            date='2022-01-02', student=self.user1, first_time='double', second_time='double')
        self.attendance3 = Attendance.objects.create(
            date='2022-01-01', student=self.user2, first_time='present', second_time='present')
        self.attendance4 = Attendance.objects.create(
            date='2022-01-02', student=self.user2, first_time='double', second_time='double')

    def test_get_bill(self):
        url = reverse('get_bill', args=[1])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['student'], self.user1.username)
        self.assertEqual(response.data['room'], self.user1.room.number)
        self.assertEqual(response.data['bill_first_time'], Decimal('0.50'))
        self.assertEqual(response.data['bill_second_time'], Decimal('1.00'))
        self.assertEqual(response.data['total_bill'], Decimal('1.50'))
