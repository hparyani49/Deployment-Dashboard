import axios from "axios";

// export const serverApi = 'http://localhost:4000/';
export const serverApi = 'http://localhost:4000/';
export const Api = axios.create({
    baseURL: serverApi,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});