from django.db import models

from api.models.ticket import Ticket
from api.models.user import User


class Comment(models.Model):
    issuing_user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='comment_issuing_user')
    last_updated_by_user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="commented_last_updated_by")
    created_at_date = models.DateTimeField(auto_now_add=True)
    updated_at_date = models.DateTimeField(auto_now=True, null=True)
    content = models.TextField()
    flagged = models.BooleanField(default=False)
    ticket = models.ForeignKey(Ticket, on_delete=models.SET_NULL, null=True)

    class Meta:
        verbose_name_plural = "comments"

    def __str__(self):
        return self.issuing_user
