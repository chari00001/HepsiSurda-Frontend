import axios from "axios";

const instance = axios.create({
  baseURL: "localhost:3001/",
  timeout: 30000,
});

export default instance;
