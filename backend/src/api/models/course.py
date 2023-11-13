from django.db import models


class Course(models.Model):
    """
    The course table holds all information about a specific course. It is important
    to make the distinction between a course and a section. A course can have many
    sections, whereas a section can only be attributed to a single course. The
    course is what you would see in a catalog (i.e. CIST-1400 & CSCI-1620), and
    sections are the specific instances of the course (online, in person, etc.).
    A course has no one professor assigned to them, and instead the sections store
    this data. It should be clear now the difference betwen the two. As such, the
    course table stores the course department (i.e. CSCI), the course name (how
    it would occur in the catalog), the course ID (i.e. 4500), and whether the
    course is active in a semster (see "semester" for more information on how
    this is determined.)
    """

    course_department = models.CharField(max_length=10, blank=False, default="CSCI")
    course_name = models.CharField(max_length=100, blank=False)
    course_id = models.IntegerField(max_length=10, blank=False, null=False)
    course_code = models.CharField(max_length=15, blank=False, null=False, unique=True)

    generic: models.Manager = models.Manager()

    def __str__(self) -> str:
        return str(self.course_name)
