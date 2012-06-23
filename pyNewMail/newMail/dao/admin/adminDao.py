# -*- coding: utf-8 -*-
'''
Created on 2012-6-6

@author: Sammy
'''
from pyNewMail.newMail.models import TblUser,TblLog,TblTask

class AdminDao(object):
    '''admin管理员操作类'''
    
    def __init__(self):
        pass
    
    #获取用户列表
    def getUserList(self,flag):
        userlist = TblUser.objects.filter(power=flag)
        return userlist
    
    #获取登录日志信息
    def getLoginlog(self):
        logList = TblLog.objects.all()
        return logList
    
    #获取攻击记录信息
    def getAttackInfo(self):
        attackList = TblTask.objects.all()
        return attackList
    
if __name__ == '__main__':
    pass