
from django.urls import path
import backend.views.attendance_view as views


from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

# from backend.views import EmailTokenObtainPairView

urlpatterns = [
    # api/attendance/

    path('post/<int:id>/', views.post_attendance, name='post attendance'),
    path('get/', view=views.get_attendance, name="get all attendance"),
    path('get/<int:month>/', view=views.get_monthly_attendance,
         name="get attendance by month"),
   
    path('get/<str:date>/', view=views.get_daily_attendance,
         name="get attendance by date"),
         
     path("get/calculate/<str:date>/",
         view=views.calculate_attendances, name="get first and second time attendance in given date"),
]
