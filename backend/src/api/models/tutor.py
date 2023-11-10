from django.db import models


class Tutor(models.Model):
    message_header = models.CharField(max_length=50)
    message_body = models.TextField(max_length=1024)
    from_date = models.DateTimeField(blank=True)
    to_date = models.DateTimeField(blank=True)

    class Meta:
        verbose_name_plural = "messages"
