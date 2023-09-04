from django.urls import path

from .views import BackendListView

urlpatterns = [
    path("home", BackendListView.as_view()),
]
