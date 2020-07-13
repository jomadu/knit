from django.contrib import admin

from .models import Report

class ReportAdmin(admin.ModelAdmin):
    fields = ['owner', 'title', 'description']

admin.site.register(Report, ReportAdmin)
