from django.contrib import admin
from django.urls import path
import backend.views as views


urlpatterns = [
    path('', views.get_users , name='users'),
    path('<int:user_id>/', views.get_user , name='get_user'),
    path('logout/', views.logout_user , name='logout'),	
    path('register/',views.register_user , name='register'),
    path('login/', views.login_user , name='login'),
]
