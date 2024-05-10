from typing import Any

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

from api.models.user import User
from api.serializers import UserSerializer

# We don't need to check for duplicate class names and function names.
# pylint: disable=E0102,E1101,R0914,R0801


class APIUserView(APIView):
    serializer_class = UserSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get_querystring(self, request: Request) -> QueryDict | Any:
        return request.query_params

    def sanitize(self, querystring: str) -> str:
        return querystring.upper()

    def get(self, request: Request) -> Response:
        users = User.objects.all()
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
                print(users.filter(role=tutor))
                users = users.filter(role=tutor)

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

        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data)


class APIUserDetail(APIView):
    serializer_class = UserSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def query_obj(self, pk: str) -> QueryDict | Any:
        try:
            return User.objects.all().filter(pk=pk)
        except Exception as exc:
            raise Http404 from exc

    def get(self, request: Request, user_id: str) -> Response:
        queryset = self.query_obj(user_id)
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    def put(self, request: Request, user_id: str) -> Response:
        modified = self.query_obj(user_id)
        serializer = UserSerializer(modified, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
