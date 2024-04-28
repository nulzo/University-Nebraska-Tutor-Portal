from django.db import models


class UserSettings(models.Model):
    username = models.CharField(max_length=150)
    color = models.ForeignKey("api.Color", on_delete=models.CASCADE)
    biography = models.TextField(blank=True, null=True)
    preferred_name = models.CharField(max_length=150)
    pronouns = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self) -> str:
        return str(self.username)
