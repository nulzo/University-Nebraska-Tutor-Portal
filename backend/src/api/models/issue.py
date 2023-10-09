from django.db import models


class IssueManager(models.Manager):
    def get_issues(self):
        return super().get_queryset()


class Issues(models.Model):
    problem_type = models.CharField(max_length=25, null=False, blank=False)
    severity = models.CharField(
        max_length=1,
        choices=[("1", "1"), ("2", "2"), ("3", "3"),
                 ("4", "4"), ("5", "5")],
        default="1")

    def __str__(self):
        return self.problem_type

    issue = IssueManager()

    class Meta:
        verbose_plural_name = "issue_types"
