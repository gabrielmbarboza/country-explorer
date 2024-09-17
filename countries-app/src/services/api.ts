import axios from 'axios';

export const Api = axios.create({
  baseURL: 'http://0.0.0.0:3000/',
});
