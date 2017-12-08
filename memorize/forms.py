from django import forms
from material import *
from .models import *
from django.forms import ModelForm, PasswordInput
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

def set_readonly(form, instance, default_fields):

    if default_fields is not None:
        for field in default_fields:
            if field in form.fields:
                form.fields[field].widget.attrs['readonly'] = True
    else:
        for field in form.fields:
            if field in form.fields:
                form.fields[field].widget.attrs['readonly'] = True


class GroupUserForm(forms.Form):
    username = forms.CharField(label="Group username")
    password = forms.CharField(widget=PasswordInput())

    def clean_username(self):
        username = self.cleaned_data.get('username')
        if User.objects.filter(username=username).exists():
            raise forms.ValidationError("Username already exists")
        return username



class SongForm(ModelForm):
    class Meta:
        model = Song
        exclude = ['choir']

class FlashCardForm(ModelForm):
    class Meta:
        model = FlashCard
        exclude = ['song']
    layout = Layout(Row(Column('front', span_columns=6),
                        Column('back', span_columns=6)))

class UserSignUp(UserCreationForm):
    group_name = forms.CharField()
    class Meta:
        model = User
        fields = ['group_name', 'username', 'password1']
