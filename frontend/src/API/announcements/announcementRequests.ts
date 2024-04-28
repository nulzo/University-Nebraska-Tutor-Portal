import axios from "axios";

function getCookie(name: any) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2 && !!parts) return parts.pop()?.split(";").shift();
}

export function createAnnouncement(data: any) {
    console.log(data);
    const csrftoken = getCookie("csrftoken");
    return axios
        .post("/api/announcements", data, {
            headers: {
                "X-CSRFToken": csrftoken,
            },
        })
        .then((res) => res.data)
        .catch((e) => console.log(e));
}