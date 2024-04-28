from django.contrib import admin

from .models import (ticket, announcement_type, announcement, status, semester, color, comments, course, difficulty,
                     hours, issue, loved_comments, loved_tickets, people, professor, priority, roles, sections,
                     user_settings, user)

# Register your models here.
admin.site.register(ticket.Ticket)
admin.site.register(professor.Professor)
admin.site.register(course.Course)
admin.site.register(issue.Issues)
admin.site.register(user.User)
admin.site.register(sections.Section)
admin.site.register(announcement.Announcement)
admin.site.register(announcement_type.AnnouncementType)
admin.site.register(comments.Comment)
admin.site.register(color.Color)
admin.site.register(hours.OpeningHours)
admin.site.register(people.People)
admin.site.register(status.Status)
admin.site.register(loved_comments.LovedComments)
admin.site.register(loved_tickets.LovedTickets)
admin.site.register(priority.Priority)
admin.site.register(roles.Role)
admin.site.register(user_settings.UserSettings)
admin.site.register(difficulty.Difficulty)
admin.site.register(semester.Semester)
