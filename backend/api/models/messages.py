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

    ticket = models.ForeignKey("api.Ticket", on_delete=models.SET_NULL, null=True, blank=False)
    sender = models.ForeignKey("api.User", on_delete=models.PROTECT, blank=False)
    message_content = models.TextField(max_length=128)
    created_date = models.DateTimeField(auto_now_add=True)

    generic = models.Manager()

    class Meta:
        verbose_name_plural = "messages"
