from django.db import models


class ProfessorManager(models.Manager):
    def get_professors(self):
        return super().get_queryset().all()

    def get_professor(self, professor: str):
        return super().get_queryset().filter(full_name=professor)


class Professor(models.Model):
    first_name: str = models.CharField(max_length=25)
    last_name: str = models.CharField(max_length=30)
    full_name: str = models.CharField(max_length=100)
    email: str = models.CharField(max_length=100)
    is_active: str = models.BooleanField(default=True)
    professor_id: str = models.CharField(
        unique=True, max_length=30, null=False, blank=False
    )

    professor = ProfessorManager()
    prof = models.Manager()

    def __str__(self):
        return str(self.full_name)
