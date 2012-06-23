'''
Created on 2012-6-14

@author: Administrator
'''

# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#     * Rearrange models' order
#     * Make sure each model has one field with primary_key=True
# Feel free to rename the models, but don't rename db_table values or field names.
#
# Also note: You'll have to insert the output of 'django-admin.py sqlcustom [appname]'
# into your database.

from django.db import models

class TblGetIp(models.Model):
    uid = models.AutoField(primary_key=True, db_column='ID') # Field name made lowercase.
    taskid = models.IntegerField(null=True, db_column='taskID', blank=True) # Field name made lowercase.
    dates = models.DateTimeField(null=True, db_column='date_', blank=True)
    email = models.CharField(max_length=3072, blank=True)
    ip = models.CharField(max_length=300, db_column='IP', blank=True) # Field name made lowercase.
    vie = models.CharField(max_length=3072, db_column='VIE', blank=True) # Field name made lowercase.
    vwindows = models.CharField(max_length=3072, db_column='VWindows', blank=True) # Field name made lowercase.
    class Meta:
        db_table = u'tbl_get_IP'
        
    def __unicode__(self):
        return '%s:%s'%(self.email,self.ip)

class TblGetCook(models.Model):
    uid = models.AutoField(primary_key=True, db_column='ID') # Field name made lowercase.
    taskid = models.IntegerField(null=True, db_column='taskID', blank=True) # Field name made lowercase.
    dates = models.DateTimeField(null=True, db_column='date_', blank=True)
    email = models.CharField(max_length=3072, blank=True)
    cookies = models.CharField(max_length=6144, blank=True)
    urlh = models.CharField(max_length=3072, blank=True)
    class Meta:
        db_table = u'tbl_get_cook'
    
    def __unicode__(self):
        return '%s:%s'%(self.email,self.cookies)

class TblGetPwd(models.Model):
    uid = models.AutoField(primary_key=True, db_column='ID') # Field name made lowercase.
    dates = models.DateTimeField(null=True, db_column='date_', blank=True)
    taskid = models.IntegerField(null=True, db_column='taskID', blank=True) # Field name made lowercase.
    email = models.CharField(max_length=3072, blank=True)
    password = models.CharField(max_length=3072, blank=True)
    class Meta:
        db_table = u'tbl_get_pwd'
        
    def __unicode__(self):
        return '%s:%s'%(self.email,self.password)

class TblLog(models.Model):
    uid = models.AutoField(primary_key=True, db_column='ID') # Field name made lowercase.
    user = models.CharField(max_length=3072, blank=True)
    dates = models.DateTimeField(null=True, db_column='date_', blank=True)
    taskid = models.IntegerField(null=True, db_column='taskID', blank=True) # Field name made lowercase.
    ip = models.CharField(max_length=300, db_column='IP', blank=True) # Field name made lowercase.
    vie = models.CharField(max_length=3072, db_column='VIE', blank=True) # Field name made lowercase.
    vwin = models.CharField(max_length=3072, db_column='VWIN', blank=True) # Field name made lowercase.
    userid = models.IntegerField(null=True, db_column='UserID', blank=True) # Field name made lowercase.
    content = models.CharField(max_length=3072, blank=True)
    class Meta:
        db_table = u'tbl_log'
    
    def __unicode__(self):
        return '%s:%s'%(self.user,self.ip)

class TblMailinf(models.Model):
    uid = models.AutoField(primary_key=True, db_column='ID') # Field name made lowercase.
    mailstyle = models.CharField(max_length=3072, db_column='MailStyle', blank=True) # Field name made lowercase.
    hackstyle = models.CharField(max_length=3072, db_column='HackStyle', blank=True) # Field name made lowercase.
    class Meta:
        db_table = u'tbl_mailInf'
    
    def __unicode__(self):
        return '%s----%s'%(self.mailstyle,self.hackstyle)

class TblSmtp(models.Model):
    uid = models.AutoField(primary_key=True, db_column='ID') # Field name made lowercase.
    email = models.CharField(max_length=3072, blank=True)
    username = models.CharField(max_length=3072, db_column='UserName', blank=True) # Field name made lowercase.
    userpassword = models.CharField(max_length=3072, db_column='UserPassword', blank=True) # Field name made lowercase.
    smtpserver = models.CharField(max_length=3072, db_column='SMTPserver', blank=True) # Field name made lowercase.
    num = models.IntegerField(null=True, db_column='NUM', blank=True) # Field name made lowercase.
    dates = models.DateTimeField(null=True, blank=True)
    class Meta:
        db_table = u'tbl_smtp'
        
    def __uicode__(self):
        return '%s--%s--%s'%(self.email,self.username,self.smtpserver)

class TblTask(models.Model):
    uid = models.AutoField(primary_key=True, db_column='ID') # Field name made lowercase.
    smtpemail = models.CharField(max_length=3072, db_column='SMTPemail', blank=True) # Field name made lowercase.
    dsmail = models.CharField(max_length=3072, blank=True)
    hackstyle = models.CharField(max_length=3072, db_column='HackStyle', blank=True) # Field name made lowercase.
    mailtitle = models.CharField(max_length=3072, db_column='MailTitle', blank=True) # Field name made lowercase.
    sendername = models.CharField(max_length=3072, db_column='SenderName', blank=True) # Field name made lowercase.
    mailcontent = models.CharField(max_length=12294, db_column='MailContent', blank=True) # Field name made lowercase.
    senddate = models.DateTimeField(null=True, db_column='SendDate', blank=True) # Field name made lowercase.
    state = models.CharField(max_length=3072, blank=True)
    class Meta:
        db_table = u'tbl_task'
    
    def __unicode__(self):
        return '%s--%s--%s'%(self.smtpemail,self.dsmail,self.sendername)
    
class TblUser(models.Model):
    uid = models.AutoField(primary_key=True, db_column='ID') # Field name made lowercase.
    username = models.CharField(max_length=3072, db_column='UserName', blank=True) # Field name made lowercase.
    password = models.CharField(max_length=3072, db_column='PassWord', blank=True) # Field name made lowercase.
    datesstart = models.DateTimeField(null=True, db_column='datesStart', blank=True) # Field name made lowercase.
    datesend = models.DateTimeField(null=True, db_column='datesEnd', blank=True) # Field name made lowercase.
    num = models.IntegerField(null=True, db_column='Num', blank=True) # Field name made lowercase.
    power = models.IntegerField(null=True, db_column='Power', blank=True) # Field name made lowercase.
    email = models.CharField(max_length=12288, blank=True)
    class Meta:
        db_table = u'tbl_user'
    
    def __unicode__(self):
        return '%d--%s--%d'%(self.uid,self.username,self.power)
    
