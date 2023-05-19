import axios from "axios";

export const service = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  timeout: 20000
});
