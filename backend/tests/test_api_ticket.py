import pytest
from django.test import Client


@pytest.fixture
def create_object():
    client = Client()
    # Make a professor
    prof: dict = {
        "first_name": "Nolan",
        "last_name": "Gregory",
        "full_name": "Nolan Gregory",
        "email": "nolangregory@unomaha.edu",
        "professor_id": "123456",
    }
    # Make a course
    # course: dict = {
    #     "course_department": "CSCI",
    #     "course_name": "Operating Systems",
    #     "course_id": 4500,
    #     "course_code": "CSCI-4500"
    # }
    # assert client.post(path="api/courses/", data=course)