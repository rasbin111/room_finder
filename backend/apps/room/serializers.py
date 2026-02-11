from rest_framework import serializers

from .models import Room, RoomImage


class RoomImageSerializer(serializers.ModelSerializer):

    class Meta:
         model = RoomImage
         fields = [
             "id", "image", "uploaded_at", "updated_at",
         ]


class RoomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Room
        fields = [
            "id",
            "name",
            "location",
            "images",
            "created_at",
            "updated_at"

        ]