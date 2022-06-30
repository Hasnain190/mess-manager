from django.urls import path
import backend.views.expenses_views as views

urlpatterns = [
 
   path('post/', views.add_expenses_per_capita_per_day , name='post expenses per capita per day(gross)'),
   path('get/<int:month>/<int:user_id/',views.get_monthly_expenses_per_user , name= "get monthly expenses per user")
]
