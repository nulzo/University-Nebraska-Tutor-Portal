from django.db import models


class Priority(models.Model):
    icon = models.CharField(max_length=100)
    color = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    discriminator = models.CharField(max_length=50, unique=True)

    class Meta:
        verbose_name_plural = "priorities"

    def __str__(self):
        return self.name
