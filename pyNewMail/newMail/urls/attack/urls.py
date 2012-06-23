'''
Created on 2012-6-21

@author: Administrator
'''
from django.conf.urls import patterns, include, url
from pyNewMail.newMail.view.attack.views import *

urlpatterns = patterns('',
                       ('^(?P<mail>[^\/]+)\/$',showEmail),
                       
                       
                       )