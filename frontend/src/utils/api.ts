import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:4000/',
  withCredentials: true
});

api.interceptors.request.use(
  function (config) {
    config.headers.authorization = localStorage.getItem("token");
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

export default api;