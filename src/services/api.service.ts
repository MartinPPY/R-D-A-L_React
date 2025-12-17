import type { AxiosInstance } from "axios";
import axios from "axios";

const URL = 'http://localhost:3000'

export const api: AxiosInstance = axios.create({
    baseURL: URL,
    timeout:5000
})