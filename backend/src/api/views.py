# from django.shortcuts import render
from rest_framework import viewsets

from .models.cslc_hours import CSLC_Hours
from .models.dummy import Dummy
from .models.professor import Professor
from .serializers import BackendSerializer, HourSerializer, ProfessorSerializer

# Create your views here.


class backendView(viewsets.ModelViewSet):
    serializer_class = BackendSerializer
    queryset = Dummy.objects.all()


class hourView(viewsets.ModelViewSet):
    serializer_class = HourSerializer
    queryset = CSLC_Hours.objects.all()


class professorView(viewsets.ModelViewSet):
    serializer_class = ProfessorSerializer
    queryset = Professor.objects.all()
