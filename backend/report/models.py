from django.db import models
from django.conf import settings

class Report(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    description = models.CharField(max_length=244, blank=True, default='')

    class Meta:
        ordering = ['date_created']
