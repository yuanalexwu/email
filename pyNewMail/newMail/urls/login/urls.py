'''
Created on 2012-6-18

@author: Administrator
'''

from django.conf.urls import patterns, include, url
from pyNewMail.newMail.view.login.views import *


urlpatterns = patterns('',
                       (r'^showlogin/$',showLogin),
                       (r'^login/$',login),
                       (r'^logout/$',logout),
                       
                       )