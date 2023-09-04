from django.db import models


class Example(models.Model):
    title = models.CharField(max_length=150)
    description = models.CharField(max_length=500)
    completed = models.BooleanField(default=False)

    # string representation of the class
    def __str__(self):
        # it will return the title
        return self.title
