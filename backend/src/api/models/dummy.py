from django.db import models


# Create your models here.
class Dummy(models.Model):
    started = models.BooleanField(default=False)
    description = models.CharField(max_length=255, null=True)
    issue_type = models.CharField(max_length=255, null=True)

    def __str__(self):
        return "Ticket: " + str(self.id)
    