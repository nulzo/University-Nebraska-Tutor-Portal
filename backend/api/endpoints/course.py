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
from api.serializers import CourseSerializer

# We don't need to check for duplicate class names and function names.
# pylint: disable=E0102,E1101,R0914


class APICourseList(APIView):
    serializer_class = CourseSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get_querystring(self, request: Request) -> QueryDict | Any:
        return request.query_params

    def sanitize(self, querystring: str) -> str:
        return querystring.upper()

    def get(self, request: Request) -> Response:
        courses = Course.generic.all()
        querystring = self.get_querystring(request=request)

        if querystring:
            if department := querystring.get("department"):
                courses = courses.filter(
                    course_department=self.sanitize(department))

            if name := querystring.get("name"):
                courses = courses.filter(course_name=name)

            if name_contains := querystring.get("name-contains"):
                courses = courses.filter(course_name__contains=name_contains)

            if course_id := querystring.get("course-id"):
                courses = courses.filter(course_id=course_id)

            if course_id_contains := querystring.get("course-id-contains"):
                courses = courses.filter(
                    course_id__contains=course_id_contains)

            if greater_than_code := querystring.get("higher-than"):
                courses = courses.filter(course_id__gt=greater_than_code)

            if less_than_code := querystring.get("less-than"):
                courses = courses.filter(course_id__lt=less_than_code)

            if code := querystring.get("code"):
                courses = courses.filter(course_code=code)

        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data)
