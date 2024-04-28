from typing import Any

from django.db.models.query import QuerySet
from django.http import Http404
from rest_framework import status
from rest_framework.renderers import (
    BrowsableAPIRenderer,
    HTMLFormRenderer,
    JSONRenderer,
)
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models.issue import Issues
from api.serializers import IssueSerializer

# We don't need to check for duplicate class names and function names.
# pylint: disable=E0102,E1101,R0914


class APIIssueView(APIView):
    serializer_class = IssueSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get(self, request: Request) -> Response:
        queryset = Issues.objects.all()
        serializer = IssueSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = IssueSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data)


class APIIssueDetail(APIView):
    def query_obj(self, pk: str) -> QuerySet | Any:
        try:
            return Issues.objects.get(pk=pk)
        except Exception as exc:
            raise Http404 from exc

    def get(self, request: Request, pk: str | Any = ...) -> Response:
        data = self.query_obj(pk)
        serializer = IssueSerializer(data)
        return Response(serializer.data)

    def put(self, request: Request, pk: str | Any = ...) -> Response:
        modified = self.query_obj(pk)
        serializer = IssueSerializer(modified, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
