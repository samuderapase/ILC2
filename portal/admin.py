from django.contrib import admin
from models import *

class TeamAdmin(admin.ModelAdmin):
	list_display = ['user_name', 'first_name', 'last_name', 'email']
	search_fields = ['user_name', 'first_name']

class ScheduleAdmin(admin.ModelAdmin):
	list_display =['schedule', 'trainer_name', 'date_schedule']
	list_filter = ['date_schedule']
	 
class PostAdmin(admin.ModelAdmin):
	list_display = ['judul', 'penulis', 'created']
	search_fields = ['judul'] 
	
class PesertaAdmin(admin.ModelAdmin):
    list_display = ['nama', 'alamat', 'email']
    list_filter = ['alamat']
    search_fields = ['nama']

class FaqAdmin(admin.ModelAdmin):
    list_display = ['pertanyaan']    

class SponsorAdmin(admin.ModelAdmin):
	list_display = ['sponsor', 'alamat']
	
class PenginapanAdmin(admin.ModelAdmin):
	list_display = ['tempat']
	
class KomunitasAdmin(admin.ModelAdmin):
	list_display = ['komunitas', 'pengurus']

class CommentAdmin(admin.ModelAdmin):
    display_fields = ["post", "author", "created"]


admin.site.register(Team, TeamAdmin)
admin.site.register(Schedule, ScheduleAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Peserta, PesertaAdmin)
admin.site.register(Faq, FaqAdmin)
admin.site.register(Sponsor, SponsorAdmin)
admin.site.register(Penginapan, PenginapanAdmin)
admin.site.register(Komunitas, KomunitasAdmin)
admin.site.register(Comment, CommentAdmin)
