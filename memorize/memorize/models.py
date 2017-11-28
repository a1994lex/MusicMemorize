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
