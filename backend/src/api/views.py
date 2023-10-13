# from django.shortcuts import render

from django.http import Http404
from rest_framework import status
from rest_framework.renderers import (
    BrowsableAPIRenderer,
    HTMLFormRenderer,
    JSONRenderer,
)
from rest_framework.response import Response
from rest_framework.views import APIView

from .models.cslc_hours import CSLC_Hours
from .models.issue import Issues
from .models.messages import Messages
from .models.professor import Professor
from .models.sections import Section
from .models.ticket import Ticket
from .models.user import User
from .serializers import (
    HourSerializer,
    IssueSerializer,
    MessageSerializer,
    ProfessorSerializer,
    SectionSerializer,
    TicketSerializer,
    UserSerializer,
)

# fmt: off
# -------------------------- CONFIG ---------------------------


class APIURLView(APIView):
    def get(self, request):
        api_urls = {"list-tickets": "api/tickets/"}
        return Response(api_urls)


# -------------------------- TICKETS --------------------------


class TicketListView(APIView):
    serializer_class = TicketSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get(self, request):
        queryset = Ticket.ticket.get_all()
        serializer = TicketSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TicketSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data)


class TicketDetailView(APIView):
    serializer_class = TicketSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def query_obj(self, ticket_pk: str):
        try:
            return Ticket.ticket.get_all().filter(pk=ticket_pk)
        except Ticket.DoesNotExist:
            raise Http404

    def get(self, request, ticket_pk: str):
        queryset = self.query_obj(ticket_pk=ticket_pk)
        serializer = TicketSerializer(queryset, many=True)
        return Response(serializer.data)

    def put(self, request, pk: str | None = None):
        modified = self.query_obj(pk)
        serializer = TicketSerializer(modified, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentTicketDetailView(APIView):
    serializer_class = TicketSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)
    name = "Access a Students Tickets"
    description = """ Query the database to return a payload consisting of a students submitted tickets. This takes a users NUID in as the parameter. """

    def get(self, request, student_pk: str):
        queryset = Ticket.ticket.get_student(student_pk)
        if queryset is not None:
            serializer = TicketSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response(serializer.errors)


class SectionTicketDetailView(APIView):
    serializer_class = TicketSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)
    name = "Access a Sections Tickets"
    description = """ Query the database to return a payload consisting of all tickets from a given section. This takes a sections ID in as the parameter. """

    def get(self, request, section_pk: str):
        queryset = Ticket.ticket.get_section(section_pk)
        if len(queryset) > 0:
            serializer = TicketSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response(None, status=status.HTTP_400_BAD_REQUEST)


class ProfessorTicketDetailView(APIView):
    serializer_class = TicketSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)
    name = "Access a Professors Tickets"
    description = """ Query the database to return a payload consisting of all tickets referencing a given professor. This takes a professors ID in as the parameter. """

    def get(self, request, professor_pk: str):
        queryset = Ticket.ticket.get_professor(professor=professor_pk)
        if len(queryset) > 0:
            serializer = TicketSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response(serializer.errors)


class TutorTicketDetailView(APIView):
    serializer_class = TicketSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)
    name = "Access a Tickets Attributed to a Tutor"
    description = """ Query the database to return a payload consisting of all tickets referencing a tutor. This takes a tutors NUID in as the parameter. """

    def get(self, request, tutor_pk: str):
        queryset = Ticket.ticket.get_tutor(tutor_pk)
        if len(queryset) > 0:
            serializer = TicketSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response(None, status=status.HTTP_400_BAD_REQUEST)


class CourseTicketDetailView(APIView):
    serializer_class = TicketSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)
    name = "Access Tickets Attributed to a Course"
    description = """ Query the database to return a payload consisting of all tickets referencing a tutor. This takes a tutors NUID in as the parameter. """

    def get(self, request, course_pk: str):
        queryset = Ticket.ticket.get_course(course_pk)
        if len(queryset) > 0:
            serializer = TicketSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response(None, status=status.HTTP_400_BAD_REQUEST)


class CompletedTicketListView(APIView):
    serializer_class = TicketSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)
    name = "Access Completed Tickets"
    description = """ Query the database to return a payload consisting of all tickets that have been completed. This takes a tutors NUID in as the parameter. """

    def get(self, request):
        queryset = Ticket.ticket.get_completed()
        if len(queryset) > 0:
            serializer = TicketSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response(None, status=status.HTTP_400_BAD_REQUEST)


class ActiveTicketListView(APIView):
    serializer_class = TicketSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)
    name = "Access Completed Tickets"
    description = """ Query the database to return a payload consisting of all tickets that have been completed. This takes a tutors NUID in as the parameter. """

    def get(self, request):
        queryset = Ticket.ticket.get_completed()
        if len(queryset) > 0:
            serializer = TicketSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response(None, status=status.HTTP_400_BAD_REQUEST)


