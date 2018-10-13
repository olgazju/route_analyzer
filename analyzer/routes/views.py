from .models import Route, Location
from rest_framework import viewsets
from .serializers import RouteSerializer, LocationSerializer
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from matplotlib.path import Path as mpPath
import json

class RouteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Route.objects.all()
    serializer_class = RouteSerializer


class LocationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

    def get_queryset(self):
        route_id = self.request.query_params.get('route_id')
        
        queryset = Location.objects.filter(route_id=route_id).order_by("timestamp")

        return queryset


@csrf_exempt
def intersection(request):
    if request.method == 'POST':
        intersecting_routes = []
            
        # get user_line coordinates    
        user_line = []

        json_data = json.loads(request.body)  
        for coordinate in json_data:
            user_line.append([coordinate["lat"], coordinate["lng"]])

        routes = Route.objects.all()
        for route in routes:
            route_line = list(Location.objects.filter(route_id=route.id).order_by("timestamp")
                .values_list('latitude','longitude'))

            path1 = mpPath(user_line)
            path2 = mpPath(route_line)
            if path1.intersects_path(path2):
                intersecting_routes.append(route.id)


        return JsonResponse({'routes':intersecting_routes})