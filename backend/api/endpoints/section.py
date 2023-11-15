from typing import Any

from django.db.models.query import QuerySet
from django.http import Http404, QueryDict
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
from api.models.professor import Professor
from api.models.sections import Section
from api.serializers import SectionSerializer

# We don't need to check for duplicate class names and function names.
# pylint: disable=E0102,E1101,R0914


class APISectionView(APIView):
    serializer_class = SectionSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get_querystring(self, request: Request) -> QueryDict | Any:
        return request.query_params

    def sanitize(self, querystring: str) -> str:
        return querystring.upper()

    def get(self, request: Request) -> Response:
        sections = Section.generic.all()
        querystring = self.get_querystring(request=request)
        if querystring:
            if section := querystring.get("section"):
                sections = sections.filter(section=section)

            if professor := querystring.get("professor"):
                professor_query = Professor.generic.get(full_name=professor)
                sections = sections.filter(professor=professor_query)

            if last_name := querystring.get("last-name"):
                last_name_query = Professor.generic.filter(
                    last_name=last_name.capitalize()
                )
                sections = sections.filter(professor__in=last_name_query)

            if first_name := querystring.get("first-name"):
                first_name_query = Professor.generic.filter(
                    first_name=first_name.capitalize()
                )
                sections = sections.filter(professor__in=first_name_query)

            if modality := querystring.get("modality"):
                sections = sections.filter(modality=modality)

            if course := querystring.get("course"):
                course_query = Course.generic.filter(course_name=course)
                sections = sections.filter(course__in=course_query)

        serializer = SectionSerializer(sections, many=True)
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = SectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data)


class APISectionDetail(APIView):
    serializer_class = SectionSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def query_obj(self, pk: str) -> QuerySet | None:
        try:
            return Section.generic.all().filter(pk=pk)
        except Exception as exc:
            raise Http404 from exc

    def get(self, request: Request, section_id: str) -> Response:
        queryset = self.query_obj(section_id)
        serializer = SectionSerializer(queryset, many=True)
        return Response(serializer.data)

    def put(self, request: Request, section_id: str) -> Response:
        modified = self.query_obj(section_id)
        serializer = SectionSerializer(modified, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
