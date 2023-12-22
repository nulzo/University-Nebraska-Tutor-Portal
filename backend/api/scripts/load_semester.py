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
from api.models.semester import Semester

# pylint: disable=E1101

class SysLogger:

    def __init__(self):
        self.RESET = "\033[0m"
        self.BOLD = "\033[1m"
        self.GREEN = "\033[32m"
        self.YELLOW = "\033[33m"
        self.MAGENTA = "\033[35m"
        self.CYAN = "\033[36m"

    def log_error(self, message: str):
        print(f"{self.BOLD}{self.MAGENTA}{message}{self.RESET}")
    
    def log_info(self, message: str):
        print(f"{self.BOLD}{self.CYAN}{message}{self.RESET}")

    def log_warning(self, message: str):
        print(f"{self.BOLD}{self.YELLOW}{message}{self.RESET}")

    def log_success(self, message: str):
        print(f"{self.BOLD}{self.GREEN}{message}{self.RESET}")


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
        self.semester: str = ""
        self.csv_file: str = file_dir
        self.logger = SysLogger()
        self.dataframe: pandas.DataFrame = ...
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

    def set_dataframe(self) -> None:
        # Delete rows that have blank data. Registrar provides malformed CSV file
        # I strongly dislike the names the registrar provides. Let's make them into names that don't contain spaces
        self.dataframe = pandas.read_csv(self.csv_file, dtype=str).loc[:, self.column_names].dropna(how="any", axis=0, subset=None).set_axis(
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
        self.dataframe["instructor"] = self.dataframe["instructor"].map(
            lambda x: re.split(r", | ", x.split(" [")[0])
        )

    def set_semester_name(self) -> None:
        self.semester = self.dataframe["term"].get(1)

    def get_professor_id_from_row(self, row) -> str:
        professor_id = row["instructor"][2] if (1 < len(row["instructor"]) <= 3) else row["instructor"][3]
        return re.search(pattern=r"(?<=\()[0-9]*(?=\))", string=professor_id)[0]

    def get_professor_first_name_from_row(self, row):
        return row["instructor"][1] if (1 < len(row["instructor"]) <= 3) else row["instructor"][2]

    def get_professor_last_name_from_row(self, row):
        return row["instructor"][0] if (1 < len(row["instructor"]) <= 3) else f"{row['instructor'][0]} {row['instructor'][1]}"

    def is_row_staff(self, row):
        return True if len(row["instructor"]) <= 1 else False

    def semester_exists(self, semester_name):
        return Semester.generic.filter(semester_term_name=semester_name).exists()
        
    def professor_exists(self, professor_id):
        return Professor.generic.filter(professor_id=professor_id).exists()

    def course_exists(self, course_code):
        return Course.generic.filter(course_code=course_code).exists()

    def section_exists(self, section_slug):
        return Section.generic.filter(section_id=section_slug).exists()
    
    def write_professor_to_database(self, professor_id: int, professor_full_name: str, professor_first_name: str, professor_last_name: str):
        if self.professor_exists(professor_id):
            self.logger.log_warning(f"ALERT:\t\t{professor_full_name} already in database!")
            return
        professor = Professor(full_name=professor_full_name, first_name=professor_first_name, last_name=professor_last_name, email="null@unomaha.edu", is_active=True, professor_id=professor_id)
        professor.save()
        self.logger.log_success(f"SUCCESS:\t{professor_full_name} added to database!")

    def write_section_to_database(self, section_slug, semester_code, course_department, course_id, modality, professor_id, course_slug):
        if self.section_exists(section_slug):
            self.logger.log_warning(f"ALERT:\t\t{section_slug} already in database!")
            return
        course = Course.generic.all().get(
                course_id=course_id,
                course_department=course_department,
            )
        professor = Professor.generic.get(professor_id=professor_id)
        semester = Semester.generic.get(semester_id=semester_code)
        section = Section(course=course, semester=semester, modality=modality, professor=professor, section_id=section_slug, section_code=f"{course_slug}-{modality}")
        section.save()
        self.logger.log_success(f"SUCCESS:\t{section_slug} added to database!")

    def write_courses_to_database(self, course_slug, course_department, course, course_id):
        if self.course_exists(course_slug):
            self.logger.log_warning(f"ALERT:\t\t{course_slug} already in database!")
            return
        course = Course(course_department=course_department, course_name=course, course_id=course_id, course_code=course_slug)
        course.save()
        self.logger.log_success(f"SUCCESS:\t{course_slug} added to database!")

    def write_semester_to_database(self):
        semester_id = self.dataframe["term_id"].get(1)
        semester_term_name = self.semester
        if "Fall" in semester_term_name:
            semester_code = 1
        elif "Summer" in semester_term_name:
            semester_code = 0
        elif "Spring" in semester_term_name:
            semester_code = 3
        else:
            semester_code = 2
        semester = Semester(year=int(semester_term_name[-4:]), semester_term_name=semester_term_name, semester_code=semester_code, semester_id=semester_id)
        semester.save()
        self.logger.log_success("Successfully logged semester to database!")
    
    def parse_csv(self):
        # Iterate through the dataframe and update the JSONs to be loaded into DB
        for _, row in self.dataframe.iterrows():
            # Dirty check to see if the professor is listed as ['Staff']. Don't want to add that to DB
            if self.is_row_staff(row):
                continue
            
            # Get the professor ID (Some professors have two last names, so we need to check for that)
            professor_id: int = int(self.get_professor_id_from_row(row))
            
            # Again, there are two last names sometimes, so we need to split it accordingly
            professor_last_name = self.get_professor_last_name_from_row(row)
            
            # Get the professor first name
            professor_first_name = self.get_professor_first_name_from_row(row)
            
            # Use the first name prepended to the last name to get the professor full name
            professor_full_name = f"{professor_first_name} {professor_last_name}"

            # Grab information from the current dataframe row
            course_slug = f"{row.get('subject_id')}-{row.get('catalog_id')}"
            section_slug = (f"{row.get('term_id')}{row.get('sis_id')}{row.get('class_id')}")
            semester = row.get("term")
            semester_code = row.get("term_id")
            course_department = row.get("subject_id")
            course_id = row.get("catalog_id")
            modality = row.get("section_id")
            course = self.normalize_text(row.get("course_name"))

            # Start logging line
            self.logger.log_info(f"\n{'='*85}")

            # Log current row info
            self.logger.log_info(f"\nWriting:\tsection: {section_slug}, professor: {professor_full_name}, course: {course_slug}\n")

            # Add the professor data here to match the DB fields for professors
            self.write_professor_to_database(professor_id, professor_full_name, professor_first_name, professor_last_name)

            # Add the course data here to match the DB fields for courses
            self.write_courses_to_database(course_slug, course_department, course, course_id)

            # Add the section data here to match the DB fields for sections
            self.write_section_to_database(section_slug, semester_code, course_department, course_id, modality, professor_id, course_slug)
            
            # End logging line
            self.logger.log_info(f"\n{'='*85}\n")
            
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

def run(csv_file: str | None = None) -> int:
    FILE = os.getenv("PATH_TO_FILE")
    parser = ParseSemester(FILE)
    parser.set_dataframe()
    parser.set_semester_name()
    parser.write_semester_to_database()
    parser.parse_csv()
    # parser.write_professors()
    # parser.write_courses()
    # parser.write_sections()
    return 0
