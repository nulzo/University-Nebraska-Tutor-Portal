import csv
import pandas
import numpy as np
import re
import json

COURSES = {}
SECTIONS = {}
PROFESSORS = {}


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
        data["Room"] = data["Room"].map(lambda x: re.split(r", | ", x.split(" [")[0]))
        for _, row in data.iterrows():
            if len(row['Room']) <= 1:
                continue
            professor_id = row['Room'][2] if (1 < len(row['Room']) <= 3) else row['Room'][3]
            professor_id = re.search(pattern=r"(?<=\()[0-9]*(?=\))", string=professor_id)[0]
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
                    "Department_code": f"{row['Department Code']}",
                    "Catalog Number": f"{row['Catalog Number']}",
                    "Course": f"{row['Course']}",
                    "Course Title": f"{row['Course Title']}",
                    "Long Title": f"{row['Long Title']}"
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

    def write_csv():
        pass

    def parse_csv():
        pass


def main():
    parser = ParseSemester(file_dir="class_data.csv")
    print(parser.get_professors())


if __name__ == "__main__":
    main()
