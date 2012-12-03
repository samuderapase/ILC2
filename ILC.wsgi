import os
import sys

sys.stdout = sys.stderr

sys.path.insert(0, '/path/to/home/ilc2013/public_html/ilc2013.acehlinux.org/lib/python2.6/site-packages/')
# The module inside the following directory
# defines SomeModel from the error message
sys.path.insert(0, '/path/to/home/ilc2013/public_html/ilc2013.acehlinux.org/ILC')
#sys.path.insert(0, '/path/to/project/site-packages/')

import django.core.handlers.wsgi

os.environ['DJANGO_SETTINGS_MODULE'] = 'ILC.settings'
application = django.core.handlers.wsgi.WSGIHandler()

