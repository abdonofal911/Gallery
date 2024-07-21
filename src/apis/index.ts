import axios from 'axios';

export const BASE_URL = 'https://api.pexels.com/v1/';
export const API_KEY = '3dfV3jYUecoVF7wpB2CRWKW1lIdMSkJnhBxkwFRU5zlQU7ja3C5mJ7OZ';
export const AUTH_URL = 'https://identitytoolkit.googleapis.com/v1';
export const SERVER_KEY = 'AIzaSyDP3B_dQ8DMQC7Vvwe3ScfDPBlQSeItshs';
export const API = axios.create({ baseURL: BASE_URL });
