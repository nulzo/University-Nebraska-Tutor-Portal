from rest_framework import serializers

from .models.announcement import Announcement
from .models.color import Color
from .models.course import Course
from .models.difficulty import Difficulty
from .models.issue import Issues
from .models.messages import Messages
from .models.people import People
from .models.priority import Priority
from .models.professor import Professor
from .models.roles import Role
from .models.sections import Section
from .models.semester import Semester
from .models.status import Status
from .models.ticket import Ticket
from .models.user import User
from .models.hours import OpeningHours


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = "__all__"


class SemesterSerializer(serializers.Serializer):
    class Meta:
        model = Semester
        fields = "__all__"


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"


class StatusSerializer(serializers.ModelSerializer):
    color = ColorSerializer()

    class Meta:
        model = Status
        fields = "__all__"


class RoleSerializer(serializers.ModelSerializer):
    color = ColorSerializer()

    class Meta:
        model = Role
        fields = "__all__"


class PeopleSerializer(serializers.ModelSerializer):
    class Meta:
        model = People
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    role = RoleSerializer()
    info = PeopleSerializer()
    settings = serializers.StringRelatedField()

    class Meta:
        model = User
        fields = "__all__"


class AnnouncementSerializer(serializers.ModelSerializer):
    issuing_user = UserSerializer()

    class Meta:
        model = Announcement
        fields = "__all__"


class AnnouncementPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = "__all__"


class TicketSerializer(serializers.ModelSerializer):
    professor = serializers.PrimaryKeyRelatedField(queryset=Professor.generic.all())
    course = serializers.PrimaryKeyRelatedField(queryset=Course.generic.all())
    issue = serializers.PrimaryKeyRelatedField(queryset=Issues.objects.all())

    class Meta:
        model = Ticket
        fields = "__all__"


class DifficultySerializer(serializers.ModelSerializer):
    color = ColorSerializer()

    class Meta:
        model = Difficulty
        fields = "__all__"


class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issues
        fields = "__all__"


class PrioritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Priority
        fields = "__all__"


class ProfessorSerializer(serializers.ModelSerializer):
    info = PeopleSerializer()

    class Meta:
        model = Professor
        fields = "__all__"


class SectionSerializer(serializers.ModelSerializer):
    course = CourseSerializer()
    professor = ProfessorSerializer()
    semester = SemesterSerializer()

    class Meta:
        model = Section
        fields = "__all__"


class TicketGetSerializer(serializers.ModelSerializer):
    professor = ProfessorSerializer()
    section = SectionSerializer()
    issuing_user = UserSerializer()
    principal_tutor = UserSerializer()
    last_updated_by_user = UserSerializer()
    issue = IssueSerializer()
    status = StatusSerializer()
    difficulty = DifficultySerializer()

    # priority = PrioritySerializer()

    class Meta:
        model = Ticket
        fields = "__all__"


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = (
            "message_type",
            "message_header",
            "message_body",
            "from_date",
            "to_date",
        )


class HourSerializer(serializers.ModelSerializer):
    tutor = UserSerializer()
    class Meta:
        model = OpeningHours
        fields = "__all__"
