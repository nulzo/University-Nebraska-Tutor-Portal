from django.db import models
from django.db.models.query import QuerySet

from .user import User


class HourManager(models.Manager):
    '''A manager for the Hour model that provides custom query methods for managing tutor hours."""

    def get_all_hours(self) -> QuerySet:
    """Returns all tutor hours.

    Returns:
    QuerySet: A queryset containing all tutor hours.
    """
    return super().get_queryset().all()

    def get_tutor(self, name: str) -> QuerySet:
    """Returns tutor hours filtered by tutor name.

    Args:
    name (str): The name of the tutor.

    Returns:
    QuerySet: A queryset containing tutor hours filtered by the given tutor name.
    '''

    def get_all_hours(self) -> QuerySet:
        return super().get_queryset().all()

    def get_tutor(self, name: str) -> QuerySet:
        return super().get_queryset().filter(tutor=name)


class Hour(models.Model):
    """A model to represent tutor hours."""
    class Day(models.IntegerChoices):
        """An enumeration of days of the week."""
        MONDAY = 1
        TUESDAY = 2
        WEDNESDAY = 3
        THURSDAY = 4
        FRIDAY = 5
        SATURDAY = 6
        SUNDAY = 7

    tutor = models.ForeignKey(
        User, blank=False, null=False, on_delete=models.PROTECT)
    day_id = models.IntegerField(choices=Day.choices)
    time_in = models.DateTimeField()
    time_out = models.DateTimeField()

    generic = models.Manager()
    hours = HourManager()

    def __str__(self) -> str:
        return str(self.tutor) + " " + "Hours"

    class Meta:
        verbose_name_plural = "tutor_hours"
