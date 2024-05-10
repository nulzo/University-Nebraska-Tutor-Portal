from django.db import models


class Announcement(models.Model):
    """The announcment table is the table that is used to store all announcements
    that an admin wishes to send out. There are a definitive selection of
    announcement options to choose from, and each of the options have
    unique characteristics attributed to them. For example, informatic
    announcments will have a unique color and icon attributed to it,
    thereby quickly letting end users know what the content of the announcement
    will contain. An announcement contains a header (title), a type (explained
    above), a body (content of the announcement), a start date, and an end date.
    The admin has the option to display the date within the announcment as well.
    """

    start_date = models.DateField(blank=True)
    end_date = models.DateField(blank=True)
    created_at_date = models.DateTimeField(auto_now_add=True)
    visible_end_date = models.BooleanField(default=False)
    type = models.ForeignKey(
        "api.AnnouncementType", on_delete=models.SET_NULL, null=True
    )
    content = models.TextField(blank=True)
    title = models.TextField(blank=True)
    issuing_user = models.ForeignKey("api.User", on_delete=models.SET_NULL, null=True)

    class Meta:
        verbose_name_plural = "announcements"

    def __str__(self) -> str:
        return str(self.title)
