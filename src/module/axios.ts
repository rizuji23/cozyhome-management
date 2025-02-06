import axios from "axios";

export const URL_DEV = "https://apicozy.rlstudio.my.id";
export const URL_PRODUCTION = "https://apicozy.rlstudio.my.id";

export default axios.create({
  baseURL: URL_DEV,
});
