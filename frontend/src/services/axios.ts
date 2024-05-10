import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

export class Instance {
    private _instance: AxiosInstance;
    constructor() {
        this._instance = axios.create({
            baseURL: "/api/",
            timeout: 30000,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    async get(endpoint: string) {
        const response = await this._instance.get(endpoint);
        return response.data;
    }

    async post(endpoint: string, data: any, headers: AxiosRequestConfig | undefined = undefined) {
        const response = await this._instance.post(endpoint, data, headers);
        return response.data;
    }

    private cookie(name: string): string | undefined {
        const value: string = `; ${document.cookie}`;
        const parts: string[] = value.split(`; ${name}=`);
        if (parts.length === 2 && !!parts) return parts.pop()?.split(";").shift();
    }

    async createTicket(data: any): Promise<any> {
        const csrf: string | undefined = this.cookie("csrftoken");
        return await this.post("tickets/", data, {
            headers: {"X-CSRFToken": csrf},
        });
    }

    async updateTicket(data: any) {
        const csrf: string | undefined = this.cookie("csrftoken");
        return await this.post(`tickets/${data.id}/`, data, {
            headers: {"X-CSRFToken": csrf},
        });
    }

    async getTickets() {
        return await this.get("tickets");
    }

    async createAnnouncement(data: any) {
        const csrf: string | undefined = this.cookie("csrftoken");
        return await this.post("announcements", data, {
            headers: {"X-CSRFToken": csrf},
        });
    }

    async getAnnouncements() {
        return await this.get("announcements");
    }

    async createCourse(data: any) {
        const csrf: string | undefined = this.cookie("csrftoken");
        return await this.post("courses", data, {
            headers: {"X-CSRFToken": csrf},
        });
    }

    async getCourses() {
        return await this.get("courses");
    }

    async createIssue(data: any) {
        const csrf: string | undefined = this.cookie("csrftoken");
        return await this.post("issues", data, {
            headers: {"X-CSRFToken": csrf},
        });
    }

    async getIssues() {
        return await this.get("issues");
    }

    async createProfessor(data: any) {
        const csrf: string | undefined = this.cookie("csrftoken");
        return await this.post("professors", data, {
            headers: {"X-CSRFToken": csrf},
        });
    }

    async getProfessors() {
        return await this.get("professors");
    }

    async createSection(data: any) {
        const csrf: string | undefined = this.cookie("csrftoken");
        return await this.post("sections", data, {
            headers: {"X-CSRFToken": csrf},
        });
    }

    async getSections() {
        return await this.get("sections");
    }

    async createTutor(data: any) {
        const csrf: string | undefined = this.cookie("csrftoken");
        return await this.post("tutors", data, {
            headers: {"X-CSRFToken": csrf},
        });
    }

    async getTutors() {
        return await this.get("users/?tutor=1");
    }
}
