from django.db import models

from .course import Course
from .professor import Professor
from .student import Student
from .tutor import Tutor


# Create your models here.
class Ticket(models.Model):
    student = models.ForeignKey(Student, null=True, on_delete=models.PROTECT)
    professor = models.ForeignKey(Professor, null=True, on_delete=models.PROTECT)
    course = models.ForeignKey(Course, null=True, on_delete=models.PROTECT)
    tutor = models.ForeignKey(Tutor, null=True, on_delete=models.PROTECT)
    issue = models.ForeignKey(Issue)
    email = models.CharField(blank=False)
    name = models.CharField(blank=False)
    completed = models.BooleanField(default=False)
    started = models.BooleanField(default=False)
    issue_type = models.CharField(max_length=100)
    start_time = models.DateTimeField(null=True, blank=True)
    end_time = models.DateTimeField(null=True, blank=True)
    was_reopened = models.BooleanField(default=False)
    was_successful = models.BooleanField(default=False)
    description = models.CharField(max_length=255)
    comments = models.CharField(max_length=255)

    def __str__(self):
        return self.student.name + " - " + self.course.course_name
