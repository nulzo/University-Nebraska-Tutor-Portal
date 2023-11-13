from django.db import models

from .issue import Issues
from .professor import Professor


class TicketManager(models.Manager):
    def get_all(self):
        return super().get_queryset()

    def get_student(self, student: str):
        return super().get_queryset().filter(student=student)

    def get_professor(self, professor: str):
        return super().get_queryset().filter(professor=professor)

    def get_tutor(self, tutor: str):
        return super().get_queryset().filter(tutor=tutor)

    def get_section(self, section: str):
        return super().get_queryset().filter(section=section)

    def get_course(self, course: str):
        return super().get_queryset().filter(section__course=course)

    def get_active(self):
        return super().get_queryset().exclude(completed=True).exclude(started=False)

    def get_completed(self):
        return super().get_queryset().filter(completed=True)

    def get_unclaimed(self):
        return super().get_queryset().exclude(started=True).exclude(completed=True)

    def get_successful(self):
        return super().get_queryset().filter(was_successful=True).filter(completed=True)


class Ticket(models.Model):
    """
    The base class for tickets in the database. This is where the meat of the
    application purpose lies, as this table will hold all fields associated
    with a specific ticket. These fields are the professor, the section, the
    semester, the issue, the student who submitted the ticket, the tutor who
    primarily helped with the ticket, the tutor(s) who assisted the primary
    tutor, the name of the student, whether it was a successful ticket,
    the time the ticket was created, the date the ticket was created, the
    time the ticket was claimed (different than created), the time the
    ticket was closed, additional tutor comments, and if the ticket was
    reopened after it was closed.
    """

    professor = models.ForeignKey(Professor, null=True, on_delete=models.PROTECT)
    # section = models.ForeignKey("api.Section", null=True, on_delete=models.PROTECT)
    course = models.ForeignKey("api.Course", null=True, on_delete=models.PROTECT)
    issue = models.ForeignKey(Issues, null=True, on_delete=models.PROTECT)
    student = models.ForeignKey(
        "api.User",
        null=True,
        on_delete=models.PROTECT,
        related_name="student_ticket",
        blank=True,
    )
    tutor = models.ForeignKey(
        "api.User",
        null=True,
        on_delete=models.PROTECT,
        related_name="tutor_ticket",
        blank=True,
    )
    name = models.CharField(blank=False, max_length=50)
    description = models.TextField(max_length=1024)
    completed = models.BooleanField(default=False)
    started = models.BooleanField(default=False)
    start_time = models.DateTimeField(null=True, blank=True)
    end_time = models.DateTimeField(null=True, blank=True)
    tutor_comments = models.CharField(max_length=255, blank=True)
    was_successful = models.BooleanField(default=False)
    was_reopened = models.BooleanField(default=False)

    generic = models.Manager()
    ticket = TicketManager()

    def __str__(self):
        return self.name + " - " + str(self.course)
