# from django.shortcuts import render
from rest_framework import viewsets

from .models.dummy import Dummy
from .serializers import BackendSerializer

# Create your views here.


class backendView(viewsets.ModelViewSet):
    # create a serializer class and
    # assign it to the TodoSerializer class
    serializer_class = BackendSerializer

    # define a variable and populate it
    # with the Todo list objects
    queryset = Dummy.objects.all()