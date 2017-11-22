# Django specific imports
from django.shortcuts import render, render_to_response
from django.contrib.auth.decorators import login_required, user_passes_test
from MakePurchase.models import Purchase
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpResponse
# from django.contrib.auth.decorators import user_is_admin
from .datatransfer import DataTransfer
# from MakePurchase import models as imod
# from Management import models as imod
# from Status import models as imod
import pdb


@user_passes_test(lambda u: u.is_superuser)
def transfer(request):
    """
    Transfers old database models to the current database
    Sudo Code for Transfer:
    Look at datatransfer.py
    """
    print("IN THE TRANSFER VIEW")
    d = DataTransfer()
    d.run()

    return render(request, "transferdone.html")
