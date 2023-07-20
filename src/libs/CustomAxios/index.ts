import axios, { AxiosInstance } from "axios";

export const customAxios: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_HOST,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Authorization: ("Bearer " + localStorage.getItem("token")) as string,
  },
});

export default customAxios;
