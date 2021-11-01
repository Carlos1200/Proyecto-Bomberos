import axios from 'axios';
import env from 'react-dotenv'

const baseURL = env.BASE_URL;
const APIKEY=env.API_KEY;

const Api = axios.create({
  baseURL,
  params:{
    token:APIKEY
  },
  withCredentials:true
});

export default Api;