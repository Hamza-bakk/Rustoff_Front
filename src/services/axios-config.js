import axios from 'axios';
import Cookies from 'js-cookie';


const API = axios.create({
  baseURL: 'http://127.0.0.1:3000'
});

API.interceptors.request.use(({ headers, ...config }) => ({
  ...config,
  headers: {
    ...headers,
    'Content-Type': 'application/json',
    Authorization: `Bearer ${headers.Authorization ? headers.Authorization : Cookies.get('token')}`,
  },
}));

export default API;
