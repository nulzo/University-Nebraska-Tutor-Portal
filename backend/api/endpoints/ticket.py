from typing import Any

from django.db.models.query import QuerySet
from django.http import Http404, HttpResponseBadRequest, QueryDict
from rest_framework import status
from rest_framework.renderers import (
    BrowsableAPIRenderer,
    HTMLFormRenderer,
    JSONRenderer,
)
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models.course import Course
from api.models.issue import Issues
from api.models.professor import Professor
from api.models.ticket import Ticket
from api.models.user import User
from api.serializers import TicketGetSerializer, TicketSerializer

# We don't need to check for duplicate class names and function names.
# pylint: disable=E0102,E1101,R0914


class APITicketView(APIView):
    serializer_class = TicketSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get_querystring(self, request: Request) -> Response:
        return request.GET

    def sanitize(self, querystring: str) -> str:
        return querystring.upper()

    def get(self, request: Request) -> Response:
        users = User.generic.all()
        querystring = self.get_querystring(request=request)

        if querystring:
            if department := querystring.get("department"):
                users = users.filter(course_department=self.sanitize(department))

            if name := querystring.get("name"):
                users = users.filter(name=name)

            if name_contains := querystring.get("name-contains"):
                users = users.filter(name__icontains=name_contains)

            if first_name := querystring.get("first-name"):
                users = users.filter(name__istartswith=first_name)

            if last_name := querystring.get("last-name"):
                users = users.filter(name__iendswith=last_name)

            if tutor := querystring.get("tutor"):
                users = users.filter(is_tutor=tutor.capitalize())

            if admin := querystring.get("admin"):
                users = users.filter(is_admin=admin.capitalize())

            if msoid := querystring.get("msoid"):
                users = users.filter(MSOID=msoid)

            if nuid := querystring.get("nuid"):
                users = users.filter(student_nuid=nuid)

            if working := querystring.get("working"):
                users = users.filter(is_tutor=True).filter(
                    is_working=working.capitalize()
                )

            if active := querystring.get("active"):
                users = users.filter(is_active=active.capitalize())

        serializer = TicketSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = TicketSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data)


class APITicketList(APIView):
    serializer_class = TicketGetSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get_querystring(self, request: Request) -> Response:
        return request.GET

    def sanitize(self, querystring: str) -> str:
        return querystring.capitalize()

    def get_professor_id(self, professor_name: str) -> Professor | None:
        return Professor.prof.all().filter(full_name=professor_name).first()

    def get_course_id(self, course_name: str) -> Course | None:
        return Course.generic.all().filter(course_name=course_name).first()

    def get_issue_id(self, issue_type: str) -> Issues | None:
        return Issues.generic.all().filter(problem_type=issue_type).first()

    def get_user_id(self, user: str) -> User | None:
        return User.generic.all().filter(name=user).first()

    def get(self, request: Request) -> Response:
        tickets = Ticket.generic.all()
        querystring = self.get_querystring(request=request)
        if querystring:
            if is_completed := querystring.get("completed"):
                tickets = tickets.filter(completed=is_completed.capitalize())
            if is_started := querystring.get("started"):
                tickets = tickets.filter(started=is_started.capitalize())
        serializer = TicketGetSerializer(tickets, many=True)
        return Response(serializer.data)

    def post(self, request: Request, search: str | None = None) -> Response:
        serializer = TicketSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
