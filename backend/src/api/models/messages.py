from django.db import models


class Messages(models.Model):
    INFORMATIVE = "INF"
    URGENT = "URG"
    GENERAL = "GEN"
    TYPES = [(INFORMATIVE, "Informative"), (URGENT, "Urgent"), (GENERAL, "General")]
    message_type = models.CharField(max_length=3, choices=TYPES, default=INFORMATIVE)
    message_header = models.CharField(max_length=50)
    message_body = models.TextField(max_length=1024)
    from_date = models.DateTimeField(blank=True)
    to_date = models.DateTimeField(blank=True)

    class Meta:
        verbose_name_plural = "messages"
