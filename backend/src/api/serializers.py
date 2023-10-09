from rest_framework import serializers

from .models.dummy import Dummy
from .models.hours import Hours
from .models.professor import Professor
from .models.course import Course
from .models.student import Student


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
        model = Hours
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
