import axios from "axios";

export const api = axios.create({
    baseURL: "https://localhost:7156/v1",
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Accept": "application/json; charset=utf-8",
    }
});