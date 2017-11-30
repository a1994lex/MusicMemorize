# Django specific imports
from django.shortcuts import render, render_to_response, redirect
from django.contrib.auth.decorators import login_required

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate
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
    print(request.user)
    if request.user.is_anonymous():
        return redirect('login')
    else:
        return render(request, "index.html")

def signup(request):
    print("INSIDE SIGNUP")
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('/')
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})
