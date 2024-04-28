from typing import Any

from rest_framework import status
from rest_framework.renderers import (
    BrowsableAPIRenderer,
    HTMLFormRenderer,
    JSONRenderer,
)
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models.ticket import Ticket
from api.serializers import TicketGetSerializer, TicketSerializer

# We don't need to check for duplicate class names and function names.
# pylint: disable=E0102,E1101,R0914,R0801


class APITicketView(APIView):
    serializer_class = TicketSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get_querystring(self, request: Request) -> Any:
        return request.query_params

    def sanitize(self, querystring: str) -> str:
        return querystring.upper()

    def get(self, request: Request) -> Response:
        tickets = Ticket.objects.all()
        querystring = self.get_querystring(request=request)
        if len(querystring) > 0:
            if department := querystring.get("department"):
                tickets = tickets.filter(course_department=self.sanitize(department))

            if active := querystring.get("active"):
                tickets = tickets.filter(is_active=active.capitalize())

            if ticket_status := querystring.get("status"):
                tickets = tickets.filter(status=ticket_status.upper())

        serializer = TicketGetSerializer(tickets, many=True)
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = TicketSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class APITicketDetail(APIView):
    serializer_class = TicketGetSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get(self, request: Request, ticket_id: int) -> Response:
        ticket = Ticket.objects.get(id=ticket_id)
        serializer = TicketGetSerializer(ticket)
        return Response(serializer.data)

    def patch(self, request: Request, ticket_id: int) -> Response:
        try:
            ticket = Ticket.objects.get(id=ticket_id)
        except Ticket.DoesNotExist:
            return Response(
                {"error": "Ticket not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = TicketSerializer(ticket, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
