from django.db import models


class ProfessorManager(models.Manager):
    def get_professors(self):
        return super().get_queryset().all()

    def get_professor(self, professor: str):
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
    first_name: str = models.CharField(max_length=30)
    last_name: str = models.CharField(max_length=50)
    full_name: str = models.CharField(max_length=80)
    email: str = models.CharField(max_length=50)
    is_active: str = models.BooleanField(default=True)
    professor_id: str = models.BigIntegerField(
        unique=True, max_length=30, null=False, blank=False, primary_key=True
    )

    professor = ProfessorManager()
    prof = models.Manager()

    def __str__(self):
        return str(self.full_name)
