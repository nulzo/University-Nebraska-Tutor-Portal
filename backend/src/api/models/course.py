from django.db import models

from .professor import Professor
from .sections import Section


# Create your models here.
class Course(models.Model):
    course_department = models.CharField(max_length=10, blank=False, default="CSCI")
    course_name = models.CharField(max_length=100, blank=False)
    course_id = models.CharField(max_length=25, blank=False)
    is_active = models.BooleanField(default=True, null=False)

    def __str__(self):
        return self.course_name
