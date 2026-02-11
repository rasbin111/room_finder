from django.shortcuts import render
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.views import APIView

from .serializers import (
    RoomSerializer
)
from .models import (
    Room, RoomImage
)

class RoomsListView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer