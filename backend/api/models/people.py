from django.db import models


class People(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    name = models.CharField(max_length=200)
    email = models.EmailField(blank=True)
    discriminator = models.CharField(max_length=100, unique=True)

    def __str__(self) -> str:
        return str(self.name)
