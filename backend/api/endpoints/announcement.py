from datetime import datetime

from rest_framework import status
from rest_framework.renderers import (
    BrowsableAPIRenderer,
    HTMLFormRenderer,
    JSONRenderer,
)
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models.announcement import Announcement
from api.serializers import AnnouncementPostSerializer, AnnouncementSerializer

# We don't need to check for duplicate class names and function names.
# pylint: disable=E0102,E1101,R0914


class APIAnnouncementView(APIView):
    """View for authenticating users in the CSLC Ticket Portal API.

    Attributes:
    - serializer_class: UserSerializer instance for serializing user data.
    - renderer_classes: Tuple of renderer classes for API view.

    Methods:
    - get: Retrieves a list of all users and returns serialized user data.
    - post: Creates a new user and returns serialized user data if valid.
    """

    serializer_class = AnnouncementSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get(self, request: Request) -> Response:
        """
        Handles GET requests to retrieve a list of users.

        Args:
        request (Request): The HTTP request object.

        Returns:
        Response: A response containing a serialized list of users' data.
        """
        announcements = Announcement.objects.all()
        serializer = AnnouncementSerializer(announcements, many=True)
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
        print(request.data)
        request.data["start_date"] = datetime.strptime(
            request.data["start_date"], "%Y-%m-%dT%H:%M:%S.%fZ"
        ).date()
        request.data["end_date"] = datetime.strptime(
            request.data["end_date"], "%Y-%m-%dT%H:%M:%S.%fZ"
        ).date()
        serializer = AnnouncementPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
