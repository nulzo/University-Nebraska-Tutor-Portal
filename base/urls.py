"""
URL configuration for University-Nebraska-Tutor-Portal project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path

from backend.src.api import views as routing

urlpatterns = [
    
    # Admin URLS
    path("admin/", admin.site.urls),
    
    # API Config URLS
    path("api/", view=routing.APIURLView.as_view()),
    
    # Issue URLS
    path("api/issues/", view=routing.IssueListView.as_view()),
    path("api/issues/<str:pk>", view=routing.IssueDetailView.as_view()),
    # path("api/issues/top-issues"),
    # path("api/issues/severity/<str:severity_pk>"),
    
    # Ticket URLS
    path("api/tickets/", view=routing.TicketListView.as_view(), name="Query All Tickets"),
    path("api/tickets/<str:ticket_pk>/", view=routing.TicketDetailView.as_view(), name="Query a Ticket"),
    path("api/tickets/student/<str:student_pk>/", view=routing.StudentTicketDetailView.as_view(), name="Student Tickets"),
    path("api/tickets/professor/<str:professor_pk>/", view=routing.ProfessorTicketDetailView.as_view(), name="Professor Tickets"),
    path("api/tickets/section/<str:section_pk>/", view=routing.SectionTicketDetailView.as_view(), name="Section Tickets"),
    path("api/tickets/tutor/<str:tutor_pk>", view=routing.TutorTicketDetailView.as_view(), name="Tutor Tickets"),
    path("api/tickets/course/<str:course_pk>", view=routing.CourseTicketDetailView.as_view(), name="Course Tickets"),
    path("api/tickets/completed/", view=routing.CompletedTicketListView.as_view(), name="Completed Tickets"),
    path("api/tickets/active/", view=routing.ActiveTicketListView.as_view(), name="Active Tickets"),
    path("api/tickets/unclaimed/", view=routing.UnclaimedTicketListView.as_view(), name="Unclaimed Tickets"),
    path("api/tickets/successful/", view=routing.SuccessfulTicketListView.as_view(), name="Successful Tickets"),
    # path("api/tickets/issue/<str:issue_pk>/", view=routing.SectionTicketDetailView.as_view(), name="Issue Tickets"),
    # path("api/tickets/reopened/", view=routing.SectionTicketDetailView.as_view(), name="Issue Tickets"),
    
    # Tutor URLS
    path("api/tutors/", view=routing.TutorListView.as_view(), name="List Tutors"),
    path("api/tutors/<str:tutor_pk>/", view=routing.TutorDetailView.as_view(), name="Detail Tutors"),
    path("api/tutors/successful-tickets/<str:tutor_pk>", view=routing.TutorDetailView.as_view(), name="Detail Tutors"),
    # path("api/tutors/unsuccessful-tickets/<str:tutor_pk>"),
    # path("api/tutors/total-tickets/<str:tutor_pk>"),
    # path("api/tutors/<str:tutor_pk>/bio"),
    # path("api/tutors/<str:tutor_pk>/is-working"),
    # path("api/tutors/<str:tutor_pk>/is-active"),
    # path("api/tutors/<str:tutor_pk>/courses-taken"),
    # path("api/tutors/<str:tutor_pk>/courses-tutoring"),
    # path("api/tutors/hours/"),
    # path("api/tutors/hours/<str:tutor_pk>"),

    # Professor URLS
    path("api/professors/", view=routing.ProfessorListView.as_view(), name="Professor List View"),
    path("api/professors/<str:professor_pk>", view=routing.ProfessorDetailView.as_view(), name="Professor Detail View"),
    # path("api/professors/<str:course_pk>", view=routing.MessageViewSet.as_view()),
    # path("api/professors/active/"),
    # path("api/professors/inactive/"),
    
    # Section URLS
    path("api/sections/", view=routing.SectionListView.as_view(), name="Section List View"),
    # path("api/sections/<str:section_id>"),
    # path("api/sections/online"),
    # path("api/sections/in-person"),
    # path("api/sections/hybrid"),
    # path("api/sections/term/<str:term_pk>"),
    
    # Student URLS
    # path("api/students/"),
    # path("api/students/<str:student_pk>"),
    # path("api/students/<str:grade_level>"),
    
    # Admin (Superuser) URLS
    # path("api/admin/"),
    # path("api/admin/<str:admin_pk>"),
    
    # Hours URLS
    # path("api/hours/"),
    # path("api/hours/<str:hour_pk"),
    # path("api/hours/is-open/"),
    
    # Message URLS
    path("api/messages/", view=routing.MessageViewSet.as_view()),
    # path("api/messages/<str:message_id>", view=routing.MessageViewSet.as_view()),
    # path("api/messages/active/"),
    # path("api/messages/inactive/"),
    # path("api/messages/activate/<str:message_pk>"),

    # Course URLS
    # path("api/courses/", view=routing.MessageViewSet.as_view()),
    # path("api/courses/<str:course_pk>", view=routing.MessageViewSet.as_view()),
    # path("api/courses/department/<str:dept>"),
    # path("api/courses/active/"),
]
