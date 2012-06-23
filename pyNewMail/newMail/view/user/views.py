# -*- coding: utf-8 -*-
'''
Created on 2012-5-28

@author: Administrator
'''
#python
import os
import string
#django
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext

#Dao
from pyNewMail.newMail.dao.user import userHistoryDao
from pyNewMail.newMail.dao.user import userResultDao
from pyNewMail.newMail.dao.user import userTaskDao
#temp
from pyNewMail import settings


def showIndex(request):
    
    passed = request.session["passed"]
    return render_to_response('user/setup_1dsmail.html',locals(),context_instance=RequestContext(request))


#显示图片
def showImg(request):
    title = '显示图片'
    return render_to_response('show_img.html',locals())

#下载图片
def downImg(request):
    """                                                                          
    Send a file through Django without loading the whole file into               
    memory at once. The FileWrapper will turn the file object into an            
    iterator for chunks of 8KB.                                                  
    """ 
    def readFile(fn,buf_size=262144):
        f = open(fn,"rb")
        while True:
            c = f.read(buf_size)
            if c:
                yield c
            else:
                break
        f.close()
    path = os.path.join(settings.STATIC_PATH,'img/22.gif').replace('\\','/')

#    f = open(path)
#    filename = f.name
#    print filename
#    data = f.read()
#    f.close()
#    
    response = HttpResponse(readFile(path),mimetype='application/octet-stream') 
#    response['Content-Disposition'] = 'attachment; filename=%s' % filename
    return HttpResponse(response)

#showHistory
def showHistory(request,page="1"):
    pagesize=20
    try:
        string.atoi(page)
    except:
        page="1"
    if pagesize<=0:
        pagesize=1
    listHistoryInfo,forepage,behindpage = userHistoryDao.userHistoryDao().getUserHistoryList(page,pagesize)
    passed = request.session['passed']
    return render_to_response('user/showhistory.html',locals())

#showResult 
def showResult(request,resultstyle="pwd"):
    print resultstyle
    if resultstyle=="iplocate":
        listResultInfo= userResultDao.userResultDao().getUseriplocateResultList()
    elif resultstyle=="cookies":
        listResultInfo= userResultDao.userResultDao().getUsercookiesResultList()
    else:
        listResultInfo= userResultDao.userResultDao().getUserpwdResultList()
    passed = request.session['passed']
    print len(listResultInfo)
    return render_to_response('user/showresult.html',locals()) 
#showTask
def showTask(request):
    return render_to_response('user/showtask.html',locals(),context_instance=RequestContext(request))


