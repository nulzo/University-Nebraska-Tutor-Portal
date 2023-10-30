import pytest
from django.test import Client


@pytest.fixture
def create_object():
    client = Client()
    data: dict = {
        "first_name": "Nolan",
        "last_name": "Gregory",
        "full_name": "Nolan Gregory",
        "email": "nolangregory@unomaha.edu",
        "professor_id": "123456",
    }
    return client.post(path="/api/professors/", data=data)


@pytest.mark.django_db
def test_url_exists():
    client = Client()
    response = client.get(path="/api/professors/")
    assert response.status_code == 200


@pytest.mark.django_db
def test_post_professor():
    client = Client()
    data: dict = {
        "first_name": "Nolan",
        "last_name": "Gregory",
        "full_name": "Nolan Gregory",
        "email": "nolangregory@unomaha.edu",
        "professor_id": "123456",
    }
    response = client.post(path="/api/professors/", data=data)
    assert response.status_code == 201


@pytest.mark.django_db
def test_get_professor(create_object):
    client = Client()
    response = client.get("/api/professors/1?format=json")
    assert response.status_code == 200
    assert len(response.content) > 0
