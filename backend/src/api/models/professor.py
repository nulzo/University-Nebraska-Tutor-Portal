from django.db import models


class ProfessorManager(models.Manager):
    def get_professors(self):
        return super().get_queryset().all()

    def get_professor(self, professor: str):
        return super().get_queryset().filter(professor=professor)


class Professor(models.Model):
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=30)
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)

    professor = ProfessorManager()

    def __str__(self):
        return self.full_name
