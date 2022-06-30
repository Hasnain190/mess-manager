
from django.urls import path
import backend.views.attendance_view as views


from rest_framework_simplejwt.views import TokenRefreshView , TokenObtainPairView

# from backend.views import EmailTokenObtainPairView

urlpatterns = [
 
   path('post/<int:id>/', views.post_attendance , name='post attendance'),
   path('get/',view=views.get_attendance, name="get all attendance")
]
