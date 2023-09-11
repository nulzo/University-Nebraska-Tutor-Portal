from django.contrib import admin

from .models import course, professor, student, ticket, tutor

# Register your models here.
admin.site.register(student.Student)
admin.site.register(ticket.Ticket)
admin.site.register(professor.Professor)
admin.site.register(course.Course)
admin.site.register(tutor.Tutor)
