# -*- coding: utf-8 -*-
'''
Created on 2012-5-31

@author: Sammy
'''
from pyNewMail.common.pwdGenerate import GeneratePwd
from pyNewMail.newMail.dao.login import logDao
from pyNewMail.newMail.models import TblUser

def checkUser(name,password,request):
    if name and password:
            g = GeneratePwd(password)
            pwd = g.getPwd()
            if "'" in name:name =' '#防止注入
            result = TblUser.objects.filter(username=name,password=pwd)
            result_count = len(result)
            if result_count == 1:
                #登录成功
                user = result[0]
                #todo:写入登录日志
                logDao.SaveLoginLog().saveLoginLog(user.uid,user.username,request)
                if user.power == 1:request.session["passed"]=2
                if user.power == 0:request.session["passed"]=1
                return True
            else:
                #登录失败
                uid = -1
                #todo:写入登录日志
                logDao.SaveLoginLog().saveLoginLog(uid,name,request,isCheck=False)
                request.session["passed"]=0
                return False
