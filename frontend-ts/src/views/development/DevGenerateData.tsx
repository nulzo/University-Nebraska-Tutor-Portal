// import { useState } from "react";
// import { faker } from "@faker-js/faker";
// import { Button } from "@/components/ui/button";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import axios from "axios";
// import Header from "@/components/typography/Header";

// export default function DevGenerateData() {
//     // const [professors, setProfessors] = useState();
//     // const [sections, getSections] = useState();
//     // const [tutors, getTutors] = useState();
//     // const [courses, getCourses] = useState();
//     // const [tickets, getTickets] = useState();
//     const [professorCount, setProfessorCount] = useState(0);
//     const [sectionCount, setSectionCount] = useState(0);
//     const [studentCount, setStudentCount] = useState(0);
//     const [ticketCount, setTicketCount] = useState(0);

//     const departments = ["CSCI", "CIST", "ENG", "ISQA"];

//     const course_modality = ["In-Person", "Hybrid", "Online"];

//     const courses = [
//         "Introduction to Programming",
//         "Data Structures and Algorithms",
//         "Computer Organization and Architecture",
//         "Operating Systems",
//         "Database Management Systems",
//         "Software Engineering",
//         "Web Development Fundamentals",
//         "Artificial Intelligence",
//         "Machine Learning",
//         "Computer Graphics",
//         "Networking and Security",
//         "Human-Computer Interaction",
//         "Data Science and Big Data Analytics",
//         "Cloud Computing",
//         "Parallel and Distributed Computing",
//         "Cybersecurity",
//         "Computer Vision",
//         "Natural Language Processing",
//         "Mobile App Development",
//         "Quantum Computing"
//     ];

//     function generateStudents(n: number) {
//         for (let count = 0; count < n; count++) {
//             let first_name = faker.person.firstName();
//             let last_name = faker.person.lastName();
//             let full_name = `${first_name} ${last_name}`;
//             let email = `${first_name[0]}${last_name}@unomaha.edu`;
//             let NUID = Math.floor(Math.random() * (1000000));
//             let MSOID = Math.floor(Math.random() * (1000000));
//             axios
//                 .post("http://localhost:6969/api/students/", {
//                     student_nuid: NUID,
//                     name: full_name,
//                     is_active: true,
//                     email: email,
//                     MSOID: MSOID
//                 })
//                 .then((res) => { console.log(res) })
//                 .catch((error) => console.log(error.response))
//         }
//     }

//     function generateProfessors(n: number) {
//         for (let count = 0; count < n; count++) {
//             let first_name = faker.person.firstName();
//             let last_name = faker.person.lastName();
//             let full_name = `${first_name} ${last_name}`;
//             let email = `${first_name[0]}${last_name}@unomaha.edu`;
//             axios
//                 .post("http://localhost:6969/api/professors/", {
//                     first_name: first_name,
//                     last_name: last_name,
//                     full_name: full_name,
//                     email: email,
//                     is_active: true,
//                 })
//                 .then((res) => { console.log(res) })
//                 .catch((error) => console.log(error.response, error))
//         }
//     }

//     function generateSections(n: number) {
//         for (let count = 0; count < n; count++) {
//             let professor = Math.floor(Math.random() * (21));
//             let course = 2 + Math.floor(Math.random() * (19));
//             let modality = course_modality[Math.floor(Math.random() * (4))];
//             axios
//                 .post("http://localhost:6969/api/sections/", {
//                     modality: modality,
//                     professor: professor,
//                     course: course,
//                 })
//                 .then((res) => { console.log(res) })
//                 .catch((error) => console.log(error.response))
//         }
//     }

//     function generateCourses(n: number) {
//         for (let count = 0; count < courses.length; count++) {
//             let dept_num = Math.floor(Math.random() * (departments.length + 1));
//             let course_department = departments[dept_num];
//             let course_name = courses[count];
//             let course_id = Math.floor(Math.random() * (5001));
//             axios
//                 .post("http://localhost:6969/api/courses/", {
//                     course_department: course_department,
//                     course_name: course_name,
//                     course_id: course_id,
//                     is_active: true,
//                 })
//                 .then((res) => { console.log(res) })
//                 .catch((error) => console.log(error.response))
//         }
//     }

//     function generateTickets(n: number) {
//         for (let count = 0; count < n; count++) {
//             let professor = Math.floor(Math.random() * (30));
//             let section = Math.floor(Math.random() * (19));
//             let issue = Math.floor(Math.random() * (4));
//             let student = count % 2 == 0 ? 825703 : 898331;
//             axios
//                 .post("http://localhost:6969/api/tickets/", {
//                     name: "Test User",
//                     description: faker.lorem.words({ min: 5, max: 300 }),
//                     professor: professor,
//                     section: section,
//                     issue: issue,
//                     student: student,
//                     started:true,
//                     completed: true,
//                     tutor: 3
//                 })
//                 .then((res) => { console.log(res) })
//                 .catch((error) => console.log(error.response))
//         }
//     }

