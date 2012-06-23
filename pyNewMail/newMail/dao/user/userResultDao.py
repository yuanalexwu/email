# -*- coding: utf-8 -*-
'''
Created on 2012-6-19

@author: Administrator
'''
from pyNewMail.newMail.models import TblGetPwd,TblGetIp,TblGetCook

class userResultDao(object):
    def __init__(self):
        pass
    
#    获取用户列表
    def getUserpwdResultList(self):
        userResultlist = TblGetPwd.objects.all()
        return userResultlist
    def getUseriplocateResultList(self):
        userResultlist = TblGetIp.objects.all()
#        TblGetIp.objects.
        return userResultlist
    def getUsercookiesResultList(self):
        userResultlist = TblGetCook.objects.all()
        return userResultlist
    
#    获取登录日志信息
#    def getLoginlog(self):
#        logList = TblTask.objects.all()
#        return logList
#    
#    获取攻击记录信息
#    def getAttackInfo(self):
#        attackList = TblTask.objects.all()
#        return attackList
    
if __name__ == '__main__':
    pass