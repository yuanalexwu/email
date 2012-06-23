# -*- coding: utf-8 -*-
'''
Created on 2012-5-31

@author: Sammy
'''
from pyNewMail.newMail.models import TblLog

class SaveLoginLog(object):
    def saveLoginLog(self,uid,name,request,isCheck=True):
        '''saveLoginLog:保存用户登录信息
        author:Sammy
        date:20120601
        输入：
        uid          :用户id
        name        :姓名    
        request     :请求
        isCheck     :是否登录认证成功(默认登录成功)
        
        输出：无'''
        
        agent = request.META['HTTP_USER_AGENT']
        IP = request.META['REMOTE_ADDR']
        VIE = SaveLoginLog.checkIEVersion(agent)
        VWIN = SaveLoginLog.checkWINVersion(agent)
        content = u'<span style="color:#009933">登录成功</span>'
        if not isCheck:
            content = u'<span style="color:#FF0000">登录失败</span>'
        log = TblLog.objects.create(user=name,ip=IP,vie=VIE,vwin=VWIN,userid=uid,content=content)
    
    @staticmethod
    def checkIEVersion(agent):
        '''checkIEVersion:检查ie版本
        author:Sammy
        date:20120601
        输入：
                        
        agent  :请求头文件HTTP_USER_AGENT
        输出：
        version:ie版本'''
        
        version ='unknow'
        messages = {'Safari':u'Safari','MSIE 6':u'IE 6','MSIE 7':u'IE 7','MSIE 8':u'IE 8','360SE':u'360浏览器','Firefox':u'火狐','Opera':'Opera','Chrome':u'Chrome',}
        for k,v in messages.items():
            if k in agent:
                version = v
                break
        return version
    
    @staticmethod
    def checkWINVersion(agent):
        '''checkWINVersion:检查操作系统版本
        author:Sammy
        date:20120601
        输入：
        agent      :请求头文件HTTP_USER_AGENT
        输出：
        version    :操作系统版本'''  
          
        version ='unknow'
        messages = {'Mac':u'Mac OS X','Windows NT 5.1':u'Windows XP','Windows NT 5.2':u'Windows 2003','Windows NT 6.1':u'Win 7',}
        for k,v in messages.items():
            if k in agent:
                version = v
                break
        return version

if __name__ == '__main__':
    pass