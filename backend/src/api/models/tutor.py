from django.db import models

from .course import Course


# Create your models here.
class Tutor(models.Model):
    courses_tutoring = models.ManyToManyField(Course)
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_working = models.BooleanField(default=False)
    # profile_picture = models.ImageField()
    tutor_bio = models.TextField()

    def __str__(self):
        return self.name
