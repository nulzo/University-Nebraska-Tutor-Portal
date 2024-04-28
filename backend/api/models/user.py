from django.db import models


class User(models.Model):
    """
    Generic user model for all active users of the application. Flags are used
    to indicate whether a user is an admin, a tutor, or a regular student. This
    currently will hold all data, such as tutor and admin specific data, but
    this might lead to empty fields within many of the objects in the table.
    This will be updated in the future to allow specific roles to be relations
    in the database, thus preventing empty fields (i.e. empty cells).
    """

    info = models.ForeignKey("api.People", on_delete=models.CASCADE)
    role = models.ForeignKey("api.Role", on_delete=models.SET_NULL, null=True)
    settings = models.OneToOneField("api.UserSettings", on_delete=models.CASCADE)
    last_login_date = models.DateTimeField(auto_now=True, null=True, blank=True)
    created_at_date = models.DateField(auto_now_add=True, null=True)

    def __str__(self) -> str:
        return str(self.info)
