from django.http import Http404
from rest_framework import status
from rest_framework.renderers import (
    BrowsableAPIRenderer,
    HTMLFormRenderer,
    JSONRenderer,
)
from rest_framework.response import Response
from rest_framework.views import APIView

from .models.course import Course
from .models.issue import Issues
from .models.messages import Messages
from .models.professor import Professor
from .models.sections import Section
from .models.ticket import Ticket
from .models.user import User
from .serializers import (
    CourseSerializer,
    IssueSerializer,
    MessageSerializer,
    ProfessorSerializer,
    SectionSerializer,
    TicketSerializer,
    UserSerializer,
)

# We don't need to check for duplicate class names and function names.
# pylint: disable=E0102,E1101,R0914

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
        except Exception as exc:
            raise Http404 from exc

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
    description = """ Query the database to return a payload consisting of a students
      submitted tickets. This takes a users NUID in as the parameter. """

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
    description = """ Query the database to return a payload consisting of all
    tickets from a given section. This takes a sections ID in as the parameter. """

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
    description = """ Query the database to return a payload consisting of all
    tickets referencing a given professor. This takes a professors ID in as the parameter. """

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
    description = """ Query the database to return a payload consisting of all tickets
    referencing a tutor. This takes a tutors NUID in as the parameter. """

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
    description = """ Query the database to return a payload consisting of
    all tickets referencing a tutor. This takes a tutors NUID in as the parameter. """

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
    description = """ Query the database to return a payload consisting of all
    tickets that have been completed. This takes a tutors NUID in as the parameter. """

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
    description = """ Query the database to return a payload consisting of
    all tickets that have are active. """

    def get(self, request):
        queryset = Ticket.ticket.get_active()
        if len(queryset) > 0:
            serializer = TicketSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response(None, status=status.HTTP_400_BAD_REQUEST)


class SuccessfulTicketListView(APIView):
    serializer_class = TicketSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)
    name = "Access Completed Tickets"
    description = """ Query the database to return a payload consisting of all
    tickets that have been completed. This takes a tutors NUID in as the parameter. """

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
    description = """ Query the database to return a payload consisting of all
    tickets that have been completed. This takes a tutors NUID in as the parameter. """

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

    def post(self, request, search=None):
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
        except Exception as exc:
            raise Http404 from exc

    def get(self, request, tutor_pk: str):
        queryset = User.tutor.get_tutors().filter(student_nuid=tutor_pk)
        if queryset is not None:
            serializer = UserSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response(serializer.errors)

    def put(self, request, tutor_pk: str, search=None):
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

    def post(self, request, search=None):
        serializer = MessageSerializer()
        return Response(serializer.data)


# -------------------------- PROFESSORS --------------------------


class ProfessorListView(APIView):
    serializer_class = ProfessorSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get(self, request, search=None):
        professors = Professor.professor.get_professors()
        serializer = ProfessorSerializer(professors, many=True)
        return Response(serializer.data)

    def post(self, request, search=None):
        Professor.professor.get_professors()
        serializer = ProfessorSerializer(data=request.data)
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
        except Exception as exc:
            raise Http404 from exc

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
        queryset = Issues.generic.all()
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
        except Exception as exc:
            raise Http404 from exc

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


# -------------------------- SECTIONS --------------------------


class APISectionList(APIView):
    serializer_class = SectionSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get_querystring(self, request):
        return request.GET

    def sanitize(self, querystring: str):
        return querystring.upper()

    def get(self, request):
        sections = Section.generic.all()
        querystring = self.get_querystring(request=request)
        if querystring:
            if section := querystring.get("section"):
                sections = sections.filter(section=section)

            if professor := querystring.get("professor"):
                query = Professor.prof.get(full_name=professor)
                sections = sections.filter(professor=query)

            if last_name := querystring.get("last-name"):
                query = Professor.prof.filter(last_name=last_name.capitalize())
                sections = sections.filter(professor__in=query)

            if first_name := querystring.get("first-name"):
                query = Professor.prof.filter(first_name=first_name.capitalize())
                sections = sections.filter(professor__in=query)

            if modality := querystring.get("modality"):
                sections = sections.filter(modality=modality)

            if course := querystring.get("course"):
                query = Course.generic.filter(course_name=course)
                sections = sections.filter(course__in=query)

        serializer = SectionSerializer(sections, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data)


# -------------------------- COURSES --------------------------


