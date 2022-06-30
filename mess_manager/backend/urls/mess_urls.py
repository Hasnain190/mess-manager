from django.urls import URLPattern, path
import backend.views.mess_views as views


from rest_framework_simplejwt.views import TokenRefreshView , TokenObtainPairView


urlpatterns = [
    path('', views.get_mess_menu , name='get mess menu'),
    path('update/<str:day>/', views.udate_mess_menu , name='update mess menu'),
]