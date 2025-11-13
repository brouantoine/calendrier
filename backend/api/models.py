from django.conf import settings
from django.db import models
from datetime import time
from django.contrib.auth.models import User


from datetime import time
from django.conf import settings
from django.contrib.auth.models import User
from django.db import models

class Client(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='client_profile')
    phone = models.CharField(max_length=32, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.get_full_name()} (@{self.user.username})"

class Program(models.Model):
    TYPE_CHOICES = [
        ("vente","Post Vente"), ("lifestyle","Lifestyle"), ("educatif","Éducatif"),
        ("emotionnel","Émotionnel"), ("produit","Produit"), ("communautaire","Communautaire"),
    ]
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='programs')
    date   = models.DateField(db_index=True)
    time   = models.TimeField(default=time(9,0), db_index=True)  # ✅ plusieurs posts / jour

    title = models.CharField(max_length=140)
    type  = models.CharField(max_length=32, choices=TYPE_CHOICES)

    platforms  = models.JSONField(default=list, blank=True)
    media_brief= models.TextField(blank=True)
    caption    = models.TextField(blank=True)
    hashtags   = models.JSONField(default=list, blank=True)
    notes      = models.TextField(blank=True)

    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='programs_created')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['date','time','id']
        constraints = [
            models.UniqueConstraint(fields=['client','date','time'], name='uniq_program_per_client_day_time')  # ✅
        ]
        indexes = [
            models.Index(fields=['client','date']),
            models.Index(fields=['client','date','time']),
        ]

    def __str__(self):
        return f"{self.client.username} – {self.date} {self.time} – {self.title[:20]}"
