import axios from 'axios';

const baseURL = "http://localhost/Proyecto%20Bomberos/servidor/api";

const Api = axios.create({
  baseURL,
});

<<<<<<< HEAD
// Api.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem("token");
//   if (token) {
//     config.headers["x-token"] = token;
//   }
//   return config;
// });

=======
>>>>>>> main
export default Api;