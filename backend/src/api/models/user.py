from django.db import models

from .course import Course
from .ticket import Ticket


class StudentManager(models.Manager):
    def get_students(self):
        return super().get_queryset().filter(is_tutor=False).filter(is_admin=False)

    def get_student(self, name: str):
        return (
            super()
            .get_queryset()
            .filter(is_tutor=False)
            .filter(is_admin=False)
            .filter(name)
        )


class TutorManager(models.Manager):
    def get_tutors(self):
        return super().get_queryset().filter(is_tutor=True)

    def get_tutor(self, name: str):
        return super().get_queryset().filter(is_tutor=True).filter(name)


class AdminManager(models.Manager):
    def get_admins(self):
        return super().get_queryset().filter(is_admin=True)

    def get_admin(self):
        return super().get_queryset().filter(is_admin=True)


class User(models.Model):
    courses_tutoring = models.ManyToManyField(
        Course, related_name="usertocoursetutored", blank=True, null=True
    )
    courses_taken = models.ManyToManyField(
        Course, related_name="usertocoursetaken", blank=True, null=True
    )
    tickets = models.ForeignKey(Ticket, on_delete=models.PROTECT, blank=True, null=True)
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=False)
    is_working = models.BooleanField(default=False)
    is_tutor = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    user_bio = models.TextField(blank=True, max_length=500)
    email = models.EmailField(blank=False, unique=True)
    MSOID = models.CharField(max_length=75, unique=True)

    student = StudentManager()
    tutor = TutorManager()
    admin = AdminManager()

    def __str__(self):
        return self.name
