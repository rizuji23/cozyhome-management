import axios from "axios";

export const URL_DEV = 'http://localhost:8000';
export const URL_PRODUCTION = 'https://cozyhome.api.weworks.ink'

export default axios.create({
    baseURL: URL_DEV
});