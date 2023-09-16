import axios from "axios";
import { TOKEN_KEY } from "../utils/utilStorage";

const token = localStorage.getItem(TOKEN_KEY)

export const $api = axios.create({
  baseURL: "http://localhost:5000/api/login",
  withCredentials: true,

  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
    Authorization: token || ''
  }
});
