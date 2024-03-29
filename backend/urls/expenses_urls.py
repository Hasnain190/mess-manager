from unicodedata import name
from django.urls import path
import backend.views.expenses_views as views

urlpatterns = [
 
   # path('get-monthly-expenses-per-user/<int:month>/<int:user_id>/',views.get_monthly_expenses_per_user , name= "get monthly expenses per user"),
   path('post/', views.add_expenses_per_capita_per_day , name='post expenses per capita per day(gross)'),
   path('get/<int:month>/',view=views.get_expenses_per_month , name = "get expenses per month"),
   path("bill/<int:month>/", view = views.get_bill, name = "get monthly bill"),
   path("last-bill/<int:month>/", view = views.add_bill_payed, name = "add paying bill")
]