//     return (
//         <>
//             <Header text="Generate Fake Data" subtext="Use faker to generate finite amount of data to be loaded into the database. Useful for testing API calls and functionality." />
//             <Card className="w-fit">
//                 <CardHeader>
//                     <CardTitle>Generate Professors</CardTitle>
//                     <CardDescription>
//                         Populate the database with a custom amount of professors.
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <form>
//                         <div className="grid w-full items-center gap-4">
//                             <div className="flex flex-col space-y-1.5">
//                                 <Label htmlFor="name">Amount of professors</Label>
//                                 <Input
//                                     id="amount"
//                                     value={professorCount}
//                                     onChange={(event) => { setProfessorCount(event.target.value) }
//                                     }
//                                     placeholder="Integer amount of professors..."
//                                 />
//                             </div>
//                         </div>
//                     </form>
//                 </CardContent>
//                 <CardFooter className="flex justify-end">
//                     <Button onClick={() => { generateProfessors(professorCount) }}>
//                         Generate
//                     </Button>
//                 </CardFooter>
//             </Card>
//             <Card className="w-fit">
//                 <CardHeader>
//                     <CardTitle>Generate Courses</CardTitle>
//                     <CardDescription>
//                         Populate the database with a custom amount of courses.
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <form>
//                         <div className="grid w-full items-center gap-4">
//                             <div className="flex flex-col space-y-1.5">
//                                 <Label htmlFor="name">Generate {courses.length} courses (Just need to do this once)</Label>
//                             </div>
//                         </div>
//                     </form>
//                 </CardContent>
//                 <CardFooter className="flex justify-end">
//                     <Button onClick={() => { generateCourses(courses.length) }}>
//                         Generate
//                     </Button>
//                 </CardFooter>
//             </Card>

//             <Card className="w-fit">
//                 <CardHeader>
//                     <CardTitle>Generate Sections</CardTitle>
//                     <CardDescription>
//                         Populate the database with a custom amount of sections.
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <form>
//                         <div className="grid w-full items-center gap-4">
//                             <div className="flex flex-col space-y-1.5">
//                                 <Label htmlFor="name">Amount of sections</Label>
//                                 <Input
//                                     id="amount"
//                                     value={sectionCount}
//                                     onChange={(event) => { setSectionCount(event.target.value) }
//                                     }
//                                     placeholder="Integer amount of professors..."
//                                 />
//                             </div>
//                         </div>
//                     </form>
//                 </CardContent>
//                 <CardFooter className="flex justify-end">
//                     <Button onClick={() => { generateSections(sectionCount) }}>
//                         Generate
//                     </Button>
//                 </CardFooter>
//             </Card>

//             <Card className="w-fit">
//                 <CardHeader>
//                     <CardTitle>Generate Students</CardTitle>
//                     <CardDescription>
//                         Populate the database with a custom amount of students.
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <form>
//                         <div className="grid w-full items-center gap-4">
//                             <div className="flex flex-col space-y-1.5">
//                                 <Label htmlFor="name">Amount of students</Label>
//                                 <Input
//                                     id="amount"
//                                     value={studentCount}
//                                     onChange={(event) => { setStudentCount(event.target.value) }
//                                     }
//                                     placeholder="Integer amount of professors..."
//                                 />
//                             </div>
//                         </div>
//                     </form>
//                 </CardContent>
//                 <CardFooter className="flex justify-end">
//                     <Button onClick={() => { generateStudents(studentCount) }}>
//                         Generate
//                     </Button>
//                 </CardFooter>
//             </Card>

//             <Card className="w-fit">
//                 <CardHeader>
//                     <CardTitle>Generate Tickets</CardTitle>
//                     <CardDescription>
//                         Populate the database with a custom amount of tickets.
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <form>
//                         <div className="grid w-full items-center gap-4">
//                             <div className="flex flex-col space-y-1.5">
//                                 <Label htmlFor="name">Amount of tickets</Label>
//                                 <Input
//                                     id="amount"
//                                     value={ticketCount}
//                                     onChange={(event) => { setTicketCount(event.target.value) }
//                                     }
//                                     placeholder="Integer amount of tickets..."
//                                 />
//                             </div>
//                         </div>
//                     </form>
//                 </CardContent>
//                 <CardFooter className="flex justify-end">
//                     <Button onClick={() => { generateTickets(ticketCount) }}>
//                         Generate
//                     </Button>
//                 </CardFooter>
//             </Card>

//         </>
//     )

// }
