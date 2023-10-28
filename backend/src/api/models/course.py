from django.db import models


class Course(models.Model):
    course_department = models.CharField(max_length=10, blank=False, default="CSCI")
    course_name = models.CharField(max_length=100, blank=False)
    course_id = models.IntegerField(max_length=10, blank=False, null=False)
    course_code = models.CharField(max_length=15, blank=False, null=False, unique=True)
    # is_active = models.BooleanField(default=True, null=False)

    generic = models.Manager()

    def __str__(self):
        return str(self.course_name)
