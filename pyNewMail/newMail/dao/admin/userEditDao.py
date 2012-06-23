# -*- coding: utf-8 -*-
'''
Created on 2012-6-7

@author: Sammy
'''
from pyNewMail.common.pwdGenerate import GeneratePwd
from pyNewMail.newMail.models import TblUser

class UserDao(object):
    def __init__(self):
        pass
    
    #添加用户
    def appendUser(self,name,pwd,power):
        pwd = GeneratePwd(pwd).getPwd()
        power = int(power)
        usr = TblUser.objects.create(username=name,password=pwd,power=power)
        print usr
        
    #更新用户信息
    def updateUser(self,uid,name,pwd,power):
        pwd = GeneratePwd(pwd).getPwd()
        result_count = TblUser.objects.filter(uid=int(uid)).update(username=name,password=pwd,power=int(power))
    
    #删除用户
    def delUser(self,idArry):
        idList = [int(i) for i in idArry]
        result_count = TblUser.objects.filter(uid__in=idList).delete()

if __name__ == '__main__':
    pass