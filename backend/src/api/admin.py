from django.contrib import admin

from .models import course, issue, messages, professor, sections, ticket, user

# Register your models here.
admin.site.register(ticket.Ticket)
admin.site.register(professor.Professor)
admin.site.register(course.Course)
admin.site.register(issue.Issues)
admin.site.register(user.User)
admin.site.register(sections.Section)
admin.site.register(messages.Messages)
