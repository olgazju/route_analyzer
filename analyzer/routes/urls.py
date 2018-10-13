from django.conf.urls import url, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'routes', views.RouteViewSet, base_name="routes")
router.register(r'locations', views.LocationViewSet, base_name="locations")

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^intersections/', views.intersection, name="intersections"),
]
