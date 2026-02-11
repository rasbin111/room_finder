from django.urls import path

from .views import (
    RoomsListView
)

urlpatterns = [
    path("rooms/list/", RoomsListView.as_view(), name="rooms_list"),
]