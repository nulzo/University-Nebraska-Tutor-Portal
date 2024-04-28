from typing import Any

from django.http import Http404, QueryDict
from django.db.models import QuerySet
from rest_framework import status
from rest_framework.renderers import (
    BrowsableAPIRenderer,
    HTMLFormRenderer,
    JSONRenderer,
)
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models.hours import OpeningHours
from api.serializers import HourSerializer


# We don't need to check for duplicate class names and function names.
# pylint: disable=E0102,E1101,R0914,R0801


class APIHourView(APIView):
    serializer_class = HourSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get_querystring(self, request: Request) -> QueryDict | Any:
        return request.query_params

    def sanitize(self, querystring: str) -> str:
        return querystring.upper()

    def get(self, request: Request) -> Response:
        hours: QuerySet[OpeningHours] = OpeningHours.objects.all()
        querystring = self.get_querystring(request=request)

        if querystring:
            if user := querystring.get("user"):
                hours = hours.filter(tutor__id=user)

        serializer = HourSerializer(hours, many=True)
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = HourSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data)

#
# class APIUserDetail(APIView):
#     serializer_class = UserSerializer
#     renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)
#
#     def query_obj(self, pk: str) -> QueryDict | Any:
#         try:
#             return User.objects.all().filter(pk=pk)
#         except Exception as exc:
#             raise Http404 from exc
#
#     def get(self, request: Request, user_id: str) -> Response:
#         queryset = self.query_obj(user_id)
#         serializer = UserSerializer(queryset, many=True)
#         return Response(serializer.data)
#
#     def put(self, request: Request, user_id: str) -> Response:
#         modified = self.query_obj(user_id)
#         serializer = UserSerializer(modified, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
