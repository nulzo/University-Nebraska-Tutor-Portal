import axios from "axios"

export function createTicket(data: any) {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    const csrftoken = getCookie('csrftoken');
    return axios.post("/api/tickets/", {
        name: data.student_name,
        description: data.body,
        professor: data.professor,
        course: data.section,
        issue: data.issue,
    },
        {
            headers: {
                'X-CSRFToken': csrftoken
            }
        })
        .then(res => res.data);
}