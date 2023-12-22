from django.db import models

class Semester(models.Model):
    """
    Semesters are the semester.
    """

    class SemesterChoices(models.IntegerChoices):
        SUMMER = 0
        FALL = 1
        JTERM = 2
        SPRING = 3

    year = models.IntegerField(null=False, blank=False)
    semester_term_name = models.CharField(null=False, blank=False, max_length=20)
    semester_code = models.IntegerField(choices=SemesterChoices.choices)
    semester_id = models.BigIntegerField(primary_key=True, unique=True)
    generic = models.Manager()

    def __str__(self) -> str:
        return f"{self.semester_term_name}"

    class Meta:
        verbose_name_plural: str = "semesters"
