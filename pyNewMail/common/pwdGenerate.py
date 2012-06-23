# -*- coding: utf-8 -*-
'''
Created on 2012-6-7

@author: Sammy
'''
import md5

class GeneratePwd(object):
    
    def __init__(self,pwd):
        self.org_pwd = pwd
        self.after_pwd = ''
    
    def getPwd(self):
        m = md5.new(self.org_pwd)
        pwd = m.hexdigest()
        m = md5.new(pwd)
        self.after_pwd = m.hexdigest()
        return self.after_pwd
        
if __name__ == '__main__':
    pass