import axios from "axios";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default function fetchOrCreateUser(data: any) {
  const csrftoken = getCookie("csrftoken");
  return axios
    .post("api/authenticate/", data, {
      headers: {
        "X-CSRFToken": csrftoken,
      },
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
}
