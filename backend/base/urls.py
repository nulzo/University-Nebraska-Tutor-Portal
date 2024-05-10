"""URL configuration for University-Nebraska-Tutor-Portal project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples: Function views
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

from api.endpoints import (
    announcement,
    authenticate,
    course,
    hours,
    issue,
    professor,
    section,
    ticket,
    user,
)

urlpatterns = [
    # API Config URLS
    # path("api/", view=routing.APIURLView.as_view()),
    # Admin URLS
    path("api/admin/", admin.site.urls),
    # Announcement URLS
    path("api/announcements", view=announcement.APIAnnouncementView.as_view()),
    # Issue URLS
    path("api/issues/", view=issue.APIIssueView.as_view()),
    path("api/issues/<str:pk>", view=issue.APIIssueDetail.as_view()),
    # Ticket URLS
    path("api/tickets/", view=ticket.APITicketView.as_view(), name="Tickets"),
    path(
        "api/tickets/<str:ticket_id>/",
        view=ticket.APITicketDetail.as_view(),
        name="Query a Ticket",
    ),
    # Professor URLS
    path(
        "api/professors/",
        view=professor.APIProfessorView.as_view(),
        name="professor",
    ),
    path(
        "api/professors/<str:professor_pk>",
        view=professor.APIProfessorDetail.as_view(),
        name="Professor Detail View",
    ),
    # Section URLS
    path(
        "api/sections/",
        view=section.APISectionView.as_view(),
        name="Section List View",
    ),
    path(
        "api/sections/<str:section_id>",
        view=section.APISectionDetail.as_view(),
        name="Section Detail View",
    ),
    # User URLS
    # (students and tutors are accessible through endpoint)
    path("api/users/", view=user.APIUserView.as_view()),
    path("api/users/<str:user_id>", view=user.APIUserDetail.as_view()),
    # Hours URLS
    # path("api/hours/"),
    # path("api/hours/<str:hour_pk"),
    # Authentication
    path("api/authenticate/", view=authenticate.APIAuthenticateList.as_view()),
    # Message URLS
    # path("api/messages/", view=routing.APIMessageView.as_view()),
    # path("api/messages/<str:message_id>", view=routing.MessageViewSet.as_view()),
    # Announcement URLS
    # path("api/announcements/")
    # path("api/announcements/<str:annonucement_id>")
    # Course URLS
    path("api/courses/", view=course.APICourseList.as_view(), name="Course List View"),
    path("api/hours/", view=hours.APIHourView.as_view(), name="Hours List View"),
    # path("api/courses/<str:course_pk>", view=routing.MessageViewSet.as_view()),
]
