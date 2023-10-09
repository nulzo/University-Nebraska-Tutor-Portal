from django.db import models
from .professor import Professor
from .ticket import Ticket
from .course import Course


class Section(models.Model):
    section_number = models.CharField(default="001", blank=False, null=False)
    modality = models.CharField(null=False, blank=False, default="In-Person")
    professor = models.ForeignKey(Professor, on_delete=models.PROTECT)
    tickets = models.ForeignKey(Ticket, on_delete=models.PROTECT)
    course = models.ForeignKey(Course, on_delete=models.PROTECT)

    def __str__(self):
        return str(self)
