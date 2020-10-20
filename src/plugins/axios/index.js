import axios from "axios";
import interceptors from "./interceptors";

console.log("baseURL :>> ", process.env.VUE_APP_API_KEY);

const instance = axios.create({
	baseURL: process.env.VUE_APP_API_URL,
});

interceptors(instance);

export default instance;
