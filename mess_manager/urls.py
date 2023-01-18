"""mess_manager URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    13. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from django.views.generic import TemplateView
# import debug_toolbar

urlpatterns = [
    #  path('__debug__/', include(debug_toolbar.urls)),
    path('django/admin/', admin.site.urls),

    path('api/expenses/', include('backend.urls.expenses_urls')),
    path('api/users/', include('backend.urls.user_urls')),
    path('api/mess/', include('backend.urls.mess_urls')),
    path('api/attendance/', include('backend.urls.attendance_urls')),

    path('', TemplateView.as_view(template_name='index.html')),
]
