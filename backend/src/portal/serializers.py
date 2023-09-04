# import serializers from the REST framework
from rest_framework import serializers

from .models import Example


# create a serializer class
class TodoSerializer(serializers.ModelSerializer):
    # create a meta class
    class Meta:
        model = Example
        fields = ("id", "title", "description", "completed")
