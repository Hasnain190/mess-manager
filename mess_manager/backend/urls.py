
from django.urls import path
import backend.views as views


from rest_framework_simplejwt.views import TokenRefreshView , TokenObtainPairView

# from backend.views import EmailTokenObtainPairView

urlpatterns = [
    # admin
    path('', views.get_users , name='users'),
    path('<int:user_id>/', views.get_user , name='get_user'),
    path('delete/<int:user_id>/' , views.delete_user , name='delete'),
    path('update/<int:user_id>/' , views.update_user , name='update'),


    # user
    path('logout/', views.logout_user , name='logout'),	
    path('register/',views.register_user , name='register'),
   
    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),

   
    
]
