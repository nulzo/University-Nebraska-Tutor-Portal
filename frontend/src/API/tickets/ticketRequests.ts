import axios from "axios";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export function createTicket(data: any) {
  const csrftoken = getCookie("csrftoken");
  return axios
    .post("/api/tickets/", data, {
      headers: {
        "X-CSRFToken": csrftoken,
      },
    })
    .then((res) => res.data)
    .catch((e) => console.log(e));
}

export function updateTicket(data: any) {
  const csrftoken = getCookie("csrftoken");
  console.log(data);
  return axios
    .patch(`/api/tickets/${data.id}/`, data, {
      headers: {
        "X-CSRFToken": csrftoken,
      },
    })
    .then((res) => res.data)
    .catch((e) => console.log(e));
}
