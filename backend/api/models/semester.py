from django.db import models


class Semester(models.Model):

    class SemesterChoices(models.IntegerChoices):
        SUMMER = 0
        FALL = 1
        JTERM = 2
        SPRING = 3

    year = models.IntegerField(null=False, blank=False)
    discriminator = models.BigIntegerField(null=False, blank=False, unique=True)
    semester = models.IntegerField(choices=SemesterChoices.choices)
    name = models.CharField(max_length=255)


    def __str__(self) -> str:
        return f"{self.name}"

    class Meta:
        verbose_name_plural: str = "semesters"
