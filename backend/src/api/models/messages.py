from django.db import models


class Messages(models.Model):
    """
    The message table is the table that is used to store all announcements
    that an admin wishes to send out. There are a definitive selection of
    announcement options to choose from, and each of the options have
    unique characteristics attributed to them. For example, informatic 
    announcments will have a unique color and icon attributed to it,
    thereby quickly letting end users know what the content of the announcement
    will contain. An announcement contains a header (title), a type (explained
    above), a body (content of the announcement), a start date, and an end date.
    The admin has the option to display the date within the announcment as well.
    """
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
