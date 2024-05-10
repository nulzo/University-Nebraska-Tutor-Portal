from django.db import models


class AnnouncementType(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    color = models.ForeignKey("api.Color", on_delete=models.SET_NULL, null=True)
    icon = models.CharField(max_length=255)

    def __str__(self) -> str:
        return str(self.name)
