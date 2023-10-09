from django.db import models
from .user import User


class HourManager(models.Manager):
    def get_all_hours(self):
        return super().get_queryset().all()

    def get_tutor(self, name: str):
        return super().get_queryset().filter(tutor=name)


class WorkingHours(models.Model):
    tutor = models.ForeignKey(User, blank=False, null=False, on_delete=models.PROTECT)
    mondayIn = models.TimeField(blank=True, null=True)
    mondayOut = models.TimeField(blank=True, null=True)
    tuesdayIn = models.TimeField(blank=True, null=True)
    tuesdayOut = models.TimeField(blank=True, null=True)
    wednesdayIn = models.TimeField(blank=True, null=True)
    wednesdayOut = models.TimeField(blank=True, null=True)
    thursdayIn = models.TimeField(blank=True, null=True)
    thursdayOut = models.TimeField(blank=True, null=True)
    fridayIn = models.TimeField(blank=True, null=True)
    fridayOut = models.TimeField(blank=True, null=True)
    saturdayIn = models.TimeField(blank=True, null=True)
    saturdayOut = models.TimeField(blank=True, null=True)
    sundayIn = models.TimeField(blank=True, null=True)
    sundayOut = models.TimeField(blank=True, null=True)

    hours = HourManager()

    def __str__(self):
        return str(self.tutor) + " " + "Hours"

    class Meta:
        verbose_name_plural = "tutor_hours"
