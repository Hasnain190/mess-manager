
from django.urls import path
import backend.views.user_views as user_views


from rest_framework_simplejwt.views import TokenRefreshView , TokenObtainPairView

# from backend.views import EmailTokenObtainPairView

urlpatterns = [
    # admin
    path('', user_views.get_users , name='users'),
    path('<int:user_id>/', user_views.get_user , name='get_user'),
    path('delete/<int:user_id>/' , user_views.delete_user , name='delete'),
    path('update/<int:user_id>/' , user_views.update_user , name='update'),


    # user
    path('logout/', user_views.logout_user , name='logout'),	
    path('register/',user_views.register_user , name='register'),
   
    path('login/', user_views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),

   
    
]
