from django.db import models


class Announcement(models.Model):
    """
    The announcment table is the table that is used to store all announcements
    that an admin wishes to send out. There are a definitive selection of
    announcement options to choose from, and each of the options have
    unique characteristics attributed to them. For example, informatic
    announcments will have a unique color and icon attributed to it,
    thereby quickly letting end users know what the content of the announcement
    will contain. An announcement contains a header (title), a type (explained
    above), a body (content of the announcement), a start date, and an end date.
    The admin has the option to display the date within the announcment as well.
    """

    CHOICES = [
        ("INFORMATIVE", "Informative"),
        ("URGENT", "Urgent"),
        ("GENERAL", "General"),
        ("TUTORS", "Tutors"),
        ("ALERT", "Alert"),
        ("HOURS", "Hours"),
    ]
    announcement_type = models.CharField(
        max_length=3, choices=CHOICES, default="INFORMATIVE"
    )
    announcement_header = models.CharField(max_length=50)
    announcement_body = models.TextField(max_length=1024)
    tutors_only = models.BooleanField(default=False)
    display_from_date = models.DateTimeField(blank=True)
    display_to_date = models.DateTimeField(blank=True)

    class Meta:
        verbose_name_plural = "announcements"
