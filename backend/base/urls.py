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
# pylint: disable=E0401

from django.contrib import admin
from django.urls import path

from src.api import views as routing

urlpatterns = [
    # Admin URLS
    path("admin/", admin.site.urls),
    # API Config URLS
    path("api/", view=routing.APIURLView.as_view()),
    # Issue URLS
    path("api/issues/", view=routing.IssueListView.as_view()),
    path("api/issues/<str:pk>", view=routing.IssueDetailView.as_view()),
    # Ticket URLS
    path("api/tickets/", view=routing.APITicketView.as_view(), name="Tickets"),
    path(
        "api/tickets/<str:ticket_pk>/",
        view=routing.TicketDetailView.as_view(),
        name="Query a Ticket",
    ),
    # Tutor URLS
    path("api/tutors/", view=routing.TutorListView.as_view(), name="List Tutors"),
    path(
        "api/tutors/<str:tutor_pk>/",
        view=routing.TutorDetailView.as_view(),
        name="Detail Tutors",
    ),
    path(
        "api/tutors/successful-tickets/<str:tutor_pk>",
        view=routing.TutorDetailView.as_view(),
        name="Detail Tutors",
    ),
    # Professor URLS
    path(
        "api/professors/",
        view=routing.ProfessorListView.as_view(),
        name="professor",
    ),
    path(
        "api/professors/<str:professor_pk>",
        view=routing.ProfessorDetailView.as_view(),
        name="Professor Detail View",
    ),
    # Section URLS
    path(
        "api/sections/",
        view=routing.APISectionList.as_view(),
        name="Section List View",
    ),
    # path("api/sections/<str:section_id>"),
    # path("api/sections/online"),
    # path("api/sections/in-person"),
    # path("api/sections/hybrid"),
    # path("api/sections/term/<str:term_pk>"),
    # Student URLS
    path(
        "api/students/",
        view=routing.StudentListView.as_view(),
        name="Student List View",
    ),
    path(
        "api/student/<str:pk>",
        view=routing.StudentDetailView.as_view(),
        name="Student Detail View",
    ),
    path("api/users/", view=routing.APIUserList.as_view()),
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
    path("api/courses/", view=routing.APICourseList.as_view(), name="Course List View"),
    # path("api/courses/<str:course_pk>", view=routing.MessageViewSet.as_view()),
    # path("api/courses/department/<str:dept>"),
    # path("api/courses/active/"),
    path("api/prof/", view=routing.APIProfessorList.as_view(), name="professor"),
]
