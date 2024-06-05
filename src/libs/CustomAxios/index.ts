import axios, { AxiosInstance } from "axios";

const customAxios: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_HOST,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Authorization: ("Bearer " + localStorage.getItem("token")) as string
  }
});

// customAxios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 404) {
//       window.location.href = "/NotFoundPage";
//     }
//     return Promise.reject(error);
//   }
// );

export default customAxios;
