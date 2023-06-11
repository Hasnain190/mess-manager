from unicodedata import name
from django.urls import path
import backend.views.expenses_views as views

urlpatterns = [
    # api/expenses/


    path("post/", views.add_expenses_per_capita_per_day,
         name='post expenses per capita per day'),
    path('get/<int:user_id>/', view=views.get_bill_per_student,
         name="get bill per user "),

    path('get/<int:year>/<int:month>/', view=views.get_expenses_per_month,
         name="get expenses per month"),

    path("bill/<str:start_date>/<str:end_date>/",
         view=views.get_bill, name="get monthly bill"),



    # FIXME
    path("pay/bill/<int:year>/<int:month>/<int:user_id>/",
         view=views.add_bill_payed, name="add paying bill"),
]
