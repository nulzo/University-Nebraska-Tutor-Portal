from django.db import models


# Create your models here.
class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    # courses = models.ManyToManyField(Course)

    def __str__(self):
        return self.name
