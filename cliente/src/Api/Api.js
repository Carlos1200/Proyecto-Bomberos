import axios from 'axios';
import env from 'react-dotenv'

const baseURL = env.BASE_URL;

const Api = axios.create({
  baseURL,
});

// axios.interceptors.request.use(function (config) {
//   config.params={
//     token:APIKEY
//   }

//   config.withCredentials="true"

//   return config;
// })

export default Api;