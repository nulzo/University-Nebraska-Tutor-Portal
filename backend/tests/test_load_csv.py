import pytest
import os
from src.api.scripts.load_semester import ParseSemester, run

PATH = os.getenv("PATH_TO_CSV")


@pytest.mark.django_db
def test_load_data_manual():
    data = ParseSemester(PATH)
    data.write_professors()
    data.write_courses()
    data.write_sections()
    assert len(data.get_courses()) > 0
    assert len(data.get_professors()) > 0
    assert len(data.get_sections()) > 0

@pytest.mark.django_db
def test_load_data_auto():
    assert run(FILE=PATH) == True


