from django.http import Http404, HttpResponseBadRequest
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
    TicketGetSerializer,
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


class APIMessageView(APIView):
    serializer_class = MessageSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get(self, request):
        queryset = Messages.objects.all()
        serializer = MessageSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, search=None):
        serializer = MessageSerializer()
        return Response(serializer.data)


class APIMessageDetail(APIView):
    serializer_class = MessageSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)
    name = "Query Messages"
    description = """ Query, Update, or Delete a specific tutor. """

    def query_obj(self, message_id: str):
        try:
            return Messages.generic.all().filter(id=message_id)
        except Exception as exc:
            raise Http404 from exc

    def get(self, request, message_id: str):
        queryset = Messages.generic.all().filter(id=message_id)
        if queryset is not None:
            serializer = MessageSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response(serializer.errors)

    def put(self, request, message_id: str, search=None):
        modified = self.query_obj(message_id)
        serializer = MessageSerializer(modified, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -------------------------- ISSUES --------------------------


class APIIssueView(APIView):
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


class APIIssueDetail(APIView):
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


# -------------------------- SECTIONS --------------------------


class APISectionView(APIView):
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


class APISectionDetail(APIView):
    serializer_class = SectionSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def query_obj(self, pk: str):
        try:
            return Section.generic.all().filter(pk=pk)
        except Exception as exc:
            raise Http404 from exc

    def get(self, request, section_id: str):
        queryset = self.query_obj(section_id)
        serializer = SectionSerializer(queryset, many=True)
        return Response(serializer.data)

    def put(self, request, pk: str, section_id):
        modified = self.query_obj(section_id)
        serializer = SectionSerializer(modified, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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


class APIUserView(APIView):
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


class APIUserDetail(APIView):
    serializer_class = UserSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def query_obj(self, pk: str):
        try:
            return User.generic.all().filter(pk=pk)
        except Exception as exc:
            raise Http404 from exc

    def get(self, request, user_id: str):
        queryset = self.query_obj(user_id)
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    def put(self, request, pk: str, user_id):
        modified = self.query_obj(user_id)
        serializer = UserSerializer(modified, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -------------------------- TICKETS --------------------------


class APITicketView(APIView):
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


class APITicketList(APIView):
    serializer_class = TicketGetSerializer
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
                tickets = tickets.filter(completed=is_completed.capitalize())
            if is_started := querystring.get("started"):
                tickets = tickets.filter(started=is_started.capitalize())
        serializer = TicketGetSerializer(tickets, many=True)
        return Response(serializer.data)

    def post(self, request, search=None):
        Ticket.generic.all()
        serializer = TicketSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ------------------------ PROFESSOR --------------------------


class APIProfessorView(APIView):
    serializer_class = ProfessorSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def get_querystring(self, request):
        return request.GET

    def sanitize(self, querystring: str):
        return querystring.title()

    def get(self, request):
        professors = Professor.professor.get_professors()
        query_string = self.get_querystring(request=request)
        if query_string:
            if professor_name := query_string.get("name"):
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
            if len(professors) == 0:
                return HttpResponseBadRequest(content="No professor found")
        serializer = ProfessorSerializer(professors, many=True)
        return Response(serializer.data)

    def post(self, request, search=None):
        Professor.professor.get_professors()
        serializer = ProfessorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class APIProfessorDetail(APIView):
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
