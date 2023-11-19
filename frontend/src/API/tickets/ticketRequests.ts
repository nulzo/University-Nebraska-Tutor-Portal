import axios from "axios";

export function createTicket(data: any) {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const csrftoken = getCookie("csrftoken");
  return axios
    .post("/api/tickets/", data, {
      headers: {
        "X-CSRFToken": csrftoken,
      },
    })
    .then((res) => res.data);
}
