from django.db import models


class Course(models.Model):
    title = models.CharField(max_length=100)
    department = models.CharField(max_length=25, blank=False)
    discriminator = models.IntegerField(blank=False, null=False)
    course_id = models.CharField(primary_key=True, max_length=15, blank=False, null=False, unique=True)

    generic: models.Manager = models.Manager()

    def __str__(self) -> str:
        return str(self.title)
