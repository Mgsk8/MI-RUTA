import axios from 'axios'

const API = 'http://localhost:3000';

export const registerUserRequest = user => axios.post(`${API}/usuarios`, user);
export const registerClientRequest = user => axios.post(`${API}/clientes`, user);
export const registerAfiRequest = user => axios.post(`${API}/afiliados`, user);
export const loginRequest = user => axios.get(`${API}/usuarios`, user);