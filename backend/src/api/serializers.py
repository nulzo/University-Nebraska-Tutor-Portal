from rest_framework import serializers
from .models.dummy import Dummy


class BackendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dummy
        fields = ("claimed", "issue_type", "description", "closed", "name", "professor", "course", "assignment")
