'''
Created on 2012-6-18

@author: Administrator
'''

from django.conf.urls import patterns, include, url
from pyNewMail.newMail.view.admin.views import *

urlpatterns = patterns('',
                       (r'^showUserList/$',showUserList),
                       (r'^append/$',appendUser),
                       (r'^edit/$',editUser),
                       (r'^del/$',delUser),
                       (r'^showAdminLog/$',showAdminLog),
                       (r'^showAdminAttack/$',showAdminAttack),
                       
                       )