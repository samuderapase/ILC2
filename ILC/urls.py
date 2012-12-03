from django.conf.urls.defaults import patterns, include, url
from django.contrib import admin
from django.views.generic.base import TemplateView, RedirectView

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'portal.views.home', name='home'),
    url(r'^peserta$', 'portal.views.peserta', name='peserta'),
    url(r'^agenda$', 'portal.views.agenda', name='agenda'),   
    url(r'^lokasi$', 'portal.views.lokasi', name='lokasi'),
    url(r'^penginapan$', 'portal.views.penginapan', name='penginapan'),
    url(r'^faq$', 'portal.views.faq', name='faq'),
    url(r'^sponsor$', 'portal.views.sponsor', name='sponsor'),
    url(r'^daftar$', 'portal.views.daftar', name='daftar'),
    url(r'^informasi$', 'portal.views.informasi', name='informasi'), 
    #url(r'^blog$', 'portal.views.blog', name='blog'), 
    url(r'^komunitas$', 'portal.views.komunitas', name='komunitas'),
     # url(r'^ILC/', include('ILC.foo.urls')),
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^ckeditor/', include('ckeditor.urls')),
    url(r"^(\d+)/$", 'post'),
    url(r"^add_comment/(\d+)/$", "add_comment"),
    url(r'^robots\.txt$', 'django.views.generic.simple.direct_to_template', {'template': 'robots.txt', 'mimetype': 'text/plain'}),
    url(r'^favicon\.ico$', RedirectView.as_view(url='/static/img/favicon.ico')),
    url(r'^$', 'django.views.generic.simple.direct_to_template', {'template': 'base.html'}),
    
    #url(r'^add_comment/(\d+)/$', 'portal.views.add_comment', name='add_comment'),
    
)

   
    
    

