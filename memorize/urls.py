# Django specif import
from django.conf.urls import include, url
import memorize.views as views

urlpatterns = [

    url(r'^signup/$', views.signup, name='signup'),
    url(r'^$', views.home, name='home'),
    url(r'^memorize-page/(?P<song_id>[0-9]+)/$', views.song_page, name='songPage'),
    url(r'^add-song/$', views.add_song, name='addSong'),
    url(r'^grab-songs/$', views.grab_songs, name='grabSongs'),
    url(r'^edit-song/$', views.edit_song, name='editSong'),

]
