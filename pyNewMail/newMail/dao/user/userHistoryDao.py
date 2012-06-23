# -*- coding: utf-8 -*-
'''
Created on 2012-6-19

@author: Administrator
'''
from pyNewMail.newMail.models import TblTask
import string
class userHistoryDao(object):
    def __init__(self):
        pass
    
#    获取用户列表
    def getUserHistoryList(self,page="1",pagesize=20):
        listcount=TblTask.objects.all().count()
        forepage=1
        behindpage=1     
        if string.atoi(page)<=1:
            userHistorylist = TblTask.objects.all()[0:pagesize]
            if listcount<pagesize:
                forepage=1
                behindpage=1
            else:
                forepage=1
                behindpage=2
        elif string.atoi(page)*pagesize >=listcount:
            if listcount%pagesize==0:
                userHistorylist = TblTask.objects.all()[(listcount/pagesize-1)*pagesize:listcount]
                forepage=listcount/pagesize-1
                behindpage=listcount/pagesize
            else:
                userHistorylist = TblTask.objects.all()[listcount/pagesize*pagesize:listcount]
                if listcount/pagesize==0:
                    forepage=1
                else:
                    forepage=listcount/pagesize        
                behindpage=listcount/pagesize+1
        else:
            userHistorylist = TblTask.objects.all()[(string.atoi(page)-1)*pagesize:string.atoi(page)*pagesize]
            forepage=string.atoi(page)-1
            behindpage=string.atoi(page)+1
        return userHistorylist,forepage,behindpage
    

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