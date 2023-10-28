import pytest
from django.test import Client


@pytest.fixture
def create_object():
    client = Client()
    data: dict = {
        "course_department": "CIST",
        "course_name": "Computer Science I",
        "course_id": "Nolan 1400",
    }
    return client.post(path="/api/courses/", data=data)


@pytest.mark.django_db
def test_url_exists():
    client = Client()
    response = client.get(path="/api/courses/")
    assert response.status_code == 200


@pytest.mark.django_db
def test_post_professor():
    client = Client()
    data: dict = {
        "course_department": "CIST",
        "course_name": "Computer Science I",
        "course_id": "Nolan 1400",
    }
    response = client.post(path="/api/courses/", data=data)
    assert response.status_code == 201


# @pytest.mark.django_db
# def test_get_professor(create_object):
#     client = Client()
#     response = client.get(
#         f"/api/professors/1?format=json")
#     assert response.status_code == 200
#     assert len(response.content) > 0
