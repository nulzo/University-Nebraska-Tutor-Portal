from django.db import models
from django.db.models.query import QuerySet

from api.models.people import People


class ProfessorManager(models.Manager):
    def get_professors(self) -> QuerySet:
        return super().get_queryset().all()

    def get_professor(self, professor: str) -> QuerySet:
        return super().get_queryset().filter(full_name=professor)


class Professor(models.Model):
    """
    The professor table holds all details attributed to a professor.
    This table contains a professors first name, their last name,
    their full name, their email address, whether they are currently
    active (see "semester" for more detail on that), and their prof.
    ID. Since the professor ID is guranteed to be unique, we have opted
    to use this as the primary key for the table. As such, professors
    are searchable by their unique ID, and the serializer will likewise
    return the str representation as well.
    """

    info = models.OneToOneField(People, on_delete=models.CASCADE)
    active = models.BooleanField(default=False)

    professor = ProfessorManager()
    generic = models.Manager()

    def __str__(self) -> str:
        return str(self.info)
