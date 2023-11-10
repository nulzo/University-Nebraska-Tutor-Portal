from django.db import models


class Announcement(models.Model):
    CHOICES = [("INFORMATIVE", "Informative"), ("URGENT", "Urgent"), ("GENERAL", "General"), ("TUTORS", "Tutors"), ("ALERT", "Alert"), ("HOURS", "Hours")]
    announcement_type = models.CharField(max_length=3, choices=CHOICES, default="INFORMATIVE")
    announcement_header = models.CharField(max_length=50)
    announcement_body = models.TextField(max_length=1024)
    tutors_only = models.BooleanField(default=False)
    display_from_date = models.DateTimeField(blank=True)
    display_to_date = models.DateTimeField(blank=True)

    class Meta:
        verbose_name_plural = "announcements"
