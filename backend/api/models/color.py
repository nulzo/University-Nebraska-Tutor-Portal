from django.db import models


class Color(models.Model):
    """The color table simply allows a user to select a certain color for
    their avatar. These fields static and associated with an enum
    shown below. This just adds some flair to a profile, and increases
    seperation of concerns within tables (preventing monolithic tables).

    Note:
            Do not include the `self` parameter in the ``Args`` section.

    Attributes:
        color_id (:obj:`IntegerField`): Integer field for the color ID associated with the color
        the user chooses. This is from the **ColorChoices** class.

        verbose_name_plural (:obj:`str`): The `Color` model has a meta option to set the verbose
        name in plural form to "colors".

    """

    class ColorChoices(models.IntegerChoices):
        """An enumeration class that defines the following color choices:

        - `RED` (1)
        - `ORANGE` (2)
        - `YELLOW` (3)
        - `GREEN` (4)
        - `BLUE` (5)
        - `CYAN` (6)
        - `INDIGO` (7)
        - `VIOLET` (8)
        - `PINK` (9)
        """

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
