from models import Route, Location
from rest_framework import serializers


class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ('id', 'name')


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('id', 'timestamp', 'longitude', 'latitude', 'accuracy', 'speed', 'route_id')