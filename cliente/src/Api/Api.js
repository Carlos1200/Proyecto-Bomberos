import axios from 'axios';

const baseURL = "http://localhost/Proyecto%20Bomberos/servidor/api";

const Api = axios.create({
  baseURL,
});

// Api.interceptors.request.use(async (config) => {
//   config.withCredentials=true;
// });

// Api.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem("token");
//   if (token) {
//     config.headers["x-token"] = token;
//   }
//   return config;
// });

export default Api;