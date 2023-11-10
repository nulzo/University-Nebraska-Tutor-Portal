from django.db import models


class IssueManager(models.Manager):
    def get_issues(self):
        return super().get_queryset()


class Issues(models.Model):
    """
    Issues are a field in the ticket that a user will choose to describe the
    issue they are having. This allows for ticket issues to be comprehensively
    studied, and provides cleaner data as opposed to users entering their
    issue type manually. With this style of ticket issue, data analysis can be
    done more rapidly and with a higher confidence than previous methods allowed.
    The fields in the table are the problem type (i.e. homework), the severity (
    used for data collection purposes). The admin is able to quickly add and
    modify the issues with no consequence to the attributed tickets.
    """
    issue_id = models.AutoField(primary_key=True, editable=False)
    problem_type: str = models.CharField(
        max_length=25, null=False, blank=False, default="Problem"
    )
    severity: str = models.CharField(
        max_length=1,
        choices=[("1", "1"), ("2", "2"), ("3", "3"), ("4", "4"), ("5", "5")],
        default="1",
    )

    def __str__(self):
        return str(self.problem_type)

    # issue = IssueManager()
    generic = models.Manager()

    class Meta:
        verbose_name_plural = "issue_types"
