import axios from "axios";

const API_BASE_URL = "/api/";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Function to fetch data from API
export const fetchData = async (endpoint: string) => {
    try {
        const response = await axiosInstance.get(endpoint);
        return response.data;
    } catch (error) {
        throw error; // Handle errors as needed
    }
};

// Function to post data to API
export const postData = async (endpoint: string, data: any) => {
    try {
        const response = await axiosInstance.post(endpoint, data);
        return response.data;
    } catch (error) {
        throw error; // Handle errors as needed
    }
};

// Add more functions for different API requests as needed
