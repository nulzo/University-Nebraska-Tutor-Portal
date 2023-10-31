from rest_framework import serializers

from .models.course import Course
from .models.issue import Issues
from .models.messages import Messages
from .models.professor import Professor
from .models.sections import Section
from .models.ticket import Ticket
from .models.user import User
from .models.work_hours import WorkingHours


class ProfessorSerializer(serializers.ModelSerializer):
    full_name = serializers.StringRelatedField()

    class Meta:
        model = Professor
        fields = "__all__"


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"


class SectionSerializer(serializers.ModelSerializer):
    course = serializers.StringRelatedField()
    professor = serializers.StringRelatedField()

    class Meta:
        model = Section
        fields = "__all__"


class TicketSerializer(serializers.ModelSerializer):
    professor = serializers.PrimaryKeyRelatedField(queryset=Professor.prof.all())
    course = serializers.PrimaryKeyRelatedField(queryset=Course.generic.all())
    issue = serializers.PrimaryKeyRelatedField(queryset=Issues.generic.all())
    # student = serializers.PrimaryKeyRelatedField(
    #     queryset=User.generic.all().filter(is_tutor=False)
    # )
    # tutor = serializers.PrimaryKeyRelatedField(
    #     queryset=User.generic.all().filter(is_tutor=True)
    # )

    class Meta:
        model = Ticket
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
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


class TutorHourSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkingHours
        fields = (
            "tutor",
            "mondayIn",
            "mondayOut",
            "tuesdayIn",
            "tuesdayOut",
            "wednesdayIn",
            "wednesdayOut",
            "thursdayIn",
            "thursdayOut",
            "fridayIn",
            "fridayOut",
            "saturdayIn",
            "saturdayOut",
            "sundayIn",
            "sundayOut",
        )


class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issues
        fields = "__all__"
