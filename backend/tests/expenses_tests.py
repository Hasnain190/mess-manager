    
from backend.views.expenses_views import get_summed_expenses_for_date,add_expenses_per_capita_per_day
    
from django.test import TestCase,RequestFactory
from django.urls import reverse
from ..models import User
# from django.contrib.auth.models import User
from rest_framework.test import APITestCase

class ExpensesTests(APITestCase):
    def setUp(self) -> None:
        self.factory = RequestFactory()
        self.user = User.objects.create_user(
            username='testuser', password='password')
            
    def test_get_summed_expenses_for_date(self):
        date ='2023-03-23'
        
        request = self.factory.get('api/expenses/get/<str:date>/'.format(date))
        
        request.user  = self.user
        
        response = get_summed_expenses_for_date(request,date)
        
        print(response)
        
        self.assertEqual(response.status_code,200)
     
        

class test_for_getting_expenses_per_month (ExpensesTests):
    
    def test_get_summed_expenses_for_date(self):
        
        
        year = '2023'
        month = '7'
        
        request = self.factory.get("api/expenses/get/2023/07/")
        
        
        response = add_expenses_per_capita_per_day(request)
        
        self.assertEqual(response.status_code,200)
        