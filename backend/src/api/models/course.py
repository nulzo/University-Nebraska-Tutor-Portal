from django.db import models
from .professor import Professor


# Create your models here.
class Course(models.Model):
    professor = models.ForeignKey(Professor, on_delete=models.PROTECT)
    course_name = models.CharField(max_length=100)
    course_id = models.CharField(max_length=25)
    is_active = models.BooleanField(default=True, null=False)

    def __str__(self):
        return self.course_name
