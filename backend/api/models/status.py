from django.db import models


class Status(models.Model):
    name = models.CharField(max_length=1000)
    description = models.TextField()
    discriminator = models.CharField(max_length=100)
    color = models.ForeignKey("api.Color", on_delete=models.CASCADE)

    def __str__(self) -> str:
        return str(self.name)

    generic: models.Manager = models.Manager()

    class Meta:
        verbose_name_plural: str = "status_types"
