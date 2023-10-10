from django.db import models
from .course import Course
# from .sections import Section


# Create your models here.
class Professor(models.Model):
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=30)
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    courses = models.ManyToManyField("api.Course", related_name="professortocourse")
    sections = models.ManyToManyField("api.Section", related_name="professortosection")

    def __str__(self):
        return self.full_name
