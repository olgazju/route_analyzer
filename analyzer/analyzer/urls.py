from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.views import serve
from django.views.generic import RedirectView

urlpatterns = [
    url(r'^routes/', include('routes.urls')),
    url(r'^map/', include('map.urls')),
    url(r'^admin/', admin.site.urls),

    url(r'^$', serve,kwargs={'path': 'index.html'}),
    url(r'^(?!/?static/)(?!/?media/)(?P<path>.*\..*)$',
        RedirectView.as_view(url='/static/%(path)s', permanent=False)),
]
