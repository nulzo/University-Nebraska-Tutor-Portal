from django.contrib import admin

from .models import course, hours, issue, messages, professor, sections, ticket, user, semester

# Register your models here.
admin.site.register(ticket.Ticket)
admin.site.register(professor.Professor)
admin.site.register(course.Course)
admin.site.register(issue.Issues)
admin.site.register(user.User)
admin.site.register(sections.Section)
admin.site.register(messages.Messages)
admin.site.register(hours.Hour)
admin.site.register(semester.Semester)
