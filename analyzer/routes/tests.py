# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status
from routes.models import Route, Location
from routes.serializers import RouteSerializer, LocationSerializer

import json

# initialize the APIClient app
client = Client()


class RouteAPITestCase(TestCase):

    def setUp(self):
        Route.objects.create(name='Route1')
        Route.objects.create(name='Route2')
        Location.objects.create(timestamp=1539451080, longitude=34.75984440886248, latitude=32.070684566678636, accuracy=1, speed=1, route_id=1)
        Location.objects.create(timestamp=1539450610, longitude=34.772329330444336, latitude=32.064392020038184, accuracy=6, speed=1, route_id=1)
        Location.objects.create(timestamp=1539450612, longitude=64.772329330444336, latitude=-32.064392020038184, accuracy=10, speed=0.1, route_id=2)

    def test_get_all_routes(self):
        # get API response
        response = client.get(reverse('routes-list'))

        # get data from db
        routes = Route.objects.all()
        serializer = RouteSerializer(routes, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_location_by_id(self):
        # get API response
        response = client.get("%s?route_id=1" % reverse('locations-list'))

        # get data from db sorted by timestamp
        locations = Location.objects.filter(route_id=1).order_by("timestamp")
        serializer = LocationSerializer(locations, many=True)

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_location_by_nonexisting_id(self):
        # get API response
        response = client.get("%s?route_id=10" % reverse('locations-list'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_intersection(self):
        # get API response
        data = [{"lat": 32.0760662322575, "lng": 34.772273808234104}, {"lat": 32.060700482929, "lng": 34.7612244396728}]
        response = client.post(reverse('intersections'), json.dumps(data), content_type="application/json")

        self.assertEqual(response.data, {'routes': [1]})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_no_intersection(self):
        # get API response
        data = [{"lat": 1.0, "lng": 2.0}, {"lat": 2.0, "lng": 3.0}]
        response = client.post(reverse('intersections'), json.dumps(data), content_type="application/json")

        self.assertEqual(response.data, {'routes': []})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
