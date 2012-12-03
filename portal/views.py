# Create your views here.
#import time
#from calender import month_name
from django.core.paginator import Paginator, InvalidPage, EmptyPage
from django.core.urlresolvers import reverse
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect, HttpResponse
from models import *
from django.http import Http404
from django.shortcuts import get_object_or_404, render_to_response


def home(request):
	return render_to_response ('base.html', locals())
	
def peserta(request):
    peserta = Peserta.objects.all()
    return render_to_response ('peserta.html', locals())	
    
def agenda(request):
    agenda = Schedule.objects.all()
    return render_to_response ('agenda.html', locals())    
    
def lokasi(request):
    return render_to_response ('lokasi.html', locals())        

def penginapan(request):
    penginapan = Penginapan.objects.all()
    return render_to_response ('penginapan.html', locals())            
    
def faq(request):
    faq = Faq.objects.all()
    return render_to_response ('faq.html', locals())      
   
def sponsor(request):
	return render_to_response ('sponsor.html', locals())    
	
def daftar(request):
	return render_to_response ('daftar.html', locals())    	
	    
def komunitas(request):
	komunitas = Komunitas.objects.all()
	return render_to_response ('komunitas.html', locals())
	
def informasi(request):
    """Main listing."""
    posts = Post.objects.all().order_by("-created")
    paginator = Paginator(posts, 2)

    try: page = int(request.GET.get("page", '1'))
    except ValueError: page = 1

    try:
        posts = paginator.page(page)
    except (InvalidPage, EmptyPage):
        posts = paginator.page(paginator.num_pages)

    return render_to_response("list.html", dict(posts=posts, user=request.user))

def post(request, pk):
    """Single post with comments and a comment form."""
    post = Post.objects.get(pk=int(pk))
    comments = Comment.objects.filter(post=post)
    d = dict(post=post, comments=comments, form=CommentForm(), user=request.user)
    d.update(csrf(request))
    return render_to_response("post.html", locals())
    

