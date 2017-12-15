# Django specific imports
from django.shortcuts import render, render_to_response, redirect
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth.models import User

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpResponse, Http404
from django.contrib.auth import login, authenticate, logout
from .forms import *
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

def logout_view(request):
    logout(request)
    return render(request, 'logout.html')

def signup(request):
    print("INSIDE SIGNUP")
    if request.method == 'POST':
        form = UserSignUp(request.POST)
        print("posting signup")
        if form.is_valid():
            print("form is valid")
            form.save()
            username = form.cleaned_data.get('username')
            group = form.cleaned_data.get('group_name')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password,)
            user.is_staff = True
            user.save()
            login(request, user)
            choir = Choir(director=user, group_name=group)
            choir.save()
            request.session['choir'] = choir.pk
            return redirect('/')
    else:
        form = UserSignUp()
    return render(request, 'signup.html', {'form': form})

def getChoir(user):
    if user.is_staff:
        return Choir.objects.get(director=user)
    elif Choir.objects.filter(group_user=user).exists():
        return Choir.objects.get(group_user=user)
    else:
        return None

@login_required
def home(request):
    print "in home"
    if 'songid' in request.session:
        del request.session['songid']
    if 'choir' in request.session:
        choir = Choir.objects.get(pk=request.session['choir'])
    else:
        choir = getChoir(request.user)
        if not choir: raise Http404("You don't have access to view the choir at this time")
        request.session['choir'] = choir.pk
    songlist = choir.song_set.all()

    if (not choir.group_user) and request.user.is_staff:
        form = GroupUserForm()
        if request.method == "POST":
            form = GroupUserForm(request.POST)
            if form.is_valid():
                print(form)
                username = form.cleaned_data.get('username')
                print(username)
                password = form.cleaned_data.get('password')
                choir.group_user = User.objects.create_user(username=username, password=password)
                choir.password = password
                choir.save()
        context = {'choir': choir, 'songlist': songlist, 'form': form}
    else:
        context = {'choir': choir, 'songlist': songlist}
    return render(request, "songlist.html", context)

@login_required
def grab_songs(request):
    if 'choir' in request.session:
        choirid = request.session['choir']
        choir = Choir.objects.get(pk=choirid)
        songlist = choir.song_set.all()
    else:
        songlist = None
    context = {'songlist': songlist}
    return render(request, "songs.html", context)

@user_passes_test(lambda u: u.is_staff)
def add_song(request):
    print "In song form "
    form = SongForm()
    choirid = request.session['choir']
    print("request method: {}".format(request.method))
    if request.method == "POST":
        print("INSIDE POST")
        form = SongForm(request.POST)
        if form.is_valid():
            print("CHOIR {}".format(choirid))
            song = form.save()
            song.choir = Choir.objects.get(pk=choirid)
            song.save()
        else:
            print("NOT VALID")
    context = {"songForm": form}
    return render(request, "addSong.html", context)


@login_required
def song_page(request, song_id):
    request.session['songid'] = song_id
    if not Song.objects.filter(pk=song_id).exists():
        raise Http404("This song doesn't exist")
    song = Song.objects.get(pk=song_id)
    flashcards = FlashCard.objects.filter(song=song_id)
    choir = Choir.objects.get(pk=request.session['choir'])
    context = {"song": song, "flashcards": flashcards, "choir": choir}
    return render(request, "songPage.html", context)


def flashcard_edit(request, flashid):
    return

def flashcard_new(request):
    return

@user_passes_test(lambda u: u.is_staff)
def edit_song(request):
    if 'songid' not in request.session:
        return redirect('/')
    song = Song.objects.get(pk=request.session['songid'])
    flashcards = FlashCard.objects.filter(song=song)
    form = SongForm(instance=song)
    print(form)
    if request.method == "POST":
        form = SongForm(request.POST, instance=song)
        if form.is_valid():
            song = form.save()
            song.save()
    choir = Choir.objects.get(pk=request.session['choir'])
    context = {"form": form, "song": song, "flashcards": flashcards, "choir":choir}
    return render(request, "editSongPage.html", context)

@user_passes_test(lambda u: u.is_staff)
def add_card(request):
    edit = False;
    if 'songid' not in request.session:
        return redirect('/')
    song = Song.objects.get(pk=request.session['songid'])
    flashid = request.GET.get('edit')
    if request.method == "POST":
        print("POST")
        flashid = request.POST.get('edit')
        print('edit id {}'.format(flashid))
        if flashid:
            cardform = FlashCardForm(request.POST, instance=FlashCard.objects.get(pk=flashid))
        else:
            cardform = FlashCardForm(request.POST)
        if cardform.is_valid():
            print("FORM IS VALID")
            if flashid:
                cardform.save()
            else:
                card = cardform.save()
                card.song = song
                card.save()
            print("Card saved")
    elif flashid:
        cardform = FlashCardForm(instance=FlashCard.objects.get(pk=flashid))
        edit = True
    else:
        cardform = FlashCardForm()
    context = {"cardform": cardform, "edit": edit}
    return render(request, "addCard.html", context)

@user_passes_test(lambda u: u.is_staff)
def delete_card(request):
    card_id = request.GET.get('deleteId')
    flashcard = FlashCard.objects.filter(pk=card_id)
    flashcard.delete()
    return redirect('getCards')

def get_cards(request):
    if 'songid' not in request.session:
        return redirect('/')
    song = Song.objects.get(pk=request.session['songid'])
    flashcards = FlashCard.objects.filter(song=song)
    print("FLASHCARDS {}".format(flashcards))
    context = { 'flashcards': flashcards}
    return render(request, "cards.html", context)


@user_passes_test(lambda u: u.is_staff)
def ajax_edit_song(request):
    if 'songid' not in request.session:
        return redirect('/')
    song = Song.objects.get(pk=request.session['songid'])
    flashcards = FlashCard.objects.filter(song=song)
    form = SongForm(instance=song)
    print(form)
    if request.method == "POST":
        form = SongForm(request.POST, instance=song)
        if form.is_valid():
            song = form.save()
            song.save()
    choir = Choir.objects.get(pk=request.session['choir'])
    context = {"form": form, "song": song, "flashcards": flashcards, "choir": choir}
    return render(request, "ajax_editSongPage.html", context)

@user_passes_test(lambda u: u.is_staff)
def delete_song(request):
    if 'songid' in request.session:
        print(request.session['songid'])
        try:
            song = Song.objects.get(pk=request.session['songid'])
            song.delete()
        except:
            print "song is gone"
        del request.session['songid']
    return redirect('home', permanent=True)
