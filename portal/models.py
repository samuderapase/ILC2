from django.db import models
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField
from string import join
from django.forms import ModelForm

class Post(models.Model):	
    penulis = models.ForeignKey(User)
    judul = models.CharField(max_length=200)
    body = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
	
    class Meta:
        verbose_name_plural = "Post"
	
    def __unicode__(self):
        return self.judul  
        
class Comment(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    author = models.CharField(max_length=60)
    body = models.TextField()
    post = models.ForeignKey(Post)

    def __unicode__(self):
        return unicode("%s: %s" % (self.post, self.body[:60]))
	
class Team(models.Model):
    user_name = models.CharField(max_length=100)
    first_name = models.CharField(max_length=50)	
    last_name = models.CharField(blank=True, help_text="not required", max_length=50)
    phone = models.CharField(help_text="example +62 85270546820", max_length=20)
    email = models.EmailField()
    website = models.URLField(help_text="not required", blank=True)
	
    class Meta:
        verbose_name_plural = "Team"
	
    def __unicode__(self):
        return self.user_name
	
class Schedule(models.Model):
    schedule = models.CharField(max_length=200)
    trainer_name = models.CharField(max_length=200)
    date_schedule = models.DateTimeField()
    description = models.TextField(blank=True)
	
    class Meta:
        verbose_name_plural = "Schedule"
	
    def __unicode__(self):
        return self.schedule
		
class Peserta(models.Model):
    nama = models.CharField(max_length=20)
    alamat = models.CharField(max_length=30)
    email = models.EmailField()
    phone = models.CharField(help_text="example +62 85270546820", max_length=25)
     
    class Meta:
	    verbose_name_plural = "Peserta"
	     
    def __unicode__(self):
        return self.nama
        
class Faq(models.Model):
    pertanyaan = models.CharField(max_length=500)
    jawaban = RichTextField(config_name='awesome_ckeditor')
    
    class Meta:
		verbose_name_plural = "Faq"
    
    def __unicode__(self):
        return self.pertanyaan      
         	
class Sponsor(models.Model):
	sponsor = models.CharField(max_length=200)
	alamat = models.CharField(max_length=200)
	tentang_sponsor = RichTextField(config_name='awesome_ckeditor')
	
	class Meta:
		verbose_name_plural = "Sponsor"
	
	def __unicode__(self):
		return self.sponsor	
		
class Penginapan(models.Model):
	tempat = models.CharField(max_length=200)
	keterangan = RichTextField(config_name='awesome_ckeditor')
	
	class Meta:
		verbose_name_plural = "Penginapan"
		
	def __unicode__(self):
		return self.tempat			

class Komunitas(models.Model):
	komunitas = models.CharField(max_length=200)
	tentang = RichTextField(config_name='awesome_ckeditor')
	pengurus = models.CharField(max_length=300, help_text="gunakan , kalo banyak")
	alamat = models.CharField(max_length=200)
	
	class Meta:
		verbose_name_plural = "komunitas"
		
	def __unicode__(self):
		return self.komunitas

class CommentForm(ModelForm):
    class Meta:
        model = Comment
        exclude = ["post"]

def add_comment(request, pk):
    """Add a new comment."""
    p = request.POST

    if p.has_key("body") and p["body"]:
        author = "Anonymous"
        if p["author"]: author = p["author"]

        comment = Comment(post=Post.objects.get(pk=pk))
        cf = CommentForm(p, instance=comment)
        cf.fields["author"].required = False

        comment = cf.save(commit=False)
        comment.author = author
        comment.save()
    return HttpResponseRedirect(reverse("portal.views.post", args=[pk]))
