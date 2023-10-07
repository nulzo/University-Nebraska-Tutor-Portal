from rest_framework import serializers
from .models.dummy import Dummy


class BackendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dummy
        fields = ("started", "issue_type", "description")
