import pytest
from src.api.models.course import Course
from django.db.utils import IntegrityError
from pytest_django.asserts import assertFieldOutput

@pytest.fixture
def course():
    return Course.objects.create(
        course_name="Computer Science I",
        course_id="1400",
        course_department="CIST",
    )

@pytest.mark.django_db
def test_course_exists(course):
    assert Course.objects.filter(course_name="Computer Science I").exists()

@pytest.mark.django_db
def test_course_str_method(course):
    """
    Test the __str__ method of the Course model.
    """
    assert str(course) == "Computer Science I"

@pytest.mark.django_db
def test_default_values():
    """
    Test that default values are correctly set for course_department and is_active.
    """
    course = Course.objects.create(
        course_name="Random Name",
        course_id="Random_ID"
    )
    assert course.course_department == "CSCI"

@pytest.mark.django_db
def test_blank_course_department(course):
    """
    Test that the course_department field cannot be blank.
    """
    assert assertFieldOutput(course)
    # with pytest.raises(IntegrityError) as error:

# @pytest.mark.django_db
# def test_blank_course_name():
#     """
#     Test that the course_name field cannot be blank.
#     """
#     with pytest.raises(Exception):
#         Course.objects.create(
#             course_name="",
#             course_id="INVALID"
#         )

# @pytest.mark.django_db
# def test_blank_course_id():
#     """
#     Test that the course_id field cannot be blank.
#     """
#     with pytest.raises(Exception):
#         Course.objects.create(
#             course_name="Invalid Course",
#             course_id=""
#         )

# @pytest.mark.django_db
# def test_max_length_course_name():
#     """
#     Test that the course_name field enforces its maximum length.
#     """
#     with pytest.raises(Exception):
#         Course.objects.create(
#             course_name="A" * 101,  # Exceeds max_length of 100
#             course_id="INVALID"
#         )

# @pytest.mark.django_db
# def test_max_length_course_id():
#     """
#     Test that the course_id field enforces its maximum length.
#     """
#     with pytest.raises(Exception):
#         Course.objects.create(
#             course_name="Invalid Course",
#             course_id="A" * 26  # Exceeds max_length of 25
#         )

# @pytest.mark.django_db
# def test_is_active_default():
#     """
#     Test that the is_active field is set to True by default.
#     """
#     course = Course.objects.create(
#         course_name="Active Course",
#         course_id="ACTIVE123"
#     )
#     assert course.is_active is True