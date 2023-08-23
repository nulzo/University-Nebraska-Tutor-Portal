import pytest


@pytest.mark.django_db
def test_testing():
    count = 1 + 1
    assert count == 2
