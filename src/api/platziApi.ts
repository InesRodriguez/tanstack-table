import axios from "axios";

export const platziApi =  axios.create({
    baseURL: 'https://api.escuelajs.co/api/v1',
    headers:{}
});