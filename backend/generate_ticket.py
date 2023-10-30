import json

from faker import Faker


class Generator:
    def __init__(self):
        self.tickets = []
        self.students: list = []
        self.faker = Faker()

    def create_students(self):
        for _ in range(50):
            first = self.faker.first_name()
            last = self.faker.last_name()
            email = f"{first}{last}@unomaha.edu"
            msoid = self.faker.ean(length=8)
            student_nuid = self.faker.ean(length=8)
            student = {
                "name": f"{first} {last}",
                "student_nuid": student_nuid,
                "email": email,
                "is_tutor": False,
                "is_admin": False,
                "MSOID": msoid,
            }
            self.students.append(student)
        print(json.dumps(self.students, indent=2))


gen = Generator()
print(gen.create_students())
