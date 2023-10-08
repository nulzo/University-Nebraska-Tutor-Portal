from django.contrib import admin

from .models import course, dummy, professor, student, ticket, tutor, hours

# Register your models here.
admin.site.register(student.Student)
admin.site.register(ticket.Ticket)
admin.site.register(professor.Professor)
admin.site.register(course.Course)
admin.site.register(tutor.Tutor)
admin.site.register(dummy.Dummy)
admin.site.register(hours.Hours)
