import { Component } from "react";
import { faker } from "@faker-js/faker";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

export default class GenerateData extends Component {
  constructor(props) {
    super(props);
    this.reset();
  }

  reset() {
    this.state = {
      profCount: 0,
      courseCount: 0,
      tutorCount: 0,
      studentCount: 0,
      professors: [],
      students: [],
    };
  }

  componentDidMount(): void {
    axios.get("http://localhost:8000/api/professor/").then((res) => {
      this.setState({ professors: res.data });
    });
  }

  generateProfessors(n: number) {
    let iter: number = 0;
    const profs = {
      name: "",
      email: "",
      is_active: true,
    };
    while (iter < n) {
      const firstname = faker.person.firstName();
      const lastname = faker.person.lastName();
      const email = firstname[0] + lastname + "@unommaha.edu";
      console.log(firstname, lastname, email);
      axios
        .post("http://localhost:8000/api/professor/", {
          name: firstname + " " + lastname,
          email: email,
          is_active: true,
        })
        .then((res) => {
          console.log(res);
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.resonse);
          }
        });
      iter++;
    }
    this.reset();
    console.log(this.state);
  }

  render() {
    return (
      <div className=" grid grid-cols-2 gap-4">
        <div>
          <Card className="w-fit">
            <CardHeader>
              <CardTitle>Generate Professors</CardTitle>
              <CardDescription>
                Populate the database with a custom amount of professors.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Amount of professors</Label>
                    <Input
                      id="amount"
                      value={this.state.profCount}
                      onChange={(evt) =>
                        this.setState({ profCount: evt.target.value })
                      }
                      placeholder="Integer [1-100]"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={() => this.generateProfessors(this.state.profCount)}
              >
                Generate
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="w-fit">
            <CardHeader>
              <CardTitle>Generate Courses</CardTitle>
              <CardDescription>
                Populate the database with a custom amount of courses.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Amount of courses</Label>
                    <Input id="amount" placeholder="Integer [1-100]" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Generate</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="pt-4">
          <Card className="w-fit">
            <CardHeader>
              <CardTitle>Generate Students</CardTitle>
              <CardDescription>
                Populate the database with a custom amount of students.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Amount of students</Label>
                    <Input id="amount" placeholder="Integer [1-100]" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Generate</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="pt-4">
          <Card className="w-fit">
            <CardHeader>
              <CardTitle>Generate Tutors</CardTitle>
              <CardDescription>
                Populate the database with a custom amount of tutors.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Amount of tutors</Label>
                    <Input id="amount" placeholder="Integer [1-100]" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Generate</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
}
