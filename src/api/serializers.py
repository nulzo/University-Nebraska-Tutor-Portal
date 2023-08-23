from rest_framework import serializers

from .models import Ticket

# Serializer for the Django Models


class BackendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = "name"
