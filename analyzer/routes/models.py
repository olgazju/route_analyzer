# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from unixtimestampfield.fields import UnixTimeStampField


class Route(models.Model):
    name = models.CharField(max_length=200)


class Location(models.Model):
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    timestamp = UnixTimeStampField(default=0.0)
    longitude = models.FloatField(default=0)
    latitude = models.FloatField(default=0)
    accuracy = models.FloatField(default=0)
    speed = models.FloatField(default=0)

    def __str__(self):
        return str(self.timestamp)
