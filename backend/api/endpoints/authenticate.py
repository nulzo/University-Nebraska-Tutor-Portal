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
# pylint: disable=E0102,E1101,R0914


class APIAuthenticateList(APIView):
    serializer_class = UserSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get(self, request: Request) -> Response:
        users = User.generic.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        user, created = User.generic.get_or_create(request.data)
        print(user)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid() and created:
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data)
