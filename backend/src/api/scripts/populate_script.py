import csv
import pandas
import numpy as np
import re
import json

from backend.src.api.models.professor import Professor
from backend.src.api.models.course import Course
from backend.src.api.models.sections import Section


class ParseSemester:
    def __init__(self, file_dir: str) -> None:
        self.courses: dict = {}
        self.sections: dict = {}
        self.professors: dict = {}
        self.csv_file: str = file_dir
        self.csv_data: pandas.DataFrame = ...
        self.type_dataframe = {
            "SIS ID": str,
            "Term Code": str,
            "Department Code": str,
            "Catalog Number": str,
            "Course": str,
            "Course Title": str,
            "Long Title": str,
            "Room": str
        }
        self.__read_csv()

    def __read_csv(self):
        data: pandas.DataFrame = pandas.read_csv(
            self.csv_file,
            usecols=[
                1, 3, 4, 6, 7, 9, 10, 16,
            ],
            converters=self.type_dataframe
        )
        data = data.replace('', np.nan).dropna(how="any", axis=0, subset=None)
        data["Room"] = data["Room"].map(
            lambda x: re.split(r", | ", x.split(" [")[0]))
        for _, row in data.iterrows():
            if len(row['Room']) <= 1:
                continue
            professor_id = row['Room'][2] if (
                1 < len(row['Room']) <= 3) else row['Room'][3]
            professor_id = re.search(
                pattern=r"(?<=\()[0-9]*(?=\))", string=professor_id)[0]
            professor_last_name = row['Room'][0] if (
                1 < len(row['Room']) <= 3) else f"{row['Room'][0]} {row['Room'][1]}"
            professor_first_name = row['Room'][1] if (
                1 < len(row['Room']) <= 3) else row['Room'][2]
            professor_full_name = f"{professor_first_name} {professor_last_name}"
            self.professors.update({
                f"{professor_id}": {
                    "full_name": professor_full_name,
                    "first_name": professor_first_name,
                    "last_name": professor_last_name,
                    "professor_id": professor_id
                }
            })
            self.sections.update({
                f"{row['SIS ID']}": {
                    "Semester": f"{row['Term Code']}",
                    "semester_code": f"{row['Department Code']}",
                    "course_department": f"{row['Catalog Number']}",
                    "course_id": f"{row['Course']}",
                    "modality": f"{row['Course Title']}",
                    "course": f"{row['Long Title']}",
                    "professor_id": professor_id,
                    "professor": professor_full_name
                }
            })
            self.courses.update({
                f"{row['Course']}": {
                    "course_department": f"{row['Catalog Number']}",
                    "course_name": f"{row['Long Title']}",
                    "course_id": f"{row['Course']}",
                    "is_active": True
                }
            })

    def get_professors(self) -> dict:
        return self.professors

    def get_courses(self) -> dict:
        return self.courses

    def get_sections(self) -> dict:
        return self.sections

    def write_professors(self) -> None:
        for p_id, p_data in self.professors.items():
            professor = Professor()
            print(p_data)
            try:
                professor.first_name = p_data.get('first_name')
                professor.last_name = p_data.get('last_name')
                professor.full_name = p_data.get('full_name')
                professor.email = r"dummydata@unomaha.edu"
                professor.is_active = True
                professor.professor_id = p_id
                professor.save()
                print("SAVED!")
            except Exception as e:  # nosec B112
                print("COULD NOT SAVE!")
                continue

    def write_courses(self) -> None:
        for c_id, c_data in self.courses.items():
            course = Course()
            try:
                course.course_department = c_data.get('course_department')
                course.course_name = c_data.get('course_name')
                course.course_id = c_id
                course.is_active = True
                course.save()
            except Exception as e:  # nosec B112
                continue

    def write_sections(self) -> None:
        for s_id, s_data in self.sections.items():
            section = Section()
            try:
                course = Course.objects.all().get(course_id=s_data.get('course_id'),
                                                  course_department=s_data.get('course_department'))
                print(course)
                professor = Professor.professor.get_professor(
                    professor=s_data.get('professor')).first()
                section.modality = s_data.get('modality')
                section.professor = professor
                section.course = course
                section.save()
            except Exception as e:  # nosec B112
                print(e)
                continue
            # print(s_id, s_data)


def run():
    parser = ParseSemester(file_dir="backend\\src\\api\\data\\class_data.csv")
    parser.write_sections()


if __name__ == "__main__":
    run()
