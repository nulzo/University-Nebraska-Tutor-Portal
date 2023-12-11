# Author:   Nolan Gregory
# Date:     October 21st, 2023
# Desc:     This file loads in CSV data that is provided by the UNO Registrar
#           on a semester-to-semester basis. It uses Pandas to extract the required
#           data, and then loads it into the database.

import os
import re

import pandas
from django.db.utils import IntegrityError

from api.models.course import Course
from api.models.professor import Professor
from api.models.sections import Section

# pylint: disable=E1101


class ParseSemester:
    '''
    A class used to parse and process semester data from a CSV file

    ...

    Attributes
    ----------
    courses : dict
    a dictionary to store course data
    sections : dict
    a dictionary to store section data
    professors : dict
    a dictionary to store professor data
    csv_file : str
    the file directory of the CSV data
    column_names : list
    a list of column names from the CSV file
    professor_data : pandas.DataFrame
    a DataFrame to store professor data from the CSV file

    Methods
    -------
    read_csv()
    Reads the CSV file and processes the data into dictionaries for courses, sections, and professors
    get_professors() -> dict
    Returns the dictionary of professor data
    get_courses() -> dict
    Returns the dictionary of course data
    get_sections() -> dict
    Returns the dictionary of section data
    normalize_text(text: str) -> str
    Normalizes the input text and returns the normalized string
    write_professors()
    Writes professor data to the database
    write_courses()
    Writes course data to the database
    write_sections()
    Writes section data to the database
    """
    def __init__(self, file_dir: str) -> None:
    pass

    def read_csv(self):
    """
    Reads the CSV file and processes the data into dictionaries for courses, sections, and professors
    """
    pass

    def get_professors(self) -> dict:
    """
    Returns the dictionary of professor data
    """
    pass

    def get_courses(self) -> dict:
    """
    Returns the dictionary of course data
    """
    pass

    def get_sections(self) -> dict:
    """
    Returns the dictionary of section data
    """
    pass

    def normalize_text(self, text: str) -> str:
    """
    Normalizes the input text and returns the normalized string

    Parameters
    ----------
    text : str
    The text to be normalized

    Returns
    -------
    str
    The normalized text
    """
    pass

    def write_professors(self) -> None:
    """
    Writes professor data to the database
    """
    pass

    def write_courses(self) -> None:
    """
    Writes course data to the database
    """
    pass

    def write_sections(self) -> None:
    """
    Writes section data to the database
    """
    pass


    def run(csv_file: str | None = None) -> bool:
    """
    Runs the data processing and writing tasks for the CSV file

    Parameters
    ----------
    csv_file : str, optional
    The file directory of the CSV data

    Returns
    -------
    bool
    True if the process is successful, False otherwise
    """
    pass
    '''

    def __init__(self, file_dir: str) -> None:
        self.courses: dict = {}
        self.sections: dict = {}
        self.professors: dict = {}
        self.csv_file: str = file_dir
        # It seems like the registrar likes to change the names of columns... If they do
        # in the future, you can just switch them out here and the script will load it in accordingly
        self.column_names: list = [
            "CLSS ID",
            "SIS ID",
            "Term",
            "Term Code",
            "Subject Code",
            "Catalog Number",
            "Section #",
            "Course Title",
            "Instructor",
        ]
        self.professor_data: pandas.DataFrame = ...
        self.read_csv()

    def read_csv(self):
        # Open the csv file and get all the headers we need
        data: pandas.DataFrame = pandas.read_csv(self.csv_file, dtype=str).loc[
            :, self.column_names
        ]
        # Delete rows that have blank data. Registrar provides malformed CSV file
        data = data.dropna(how="any", axis=0, subset=None)

        # I strongly dislike the names the registrar provides. Let's make them into names that don't contain spaces
        data = data.set_axis(
            [
                "class_id",
                "sis_id",
                "term",
                "term_id",
                "subject_id",
                "catalog_id",
                "section_id",
                "course_name",
                "instructor",
            ],
            axis=1,
        )

        # Since intructor is lumped with the room, we need to split it apart to get F_name, L_name, P_id
        data["instructor"] = data["instructor"].map(
            lambda x: re.split(r", | ", x.split(" [")[0])
        )

        # Iterate through the dataframe and update the JSONs to be loaded into DB
        for _, row in data.iterrows():
            # Dirty check to see if the professor is listed as ['Staff']. Don't want to add that to DB
            if len(row["instructor"]) <= 1:
                continue
            # Get the professor ID (Some professors have two last names, so we need to check for that)
            professor_id: str = (
                row["instructor"][2]
                if (1 < len(row["instructor"]) <= 3)
                else row["instructor"][3]
            )
            # The P_id comes in enclosed in parenthesis, so a look-ahead and look-behind regex matches what is inside
            professor_id = re.search(
                pattern=r"(?<=\()[0-9]*(?=\))", string=professor_id
            )[0]
            # Again, there are two last names sometimes, so we need to split it accordingly
            professor_last_name = (
                row["instructor"][0]
                if (1 < len(row["instructor"]) <= 3)
                else f"{row['instructor'][0]} {row['instructor'][1]}"
            )
            # Get the professor first name
            professor_first_name = (
                row["instructor"][1]
                if (1 < len(row["instructor"]) <= 3)
                else row["instructor"][2]
            )
            # Use the first name prepended to the last name to get the professor full name
            professor_full_name = f"{professor_first_name} {professor_last_name}"

            # Grab stuff
            course_slug = f"{row.get('subject_id')}-{row.get('catalog_id')}"
            section_slug = (
                f"{row.get('term_id')}{row.get('sis_id')}{row.get('class_id')}"
            )
            semester = row.get("term")
            semester_code = row.get("term_id")
            course_department = row.get("subject_id")
            course_id = row.get("catalog_id")
            modality = row.get("section_id")
            course = self.normalize_text(row.get("course_name"))

            # Add the professor data here to match the DB fields for professors
            self.professors.update(
                {
                    f"{professor_id}": {
                        "full_name": professor_full_name,
                        "first_name": professor_first_name,
                        "last_name": professor_last_name,
                        "professor_id": professor_id,
                    }
                }
            )
            # Add the section data here to match the DB fields for sections
            self.sections.update(
                {
                    section_slug: {
                        "semester": semester,
                        "semester_code": semester_code,
                        "course_department": course_department,
                        "course_id": course_id,
                        "modality": modality,
                        "course": course,
                        "professor_id": professor_id,
                        "professor": professor_full_name,
                    }
                }
            )
            # Add the course data here to match the DB fields for courses
            self.courses.update(
                {
                    course_slug: {
                        "course_department": course_department,
                        "course_name": course,
                        "course_id": course_id,
                    }
                }
            )
        # print(json.dumps(self.professors, indent=2))

    def get_professors(self) -> dict:
        return self.professors

    def get_courses(self) -> dict:
        return self.courses

    def get_sections(self) -> dict:
        return self.sections

    def normalize_text(self, text: str) -> str:
        normalized = ""
        for word in text.split():
            match word:
                case "IN":
                    normalized += "in "
                case "TO":
                    normalized += "to "
                case "IT":
                    normalized += "IT "
                case "CS":
                    normalized += "CS "
                case "OF":
                    normalized += "of "
                case "AND":
                    normalized += "and "
                case "&":
                    normalized += "and "
                case "A":
                    normalized += "a "
                case "THE":
                    normalized += "the "
                case "FOR":
                    normalized += "for "
                case "IV":
                    normalized += "IV "
                case "III":
                    normalized += "III "
                case "II":
                    normalized += "II "
                case "I":
                    normalized += "I "
                case "ITIN":
                    normalized += "ITIN "
                case "IS&T":
                    normalized += "IS&T "
                case _:
                    normalized += word.capitalize() + " "
        return normalized.strip()

    def write_professors(self) -> None:
        for p_id, p_data in self.professors.items():
            professor = Professor()
            professor.first_name = p_data.get("first_name")
            professor.last_name = p_data.get("last_name")
            professor.full_name = p_data.get("full_name")
            professor.email = r"randomemail@unomaha.edu"
            professor.is_active = True
            professor.professor_id = int(p_id)
            professor.save()
            print(f"Saved: {p_data}\nSuccessfully!")

    def write_courses(self) -> None:
        for slug, data in self.courses.items():
            try:
                course = Course()
                course.course_department = data.get("course_department")
                course.course_name = data.get("course_name")
                course.course_id = data.get("course_id")
                course.course_code = slug
                course.save()
                print(f"Saved: {course}\nSuccessfully!")
            except IntegrityError as exception:
                print(
                    f"SKIPPING COURSE: {course}... REASON: Course is already in database\n"
                )

    def write_sections(self) -> None:
        for slug, data in self.sections.items():
            section = Section()
            course = Course.generic.all().get(
                course_id=data.get("course_id"),
                course_department=data.get("course_department"),
            )
            professor = Professor.professor.get_professor(
                professor=data.get("professor")
            ).first()
            section.modality = data.get("modality")
            section.professor = professor
            section.course = course
            section.section_id = slug
            section.save()


def run(csv_file: str | None = None) -> bool:
    FILE = os.getenv("PATH_TO_FILE")
    parser = ParseSemester(FILE)
    parser.write_professors()
    parser.write_courses()
    parser.write_sections()
    return True


if __name__ == "__main__":
    run(FILE=FILE)
