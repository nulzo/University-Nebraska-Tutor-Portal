from django.db import models


class Color(models.Model):
    """
    The color table simply allows a user to select a certain color for
    their avatar. These fields static and associated with an enum
    shown below. This just adds some flair to a profile, and increases
    seperation of concerns within tables (preventing monolithic tables).
    """
    class ColorChoices(models.IntegerChoices):
        RED = 1
        ORANGE = 2
        YELLOW = 3
        GREEN = 4
        BLUE = 5
        CYAN = 6
        INDIGO = 7
        VIOLET = 8
        PINK = 9
    color_id = models.IntegerField(choices=ColorChoices.choices, default=3)

    class Meta:
        verbose_name_plural = "colors"
