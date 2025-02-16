import axios from "axios";

const token = localStorage.getItem('token');
const baseURL = process.env.REACT_APP_BLUCONNECT_BASE_URL;
 const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : undefined,
    },
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Remove o token do localStorage
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);
export { api };