'''
Created on 2012-6-18

@author: Administrator
'''

from django.conf.urls import patterns, include, url
from pyNewMail.newMail.view.user.views import *


urlpatterns = patterns('',
                       
                       (r'^index/$',showIndex),
                       (r'^history/(?P<page>\d{0,3})',showHistory),
                       (r'^result/(?P<resultstyle>\w{0,10})',showResult),
                       (r'task/$',showTask),                       
                       (r'^showimg/$',showImg),
                       (r'^downimg/$',downImg),
                       
                       )