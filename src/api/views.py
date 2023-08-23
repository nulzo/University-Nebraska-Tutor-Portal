# from django.shortcuts import render
from rest_framework import generics

from .models import Ticket
from .serializers import BackendSerializer

# Create your views here.


class BackendListView(generics.ListAPIView):
    model = Ticket
    serializer_class = BackendSerializer
