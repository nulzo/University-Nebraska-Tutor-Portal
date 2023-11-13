import pytest
from django.test import Client


@pytest.fixture
def create_object():
    client = Client()
    data: dict = {
        "problem_type": "Homework",
        "severity": "1",
    }
    response = client.post(path="/api/issues/", data=data)
    assert response.status_code == 201
    return response


@pytest.mark.django_db
def test_url_exists():
    client = Client()
    response = client.get(path="/api/issues/")
    assert response.status_code == 200
    