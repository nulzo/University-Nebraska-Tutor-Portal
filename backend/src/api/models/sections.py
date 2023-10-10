from django.db import models
# from .professor import Professor
from .ticket import Ticket
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
    MODALITY_CHOICES = (
        ("Online", "850"),
        ("In-Person", "001"),
        ("Hybrid", "002")
    )
    section_number = models.CharField(default="001", blank=False, null=False, max_length=15)
    modality = models.CharField(null=False, blank=False, default="In-Person",
                                max_length=10, choices=MODALITY_CHOICES)
    professor = models.ForeignKey("api.Professor", on_delete=models.PROTECT, null=True, blank=True)
    tickets = models.ForeignKey(Ticket, on_delete=models.PROTECT, null=True, blank=True)
    course = models.ForeignKey(Course, on_delete=models.PROTECT, null=True, blank=True)

    online = OnlineSectionManager()
    inperson = InPersonSectionManager()
    hybrid = HybridSectionManager()
    sections = SectionManager()

    def __str__(self):
        return f"{self.course}-{self.section_number}"

    class Meta:
        verbose_name_plural = "sections"
