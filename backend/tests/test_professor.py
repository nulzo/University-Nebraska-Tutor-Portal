import pytest
from src.api.models.professor import Professor


@pytest.fixture
def professor():
    return Professor.prof.create(
        first_name="Nolan",
        last_name="Gregory",
        full_name="Nolan Gregory",
        email="nolangregory@unomaha.edu",
        is_active=True,
        professor_id=123456,
    )


@pytest.mark.django_db
def test_professor_exists(professor):
    assert Professor.prof.filter(full_name="Nolan Gregory").exists()


@pytest.mark.django_db
def test_course_str_method(professor):
    """
    Test the __str__ method of the Course model.
    """
    assert str(professor) == "Nolan Gregory"


@pytest.mark.django_db
def test_professor_id(professor):
    professor = Professor.prof.all().filter(full_name=professor).first()
    assert professor.professor_id == 123456


@pytest.mark.django_db
def test_first_name(professor):
    professor = Professor.prof.all().filter(full_name=professor).first()
    assert professor.first_name == "Nolan"


@pytest.mark.django_db
def test_first_name(professor):
    professor = Professor.prof.all().filter(full_name=professor).first()
    assert professor.last_name == "Gregory"


@pytest.mark.django_db
def test_email(professor):
    professor = Professor.prof.all().filter(full_name=professor).first()
    assert professor.email == "nolangregory@unomaha.edu"
