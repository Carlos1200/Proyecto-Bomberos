import axios from 'axios';

const baseURL = "http://localhost/Proyecto%20Bomberos/servidor/api";

const Api = axios.create({
  baseURL,
});

export default Api;