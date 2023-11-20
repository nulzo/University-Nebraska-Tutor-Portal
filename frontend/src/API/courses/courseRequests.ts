import axios from "axios";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export function useMutateCourse(data: any) {
  const csrftoken = getCookie("csrftoken");
  return axios
    .post(
      "/api/courses/",
      {
        course_department: data.course_department,
        course_name: data.course_name,
        course_id: data.course_id,
        course_code: data.course_code,
      },
      {
        headers: {
          "X-CSRFToken": csrftoken,
        },
      },
    )
    .then((res) => res.data);
}

export function useFetchCourse() {
  return axios.get("/api/courses/");
}
