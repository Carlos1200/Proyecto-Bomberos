import axios from 'axios';

const baseURL = "http://localhost/Proyecto-Bomberos/servidor/api";

const Api = axios.create({
  baseURL,
});

export default Api;