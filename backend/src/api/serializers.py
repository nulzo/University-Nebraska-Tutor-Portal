from rest_framework import serializers

from .models.dummy import Dummy
from .models.cslc_hours import CSLC_Hours
from .models.professor import Professor
from .models.course import Course
from .models.user import User
from .models.ticket import Ticket
from .models.messages import Messages
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
        fields = ("name", "email", "is_active")


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = (
            "student",
            "professor",
            "course",
            "tutor",
            "issue",
            "email",
            "name",
            "completed",
            "started",
            "start_time",
            "end_time",
            "was_reopened",
            "was_successful",
            "description",
            "comments"
        )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "courses_tutoring",
            "courses_taken",
            "tickets",
            "name",
            "is_active",
            "is_working",
            "is_tutor",
            "is_admin",
            "user_bio",
            "email",
            "MSOID"
        )


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "section_number",
            "modality",
            "professor",
            "tickets",
            "course"
        )


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = (
            "message_type",
            "message_header",
            "message_body",
            "from_date",
            "to_date"
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
            "sundayOut"
        )
