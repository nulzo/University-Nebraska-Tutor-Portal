from django.db import models


class LovedComments(models.Model):
    user = models.ForeignKey("api.User", on_delete=models.SET_NULL, null=True)
    ticket = models.ForeignKey("api.Comment", on_delete=models.SET_NULL, null=True)
    loved_at_date = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "loved_comments"

    def __str__(self) -> str:
        return str(self.user)