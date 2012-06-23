# -*- coding: utf-8 -*-
'''
Created on 2012-5-28

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
from pyNewMail.newMail.dao.admin import adminDao 
from pyNewMail.newMail.dao.admin import userEditDao 

#view
import pyNewMail.newMail.view.login.views#调用此试图使用import全名

def showUserList(request):
    if pyNewMail.newMail.view.login.views.isLogin(request):
        passed = request.session['passed']
        if passed == 2:
            title = u'用户管理'
            userlist = adminDao.AdminDao().getUserList(0)
            managerlist = adminDao.AdminDao().getUserList(1)
            return render_to_response('admin/admin_manage.tpl',locals(),context_instance=RequestContext(request))
        else:
            return HttpResponse('<h2>无权限查看！</h2>')
    else:
        return HttpResponseRedirect('/login/showlogin/')

#添加用户
def appendUser(request):
    name = request.GET.get('name','')
    pwd = request.GET.get('pwd','')
    power = request.GET.get('power','')
    print '#'*30
    print name,pwd,power
    print '#'*30
    userDao = userEditDao.UserDao()
    try:
        userDao.appendUser(name, pwd, power)
    except:
        msg =  str(sys.exc_info())
        print msg+"----appendUser()"   
    #返回新用户列表
    userlist = adminDao.AdminDao().getUserList(0)
    managerlist = adminDao.AdminDao().getUserList(1)
    return render_to_response('admin/user_list.tpl',locals())
    
#修改用户信息
def editUser(request):
    uid = request.GET.get('id','')
    name = request.GET.get('name','')
    pwd = request.GET.get('pwd','')
    power = request.GET.get('power','')
    print '#'*30
    print uid,name,pwd,power
    print '#'*30
    userDao = userEditDao.UserDao()
    try:
        userDao.updateUser(uid, name, pwd, power)
    except:
        msg =  str(sys.exc_info())
        print msg    
    #返回新用户列表
    userlist = adminDao.AdminDao().getUserList(0)
    managerlist = adminDao.AdminDao().getUserList(1)
    return render_to_response('admin/user_list.tpl',locals())
    
#删除用户
def delUser(request):
    idList = request.GET.getlist('idarry[]')
    print idList
    userDao = userEditDao.UserDao()
    userDao.delUser(idList)
    #返回新用户列表
    userlist = adminDao.AdminDao().getUserList(0)
    managerlist = adminDao.AdminDao().getUserList(1)
    return render_to_response('admin/user_list.tpl',locals())


#显示日志
def showAdminLog(request):
    
    logList = adminDao.AdminDao().getLoginlog()
    title = u'登录历史'
    passed = request.session["passed"]
    return render_to_response('admin/admin_login.tpl',locals())

#显示攻击记录
def showAdminAttack(request):
    
    attackList = adminDao.AdminDao().getAttackInfo()
    title = u'攻击记录'
    passed = request.session["passed"]
    return render_to_response('admin/admin_attack.tpl',locals())