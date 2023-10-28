from django.db import models


class Course(models.Model):
    course_department = models.CharField(max_length=10, blank=False, default="CSCI")
    course_name = models.CharField(max_length=100, blank=False)
    course_id = models.CharField(max_length=25, blank=False, null=False)
    # is_active = models.BooleanField(default=True, null=False)

    def __str__(self):
        return str(self.course_name)
