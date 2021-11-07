from django.contrib import admin
from django.urls import path
import backend.views as views

urlpatterns = [
    path('users/', views.get_users , name='users'),
    path('user/<int:user_id>/', views.get_user , name='get_user'),
    path('user/login/', views.login_user , name='login'),
    path('user/logout/', views.logout_user , name='logout'),	
    path('user/register/',views.register_user , name='register'),
]
