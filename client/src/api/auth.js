import axios from 'axios' // Importa la biblioteca Axios para realizar solicitudes HTTP

const API = 'http://localhost:3000';// Define la URL base de la API local


export const registerUserRequest = user => axios.post(`${API}/usuarios`, user);
export const registerClientRequest = user => axios.post(`${API}/clientes`, user);
export const registerAfiRequest = user => axios.post(`${API}/afiliados`, user);
export const loginRequest = user => axios.post(`${API}/login`, user)
export const registerPlaceRequest = place => axios.post(`${API}/lugares`, place)
export const registerCompanyRequest = place => axios.post(`${API}/negocios`, place)
export const getNegocios = user => axios.get(`${API}/lugares`, user)
export const deleteNegocios = (id_lugar) => axios.delete(`${API}/lugares/${id_lugar}`);
export const getNegocio = (id_negocio)=> axios.get(`${API}/lugares/${id_negocio}`)
export const getNegocio_ = (id_lugar)=> axios.get(`${API}/lugares/${id_lugar}`)
export const getNegocio_afiliado = (id_usuario)=> axios.get(`${API}/negocios/${id_usuario}`)
export const actualizarNegocio = (id_negocio, values) => axios.patch(`${API}/lugares/${id_negocio}`, values);
export const infoLugar = (id) => axios.get(`${API}/lugares/${id}`);