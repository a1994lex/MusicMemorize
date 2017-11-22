"""Purchasing URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
# Django specific imports
from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
import Status.views as Sviews

urlpatterns = [
    url(r'', include('chem_auth.urls')),
    url(r'', include('homepage.urls')),
    url("^$", Sviews.list, name="index"),
    # url(r'^admin/', admin.site.urls, name="admin"),
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
