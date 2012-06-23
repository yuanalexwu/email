from django.conf.urls import patterns, include, url
from django.views.static import serve

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

from pyNewMail import settings


urlpatterns = patterns('',
                       (r'^site_media/(?P<path>.*)$','django.views.static.serve',{'document_root':settings.STATIC_PATH}),
                       (r'^app_media/(?P<path>.*)$','django.views.static.serve',{'document_root':settings.APP_STATIC_PATH}),
                                             
                       
                       (r'^$','pyNewMail.newMail.view.login.views.showLogin'),#index
                       (r'^login/',include('pyNewMail.newMail.urls.login.urls')),#login
                       (r'^admin/',include('pyNewMail.newMail.urls.admin.urls')),#admin
                       (r'^user/',include('pyNewMail.newMail.urls.user.urls')),#user
                       (r'^mail/',include('pyNewMail.newMail.urls.attack.urls')),#mail attack
                       
                       )

#urlpatterns = patterns('',
#                       (r'^showimg/$',showImg),
#                       (r'^downimg/$',downImg),
#                       
#                       (r'^$',showLogin),
#                       (r'^showlogin/$',showLogin),
#                       (r'^login/$',login),
#                       (r'^logout/$',logout),
#                       
#                       (r'^admin/',include(url))
#                       (r'^admin/showUserList/$',showUserList),
#                       (r'^admin/append/$',appendUser),
#                       (r'^admin/edit/$',editUser),
#                       (r'^admin/del/$',delUser),
#                       (r'^admin/showAdminLog/$',showAdminLog),
#                       (r'^admin/showAdminAttack/$',showAdminAttack),
#                       
#    # Examples:
#    # url(r'^$', 'pyNewMail.views.home', name='home'),
#    # url(r'^pyNewMail/', include('pyNewMail.foo.urls')),
#
#    # Uncomment the admin/doc line below to enable admin documentation:
#    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
#
#    # Uncomment the next line to enable the admin:
#    # url(r'^admin/', include(admin.site.urls)),
#)
