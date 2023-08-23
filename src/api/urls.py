from django.urls import path

from .views import BackendListView

urlpatterns = [
    path("todo", BackendListView.as_view()),
]
