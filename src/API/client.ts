import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:22225/api",

});

client.interceptors.request.use(config => {
    const token = localStorage.getItem("access_token")
    if(token) {
        config.headers = {
            "Authorization": `Bearer ${token}`,
        };
    }

    return config;
});

client.interceptors.response.use(
    res => res,
    err => {
        if(err.response.status === 401) {
            localStorage.removeItem('access_token')
        }
        return Promise.reject(err);
    }
);

export default client;