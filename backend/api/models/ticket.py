from django.db import models


class Ticket(models.Model):
    """
    The base class for tickets in the database. This is where the meat of the
    application purpose lies, as this table will hold all fields associated
    with a specific ticket. These fields are the professor, the section, the
    semester, the issue, the student who submitted the ticket, the tutor who
    primarily helped with the ticket, the tutor(s) who assisted the primary
    tutor, the name of the student, whether it was a successful ticket,
    the time the ticket was created, the date the ticket was created, the
    time the ticket was claimed (different than created), the time the
    ticket was closed, additional tutor comments, and if the ticket was
    reopened after it was closed.
    """
    professor = models.ForeignKey("api.Professor", on_delete=models.SET_NULL, null=True)
    section = models.ForeignKey("api.Section", on_delete=models.SET_NULL, null=True)
    issuing_user = models.ForeignKey("api.User", on_delete=models.SET_NULL, null=True, related_name="ticket_issuing_user")
    principal_tutor = models.ForeignKey("api.User", on_delete=models.SET_NULL, null=True, related_name="ticket_principal_tutor")
    assistant_tutor = models.ManyToManyField("api.User", related_name="assistant_tutors", blank=True)
    issue = models.ForeignKey("api.Issues", on_delete=models.SET_NULL, null=True)
    difficulty = models.ForeignKey("api.Difficulty", on_delete=models.SET_NULL, null=True)
    status = models.ForeignKey("api.Status", on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=250)
    description = models.CharField(max_length=500, blank=True)
    content = models.TextField()
    flagged = models.BooleanField(default=False)
    created_at_date = models.DateTimeField(auto_now_add=True)
    last_updated_at_date = models.DateTimeField(blank=True, null=True)
    last_updated_by_user = models.ForeignKey("api.User", on_delete=models.SET_NULL, null=True, related_name="ticket_last_updated_by_user")
    priority = models.IntegerField(default=0)

    def __str__(self) -> str:
        return str(self.issuing_user) + " - " + str(self.section)