class APICourseList(APIView):
    serializer_class = CourseSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get_querystring(self, request):
        return request.GET

    def sanitize(self, querystring: str):
        return querystring.upper()

    def get(self, request):
        courses = Course.generic.all()
        querystring = self.get_querystring(request=request)

        if querystring:
            if department := querystring.get("department"):
                courses = courses.filter(course_department=self.sanitize(department))

            if name := querystring.get("name"):
                courses = courses.filter(course_name=name)

            if name_contains := querystring.get("name-contains"):
                courses = courses.filter(course_name__contains=name_contains)

            if course_id := querystring.get("course-id"):
                courses = courses.filter(course_id=course_id)

            if course_id_contains := querystring.get("course-id-contains"):
                courses = courses.filter(course_id__contains=course_id_contains)

            if greater_than_code := querystring.get("higher-than"):
                courses = courses.filter(course_id__gt=greater_than_code)

            if less_than_code := querystring.get("less-than"):
                courses = courses.filter(course_id__lt=less_than_code)

            if code := querystring.get("code"):
                courses = courses.filter(course_code=code)

        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data)


# -------------------------- USERS --------------------------


class APIUserList(APIView):
    serializer_class = UserSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get_querystring(self, request):
        return request.GET

    def sanitize(self, querystring: str):
        return querystring.upper()

    def get(self, request):
        users = User.generic.all()
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
                users = users.filter(is_tutor=tutor.capitalize())

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

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data)


# -------------------------- TICKETS --------------------------


class APITicketList(APIView):
    serializer_class = TicketSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get_querystring(self, request):
        return request.GET

    def sanitize(self, querystring: str):
        return querystring.upper()

    def get(self, request):
        users = User.generic.all()
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
                users = users.filter(is_tutor=tutor.capitalize())

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

        serializer = TicketSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TicketSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data)


class StudentListView(APIView):
    serializer_class = UserSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get(self, request):
        queryset = User.student.get_students()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data)


class StudentDetailView(APIView):
    def query_obj(self, pk: str):
        try:
            return User.student.get_student(name=pk)
        except Exception as exc:
            raise Http404 from exc

    def get(self, request, pk: str | None = None):
        data = self.query_obj(pk)
        serializer = UserSerializer(data)
        return Response(serializer.data)

    def put(self, request, pk=None):
        modified = self.query_obj(pk)
        serializer = UserSerializer(modified, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ------------------------- PROFESSOR ---------------------------


class APITicketView(APIView):
    serializer_class = TicketSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get_querystring(self, request):
        return request.GET

    def sanitize(self, querystring: str):
        return querystring.capitalize()

    def get_professor_id(self, professor_name):
        return Professor.prof.all().filter(full_name=professor_name).first()

    def get_course_id(self, course_name):
        return Course.generic.all().filter(course_name=course_name).first()

    def get_issue_id(self, issue_type):
        return Issues.generic.all().filter(problem_type=issue_type).first()

    def get_user_id(self, user):
        return User.generic.all().filter(name=user).first()

    def get(self, request):
        tickets = Ticket.generic.all()
        querystring = self.get_querystring(request=request)
        if querystring:
            if is_completed := querystring.get("completed"):
                tickets = tickets.filter(completed=is_completed.upper())

        serializer = TicketSerializer(tickets, many=True)
        return Response(serializer.data)

    def post(self, request, search=None):
        Ticket.generic.all()
        if professor_name := request.data.get("professor"):
            pid = self.get_professor_id(professor_name=professor_name)
            request.data["professor"] = pid.professor_id
        if course_name := request.data.get("section"):
            cid = self.get_course_id(course_name=course_name)
            request.data["section"] = cid.id
        if issue_type := request.data.get("issue"):
            iid = self.get_issue_id(issue_type=issue_type)
            request.data["issue"] = iid.issue_id
        if student_name := request.data.get("student"):
            sid = self.get_user_id(user=student_name)
            request.data["student"] = sid.student_nuid
        print(request.data)
        serializer = TicketSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ------------------------ QUERYSTRING --------------------------


class APIProfessorList(APIView):
    serializer_class = ProfessorSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get_querystring(self, request):
        return request.GET

    def sanitize(self, querystring: str):
        return querystring.capitalize()

    def get(self, request):
        professors = Professor.professor.get_professors()
        query_string = self.get_querystring(request=request)
        if query_string:
            if professor_name := query_string.get("professor"):
                professors = professors.filter(full_name=self.sanitize(professor_name))
            if professor_id := query_string.get("id"):
                professors = professors.filter(professor_id=professor_id)
            if professor_first_name := query_string.get("first-name"):
                professors = professors.filter(
                    first_name=self.sanitize(professor_first_name)
                )
            if professor_last_name := query_string.get("last-name"):
                professors = professors.filter(
                    last_name=self.sanitize(professor_last_name)
                )
            if professor_is_active := query_string.get("active"):
                professors = professors.filter(
                    is_active=self.sanitize(professor_is_active)
                )
        serializer = ProfessorSerializer(professors, many=True)
        return Response(serializer.data)

    def post(self, request, search=None):
        Professor.professor.get_professors()
        serializer = ProfessorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
