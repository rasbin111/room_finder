from django.db import models
from django.contrib.gis.db import models as geomodels


class RoomImage(models.Model):
    image = models.ImageField(upload_to='room_images/', blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Room(models.Model):
    name = models.CharField(max_length=255)
    location = geomodels.PointField(srid=4326)
    description = models.TextField(blank=True, null=True)
    images = models.ForeignKey(RoomImage, on_delete=models.CASCADE, related_name='rooms', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name