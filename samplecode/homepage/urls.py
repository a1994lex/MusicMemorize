# Django specif import
from django.conf.urls import include, url
import homepage.views as views

urlpatterns = [

    url(r'^transfer/$', views.transfer, name='transfer'),
    url(r'', include("Status.urls")),
    url(r'', include("MakePurchase.urls")),
    url(r'', include("Management.urls")),

]
