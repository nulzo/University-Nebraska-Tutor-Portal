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
    """View for authenticating users in the CSLC Ticket Portal API.

    Attributes:
    - serializer_class: UserSerializer instance for serializing user data.
    - renderer_classes: Tuple of renderer classes for API view.

    Methods:
    - get: Retrieves a list of all users and returns serialized user data.
    - post: Creates a new user and returns serialized user data if valid.
    """

    serializer_class = UserSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get(self, request: Request) -> Response:
        """
        Handles GET requests to retrieve a list of users.

        Args:
        request (Request): The HTTP request object.

        Returns:
        Response: A response containing a serialized list of users' data.
        """
        users = User.generic.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        """
        Handles POST requests to create a new user or retrieve an existing user.

        Args:
        request (Request): The HTTP request object containing user data.

        Returns:
        Response: A response containing the serialized user data if the user is successfully
        created, or the error messages if the user data is invalid.
        """
        user, created = User.generic.get_or_create(request.data)
        print(user)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid() and created:
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data)
