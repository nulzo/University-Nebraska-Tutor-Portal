from django.db import models


# Create your models here.
class Dummy(models.Model):
    claimed = models.BooleanField(default=False)
    closed = models.BooleanField(default=False)
    description = models.CharField(max_length=255, blank=True)
    issue_type = models.CharField(max_length=255, blank=True)
    name = models.CharField(max_length=25, blank=False)
    professor = models.CharField(max_length=50, blank=False)
    assignment = models.CharField(max_length=255, blank=False)
    course = models.CharField(max_length=255, blank=False)

    def __str__(self):
        return "Ticket: " + str(self.id)
