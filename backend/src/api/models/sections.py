from django.db import models

from .course import Course


class SectionManager(models.Manager):
    def get_all(self):
        return super().get_queryset()


class OnlineSectionManager(models.Manager):
    def get_all(self):
        return super().get_queryset().filter(modality="850")


class InPersonSectionManager(models.Manager):
    def get_all(self):
        return super().get_queryset().filter(modality="001")


class HybridSectionManager(models.Manager):
    def get_all(self):
        return super().get_queryset().filter(modality="002")


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
        "api.Professor", on_delete=models.PROTECT, null=True, blank=True
    )
    course = models.ForeignKey(Course, on_delete=models.PROTECT, null=True, blank=True)
    section_id = models.BigIntegerField(
        primary_key=True, unique=True, blank=False, null=False
    )

    online = OnlineSectionManager()
    inperson = InPersonSectionManager()
    hybrid = HybridSectionManager()
    sections = SectionManager()
    generic = models.Manager()

    def __str__(self):
        return f"{self.course}"

    class Meta:
        verbose_name_plural = "sections"
