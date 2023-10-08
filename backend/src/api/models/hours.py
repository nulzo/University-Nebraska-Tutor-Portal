from django.db import models


# Create your models here.
class Hours(models.Model):
    mondayOpen = models.TimeField()
    mondayClose = models.TimeField()
    tuesdayOpen = models.TimeField()
    tuesdayClose = models.TimeField()
    wednesdayOpen = models.TimeField()
    wednesdayClose = models.TimeField()
    thursdayOpen = models.TimeField()
    thursdayClose = models.TimeField()
    fridayOpen = models.TimeField()
    fridayClose = models.TimeField()
    saturdayOpen = models.TimeField()
    saturdayClose = models.TimeField()
    sundayOpen = models.TimeField()
    sundayClose = models.TimeField()
    mondayIsOpen = models.BooleanField(default=True)
    tuesdayIsOpen = models.BooleanField(default=True)
    wednesdayIsOpen = models.BooleanField(default=True)
    thursdayIsOpen = models.BooleanField(default=True)
    fridayIsOpen = models.BooleanField(default=True)
    saturdayIsOpen = models.BooleanField(default=True)
    sundayIsOpen = models.BooleanField(default=False)

    def __str__(self):
        return "CSLC Hours"

    class Meta:
        verbose_name_plural = "Hours"
