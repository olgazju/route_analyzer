from .models import Route, Location
from rest_framework import viewsets
from .serializers import RouteSerializer, LocationSerializer


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