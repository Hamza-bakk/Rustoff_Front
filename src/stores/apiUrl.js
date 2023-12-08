/* eslint-disable no-undef */
// export const API_URL = "http://127.0.0.1:3000";
import urljoin from 'url-join';

const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/'
    : 'https://rustoffback-d3677a58098b.herokuapp.com/';

const finalUrl = urljoin(API_URL, '/');
export default finalUrl;
