import axios from "axios";

const client = axios.create({
    baseURL: "https://oprosov.ru/api",

});

client.interceptors.request.use(config => {
    config.headers = {
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
    };

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