from rest_framework import serializers

from .models.course import Course
from .models.cslc_hours import CSLC_Hours
from .models.dummy import Dummy
from .models.issue import Issues
from .models.messages import Messages
from .models.professor import Professor
from .models.sections import Section
from .models.ticket import Ticket
from .models.user import User
from .models.work_hours import WorkingHours


class BackendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dummy
        fields = (
            "claimed",
            "issue_type",
            "description",
            "closed",
            "name",
            "professor",
            "course",
            "assignment",
        )


class HourSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSLC_Hours
        fields = (
            "mondayOpen",
            "mondayClose",
            "tuesdayOpen",
            "tuesdayClose",
            "wednesdayOpen",
            "wednesdayClose",
            "thursdayOpen",
            "thursdayClose",
            "fridayOpen",
            "fridayClose",
            "saturdayOpen",
            "saturdayClose",
            "sundayOpen",
            "sundayClose",
        )


class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professor
        fields = "__all__"


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        # fields = (
        #     "courses_tutoring",
        #     "courses_taken",
        #     "tickets",
        #     "name",
        #     "is_active",
        #     "is_working",
        #     "is_tutor",
        #     "is_admin",
        #     "user_bio",
        #     "email",
        #     "MSOID",
        # )


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
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
        fields = ("problem_type", "severity")
