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

from .models.course import Course
from .models.issue import Issues
from .models.messages import Messages
from .models.professor import Professor
from .models.sections import Section
from .models.ticket import Ticket
from .models.user import User
from .serializers import (
    CourseSerializer,
    IssueSerializer,
    MessageSerializer,
    ProfessorSerializer,
    SectionSerializer,
    TicketGetSerializer,
    TicketSerializer,
    UserSerializer,
)


class APIProfessorView(APIView):
    serializer_class = ProfessorSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get_querystring(self, request: Request) -> QueryDict | Any:
        return request.GET

    def sanitize(self, querystring: str) -> str:
        return querystring.title()

    def get(self, request: Request) -> Response:
        professors: QuerySet = Professor.professor.get_professors()
        query_string: dict = self.get_querystring(request=request)
        if query_string:
            if professor_name := query_string.get("name"):
                professors = professors.filter(
                    full_name=self.sanitize(professor_name))
            if professor_id := query_string.get("id"):
                professors = professors.filter(professor_id=professor_id)
            if professor_first_name := query_string.get("first-name"):
                professors = professors.filter(
                    first_name=self.sanitize(professor_first_name)
                )
            if professor_last_name := query_string.get("last-name"):
                professors = professors.filter(
                    last_name=self.sanitize(professor_last_name)
                )
            if professor_is_active := query_string.get("active"):
                professors = professors.filter(
                    is_active=self.sanitize(professor_is_active)
                )
            if len(professors) == 0:
                return HttpResponseBadRequest(content="No professor found")
        serializer = ProfessorSerializer(professors, many=True)
        return Response(serializer.data)

    def post(self, request: Request, search: str | None = None) -> Response:
        Professor.professor.get_professors()
        serializer = ProfessorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class APIProfessorDetail(APIView):
    serializer_class = ProfessorSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def query_obj(self, pk: str) -> QuerySet:
        """Add more fish or shrimp to the tank.

        :param inhabitant: The type of inhabitant, either shrimp of fish
        :param quantity: The number of fish or shrimp to be added

        :raises TankIsFullError: if the tank is already full
        """
        try:
            return Professor.professor.get_professors().filter(pk=pk)
        except Exception as exc:
            raise Http404 from exc

    def get(self, request: Request, professor_pk: str) -> Response:
        queryset = self.query_obj(professor_pk)
        serializer = ProfessorSerializer(queryset, many=True)
        return Response(serializer.data)

    def put(self, request: Request, professor_pk: str) -> Response:
        modified: QuerySet = self.query_obj(professor_pk)
        serializer: ProfessorSerializer = ProfessorSerializer(
            modified, data=request.data
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
