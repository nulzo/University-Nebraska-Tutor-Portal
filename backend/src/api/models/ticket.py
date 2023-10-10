from django.db import models

from .course import Course
from .professor import Professor
from .issue import Issues


class TicketManager(models.Manager):
    def get_all(self):
        return super().get_queryset()

    def get_student(self, student: str):
        return super().get_queryset().filter(student=student)

    def get_professor(self, professor: str):
        return super().get_queryset().filter(professor=professor)

    def get_tutor(self, professor: str):
        return super().get_queryset().filter(professor=professor)


class Ticket(models.Model):
    professor = models.ForeignKey(Professor, null=True, on_delete=models.PROTECT)
    course = models.ForeignKey(Course, null=True, on_delete=models.PROTECT)
    issue = models.ForeignKey(Issues, null=True, on_delete=models.PROTECT)
    email = models.CharField(blank=False, max_length=30)
    name = models.CharField(blank=False, max_length=50)
    completed = models.BooleanField(default=False)
    started = models.BooleanField(default=False)
    start_time = models.DateTimeField(null=True, blank=True)
    end_time = models.DateTimeField(null=True, blank=True)
    was_reopened = models.BooleanField(default=False)
    was_successful = models.BooleanField(default=False)
    description = models.CharField(max_length=255)
    comments = models.CharField(max_length=255)

    def __str__(self):
        return self.name + " - " + self.course.course_name
