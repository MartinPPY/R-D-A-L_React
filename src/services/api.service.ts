import type { AxiosInstance } from "axios";
import axios from "axios";

const URL = 'http://localhost:3000'

export const api: AxiosInstance = axios.create({
    baseURL: URL
})

const setupInterceptors = () => {

    api.interceptors.request.use(
        (config) => {

            const token = sessionStorage.getItem('token')
            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config
        },
        (err) => {
            return Promise.reject(err)
        }
    )
}

setupInterceptors()