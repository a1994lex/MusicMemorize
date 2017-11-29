# Django specif import
from django.conf.urls import include, url
import memorize.views as views

urlpatterns = [

    url(r'^signup/$', views.signup, name='signup'),
    url(r'', views.index, name='index'),


]
