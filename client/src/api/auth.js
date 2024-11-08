import axios from 'axios' // Importa la biblioteca Axios para realizar solicitudes HTTP

const API = 'http://localhost:3000';// Define la URL base de la API local

//-------- CONSULTAS USERS ---------
export const getUsuariosRequest = id_usuario => axios.get(`${API}/usuarios/${id_usuario}`)
export const getUsuarioRequest = axios.get(`${API}/usuarios`)
export const registerUserRequest = user => axios.post(`${API}/usuarios`, user);

//-------- CONSULTAS CLIENTS ---------
export const registerClientRequest = user => axios.post(`${API}/clientes`, user);

//-------- CONSULTAS AFFILIATES ---------
export const registerAfiRequest = user => axios.post(`${API}/afiliados`, user);

//-------- CONSULTAS LOGIN ---------
export const loginRequest = user => axios.post(`${API}/login`, user)

//-------- CONSULTAS PLACES ---------
export const registerPlaceRequest = place => axios.post(`${API}/lugares`, place)
export const getNegocios = user => axios.get(`${API}/lugares`, user)
export const deleteNegocios = (id_lugar) => axios.delete(`${API}/lugares/${id_lugar}`);
export const getNegocio = (id_negocio)=> axios.get(`${API}/lugares/${id_negocio}`)
export const getNegocio_ = (id_lugar)=> axios.get(`${API}/lugares/${id_lugar}`)
export const actualizarNegocio = (id_negocio, values) => axios.patch(`${API}/lugares/${id_negocio}`, values);
export const infoLugar = (id) => axios.get(`${API}/lugares/${id}`);

//-------- CONSULTAS COMPANYS ---------
export const registerCompanyRequest = place => axios.post(`${API}/negocios`, place)
export const getNegocio_afiliado = (id_usuario)=> axios.get(`${API}/negocios/${id_usuario}`)

//-------- CONSULTAS REVIEWS ---------
export const getPlaceReviews = (id_lugar) => axios.get(`${API}/reviews/${id_lugar}`)
export const getPlaceUserReview = (id_lugar, id_usuario) => axios.get(`${API}/reviews/${id_lugar}/${id_usuario}`)
export const postReview = (review, id_lugar) => axios.post(`${API}/reviews/${id_lugar}`, review)
export const updateReview = (review, id_lugar) => axios.patch(`${API}/reviews/${id_lugar}`, review)
export const deleteReview = (reviewData, id_lugar) => axios.delete(`${API}/reviews/${id_lugar}`, {
    data: reviewData // Esto asegura que `id_usuario` esté en el body
});
