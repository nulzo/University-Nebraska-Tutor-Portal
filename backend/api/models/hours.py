from django.db import models

from api.models.user import User

# pylint: disable=E1101


class OpeningHours(models.Model):
    WEEKDAY_CHOICES = [
        ("MON", "Monday"),
        ("TUE", "Tuesday"),
        ("WED", "Wednesday"),
        ("THU", "Thursday"),
        ("FRI", "Friday"),
        ("SAT", "Saturday"),
        ("SUN", "Sunday"),
    ]

    tutor = models.ForeignKey(User, on_delete=models.CASCADE)
    day_of_week = models.CharField(max_length=3, choices=WEEKDAY_CHOICES)
    opening_time = models.TimeField()
    closing_time = models.TimeField()

    def __str__(self) -> str:
        return f"""{self.get_day_of_week_display()}:
        {self.opening_time.strftime('%I:%M %p')} -
        {self.closing_time.strftime('%I:%M %p')}"""