class CompletedTicketListView(APIView):
    serializer_class = TicketSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)
    name = "Access Completed Tickets"
    description = """ Query the database to return a payload consisting of all tickets that have been completed. This takes a tutors NUID in as the parameter. """

    def get(self, request):
        queryset = Ticket.ticket.get_completed()
        if len(queryset) > 0:
            serializer = TicketSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response(None, status=status.HTTP_400_BAD_REQUEST)


class SuccessfulTicketListView(APIView):
    serializer_class = TicketSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)
    name = "Access Completed Tickets"
    description = """ Query the database to return a payload consisting of all tickets that have been completed. This takes a tutors NUID in as the parameter. """

    def get(self, request):
        queryset = Ticket.ticket.get_completed()
        if len(queryset) > 0:
            serializer = TicketSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response(None, status=status.HTTP_400_BAD_REQUEST)


class UnclaimedTicketListView(APIView):
    serializer_class = TicketSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)
    name = "Access Unclaimed Tickets"
    description = """ Query the database to return a payload consisting of all tickets that have been completed. This takes a tutors NUID in as the parameter. """

    def get(self, request):
        queryset = Ticket.ticket.get_unclaimed()
        if len(queryset) > 0:
            serializer = TicketSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response(None, status=status.HTTP_400_BAD_REQUEST)


# -------------------------- TUTORS --------------------------


class TutorListView(APIView):
    serializer_class = UserSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)
    name = "Query All Tutors"
    description = """ Query all tutors within the database. """

    def get(self, request):
        queryset = User.tutor.get_tutors()
        if queryset is not None:
            serializer = UserSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response(serializer.errors)

    def post(self, request, format=None):
        serializer = UserSerializer(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TutorDetailView(APIView):
    serializer_class = UserSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)
    name = "Query Tutors"
    description = """ Query, Update, or Delete a specific tutor. """

    def query_obj(self, ticket_pk: str):
        try:
            return Ticket.ticket.get_all().filter(pk=ticket_pk)
        except Ticket.DoesNotExist:
            raise Http404

    def get(self, request, tutor_pk: str):
        queryset = User.tutor.get_tutors().filter(student_nuid=tutor_pk)
        if queryset is not None:
            serializer = UserSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response(serializer.errors)

    def put(self, request, tutor_pk: str, format=None):
        modified = self.query_obj(tutor_pk)
        serializer = UserSerializer(modified, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -------------------------- MESSAGES --------------------------


class MessageViewSet(APIView):
    serializer_class = MessageSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get(self, request):
        queryset = Messages.objects.all()
        serializer = MessageSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = MessageSerializer()
        return Response(serializer.data)


# -------------------------- PROFESSORS --------------------------


class ProfessorListView(APIView):
    serializer_class = ProfessorSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get(self, request, format=None):
        professors = Professor.professor.get_professors()
        serializer = ProfessorSerializer(professors, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ProfessorSerializer(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfessorDetailView(APIView):
    serializer_class = ProfessorSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def query_obj(self, pk: str):
        try:
            return Professor.professor.get_professors().filter(pk=pk)
        except Professor.DoesNotExist:
            raise Http404

    def get(self, request, professor_pk: str):
        queryset = self.query_obj(professor_pk)
        serializer = ProfessorSerializer(queryset, many=True)
        return Response(serializer.data)

    def put(self, request, pk: str, professor_pk):
        modified = self.query_obj(professor_pk)
        serializer = ProfessorSerializer(modified, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -------------------------- ISSUES --------------------------


class IssueListView(APIView):
    serializer_class = IssueSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get(self, request):
        queryset = Issues.objects.all()
        serializer = IssueSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = IssueSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data)


class IssueDetailView(APIView):
    def query_obj(self, pk: str):
        try:
            return Issues.objects.get(pk=pk)
        except Issues.DoesNotExist:
            raise Http404

    def get(self, request, pk: str | None = None):
        data = self.query_obj(pk)
        serializer = IssueSerializer(data)
        return Response(serializer.data)

    def put(self, request, pk=None):
        modified = self.query_obj(pk)
        serializer = IssueSerializer(modified, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -------------------------- HOURS --------------------------


class CSLCHoursViewset(APIView):
    def extract_object(self, pk=None):
        try:
            return CSLC_Hours.objects.get(pk=pk)
        except CSLC_Hours.DoesNotExist:
            raise Http404

    def get(self, request):
        hours_list = CSLC_Hours.objects.all()
        if hours_list is not None:
            return hours_list
        return hours_list

    def post(self, request):
        serialized = HourSerializer()
        if serialized.is_valid():
            serialized.save()
            return Response(data=serialized.data, status=status.HTTP_201_CREATED)
        return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk=None):
        pass

    def delete(self, request, pk=None):
        pass


# -------------------------- SECTIONS --------------------------


class SectionListView(APIView):
    serializer_class = SectionSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get(self, request):
        queryset = Section.sections.get_all()
        serializer = SectionSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data)
# fmt: on
