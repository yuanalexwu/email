# -*- coding: utf-8 -*-
'''
Created on 2012-5-28

@author: Administrator
'''
#django
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext

#Dao
from pyNewMail.newMail.dao.login import loginDao

#view
import pyNewMail.newMail.view.admin.views#调用此试图使用import全名

#检查登录
def isLogin(request):
    passed = request.session['passed']
    if passed in (1,2):
        return True
    else:
        return False

#显示登录
def showLogin(request):
    return render_to_response('login/login.html',{},context_instance=RequestContext(request))

#登录检查，跳转
def login(request):
    #post
    if request.method == 'POST':
        name = request.POST.get('u','')
        password = request.POST.get('p','')
        #查询用户并返回信息
        result = loginDao.checkUser(name, password, request)
        if result:
            passed = request.session["passed"]
            #普通用户登录跳转
            #todo title for html head
            if passed == 1:return render_to_response('user/setup_1dsmail.html',locals(),context_instance=RequestContext(request))
            #管理员登录跳转
            if passed == 2:return pyNewMail.newMail.view.admin.views.showUserList(request)
        else:
            return HttpResponseRedirect('/login/showlogin/')
    return HttpResponseRedirect('/login/showlogin/')

#退出
def logout(request):
    request.session['passed'] = 0
    return HttpResponseRedirect('/login/showlogin/')
