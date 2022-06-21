
from django.urls import path
import backend.attendance_view as views


from rest_framework_simplejwt.views import TokenRefreshView , TokenObtainPairView

# from backend.views import EmailTokenObtainPairView

urlpatterns = [
 
   path('post/', views.post_attendance , name='post attendance'),
    # path('<int:user_id>/attendance/', views.mark_attendance , name='mark_attendance'),
    # path('attendance/', views.submit_attendance , name='submit_attendance')
   
]
