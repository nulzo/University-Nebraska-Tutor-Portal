from django.contrib import admin

from .models import (
    course,
    cslc_hours,
    dummy,
    issue,
    messages,
    professor,
    sections,
    ticket,
    user,
)

# Register your models here.
admin.site.register(ticket.Ticket)
admin.site.register(professor.Professor)
admin.site.register(course.Course)
admin.site.register(dummy.Dummy)
admin.site.register(cslc_hours.CSLC_Hours)
admin.site.register(issue.Issues)
admin.site.register(user.User)
admin.site.register(sections.Section)
admin.site.register(messages.Messages)
