# Django specific imports
from django.shortcuts import render, render_to_response
from django.contrib.auth.decorators import login_required

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpResponse
# from django.contrib.auth.decorators import user_is_admin

# from MakePurchase import models as imod
# from Management import models as imod
# from Status import models as imod
import pdb


def index(request):
    """
    Transfers old database models to the current database
    Sudo Code for Transfer:
    Look at datatransfer.py
    """

    return render(request, "base.html")
