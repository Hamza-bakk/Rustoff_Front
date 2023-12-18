import axios from 'axios';
import Cookies from 'js-cookie';


const API = axios.create({
  baseURL: 'https://rustoffback-d3677a58098b.herokuapp.com'
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
