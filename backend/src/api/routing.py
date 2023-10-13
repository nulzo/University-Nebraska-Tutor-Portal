from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
from django.urls import re_path

from .websocket import TextRoomConsumer

django_asgi_app = get_asgi_application()
websocket_urlpatterns = [
    re_path(r"^ws/test", TextRoomConsumer.as_asgi()),
]

application = ProtocolTypeRouter(
    {
        "websocket": AllowedHostsOriginValidator(
            AuthMiddlewareStack(URLRouter(websocket_urlpatterns))
        ),
        "http": django_asgi_app,
    }
)
