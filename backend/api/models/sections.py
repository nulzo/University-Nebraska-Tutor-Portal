from django.db import models

from .course import Course
from .professor import Professor
from .semester import Semester


class Section(models.Model):
    """
    Sections are the specific instances of courses that occur during a
    semester. Sections are specific versions of similar catalog numbers,
    such as CSCI-4500-850 and CSCI-4500-001. These sections allow for
    specific courses to be referenced by their online variant, or their
    unique professor, thereby allowing for easier aggregation of data
    surrounding individual sections of the same course. The fields in
    the model include the modality (online, in person, etc), the professor
    the course number, and the section ID.
    """

    modality = models.CharField(
        null=False,
        blank=False,
        default="001",
        max_length=10,
    )
    professor = models.ForeignKey(
        Professor, on_delete=models.SET_NULL, null=True, blank=True
    )
    semester = models.ForeignKey(Semester, on_delete=models.SET_NULL, null=True)
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, blank=True)
    discriminator = models.CharField(max_length=255)

    generic = models.Manager()

    def __str__(self) -> str:
        return f"{self.course}"

    class Meta:
        verbose_name_plural: str = "sections"
