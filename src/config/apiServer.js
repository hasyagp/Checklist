import axios from "axios";
import { backendUrl } from "./index";

const headers = {
    'Content-Type': 'text/plain'
};

const instance = axios.create({
    baseURL: backendUrl,
    // baseURL: "https://methodic-backend.herokuapp.com/",
}, { headers });

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },

    //Error
    (err) => {
        return err.message;
    }
);

export default instance;