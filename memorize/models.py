# Necessary imports for models.py functionality
from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Choir(models.Model):
    """
    A choir object is the main object which the site will use to determine
    the songs being sung by the choir, the directors name, the group name,
    and any other userful info about the choir profile
    """
    director = models.ForeignKey(
                User,
                default=1,)
    group_user = models.ForeignKey(
                User,
                null=True,
                blank=True,
                related_name='+')
    group_name = models.CharField(
                max_length=100,
                default="Best Choir in the World",)
    password = models.CharField(
                max_length=150,
                null=True,
                blank=True,)

class Song(models.Model):
    """
    A song object is related to the choir object and contains a title, text,
    verses. It's pretty awesome, and flashcards and notes given by the director.
    It's pretty awesome
    """
    choir = models.ForeignKey(Choir,
                              on_delete=models.CASCADE,
                              null=True,
                              blank=True,)
    title = models.CharField(max_length=100,)
    text = models.TextField()
    notes = models.TextField(null=True, blank=True)

class FlashCard(models.Model):
    """
    A song has many flashcards related to it. A flash card has a front and
    back.
    """
    front = models.CharField(max_length=500,)
    back = models.CharField(max_length=500,)
    song = models.ForeignKey(Song, on_delete=models.CASCADE, null=True)
