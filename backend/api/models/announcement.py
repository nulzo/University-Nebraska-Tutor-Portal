from django.db import models


class Announcement(models.Model):
    """ The announcment table is the table that is used to store all announcements
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
    """list: *Choices* is an array containing of all the possible choices for the CharField
    announcement_type.
    """

    announcement_type = models.CharField(
        max_length=3, choices=CHOICES, default="INFORMATIVE"
    )
    """CharField: A CharField in the database table **Announcement** that stores the announcement type.
    """

    announcement_header = models.CharField(max_length=50)
    """CharField: A CharField in the database table **Announcement** that stores the title of the announcement.
    """

    announcement_body = models.TextField(max_length=1024)
    """TextField: A TextField in the database table **Announcement** that stores the content of the announcement.
    """

    tutors_only = models.BooleanField(default=False)
    """Boolean: A BooleanField in the database table **Announcement** that stores if the announcment is for tutors only.
    """

    display_from_date = models.DateTimeField(blank=True)
    """DateTime: A DateTimeField in the database table **Announcement** that stores the start date of the announcement.
    """

    display_to_date = models.DateTimeField(blank=True)
    """DateTime: A DateTimeField in the database table **Announcement** that stores the end date of the announcement.
    """

    class Meta:
        verbose_name_plural = "announcements"
        """str: A string that sets what the name in the database is called.
        """
