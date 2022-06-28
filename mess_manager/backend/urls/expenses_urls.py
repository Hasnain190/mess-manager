
from django.urls import path
import backend.views.expenses_views as views

urlpatterns = [
 
   path('post/', views.add_expenses_per_capita_per_day , name='post expenses per capita per day(gross)'),
]
