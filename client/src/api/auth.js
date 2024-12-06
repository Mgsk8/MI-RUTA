import axios from "axios"; // Importa la biblioteca Axios para realizar solicitudes HTTP

const API = "https://mi-ruta-t9ce.onrender.com"; // Define la URL base de la API local

// Configuración de Axios
const axiosInstance = axios.create({
  baseURL: API,  // Base URL de la API
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Asegura que el token se agregue en cada solicitud
  },
  withCredentials: true,  // Permite que las cookies sean enviadas en solicitudes CORS
});

// Funciones para las solicitudes

//-------- CONSULTAS USERS ---------
export const getUsuariosRequest = (id_usuario) => axiosInstance.get(`/usuarios/${id_usuario}`);
export const getUsuarioRequest = () => axiosInstance.get(`/usuarios`);
export const registerUserRequest = (user) => axiosInstance.post(`/usuarios`, user);
export const updateUserRequest = (user) => axiosInstance.patch(`/usuarios`, user);
export const deleteUserRequest = (user) => axiosInstance.delete(`/usuarios`, user);

//-------- CONSULTAS CLIENTS ---------
export const registerClientRequest = (user) => axiosInstance.post(`/clientes`, user);

//-------- CONSULTAS AFFILIATES ---------
export const registerAfiRequest = (user) => axiosInstance.post(`/afiliados`, user);

//-------- CONSULTAS LOGIN ---------
export const loginRequest = (user) => axiosInstance.post(`/login`, user);

//-------- CONSULTAS PLACES ---------
export const registerPlaceRequest = (place) => axiosInstance.post(`/lugares`, place);
export const getNegocios = (user) => axiosInstance.get(`/lugares`, { params: user });
export const deleteNegocios = (id_lugar) => axiosInstance.delete(`/lugares/${id_lugar}`);
export const getNegocio = (id_negocio) => axiosInstance.get(`/lugares/${id_negocio}`);
export const getNegocio_ = (id_lugar) => axiosInstance.get(`/lugares/${id_lugar}`);
export const actualizarNegocio = (id_negocio, values) => axiosInstance.patch(`/lugares/${id_negocio}`, values);
export const infoLugar = (id) => axiosInstance.get(`/lugares/${id}`);

//-------- CONSULTAS COMPANYS ---------
export const registerCompanyRequest = (place) => axiosInstance.post(`/negocios`, place);
export const getNegocio_afiliado = (id_usuario) => axiosInstance.get(`/negocios/${id_usuario}`);

//-------- CONSULTAS REVIEWS ---------
export const getPlaceReviews = (id_lugar) => axiosInstance.get(`/reviews/${id_lugar}`);
export const getPlaceUserReview = (id_lugar, id_usuario) => axiosInstance.get(`/reviews/${id_lugar}/${id_usuario}`);
export const postReview = (review, id_lugar) => axiosInstance.post(`/reviews/${id_lugar}`, review);
export const updateReview = (review, id_lugar) => axiosInstance.patch(`/reviews/${id_lugar}`, review);
export const deleteReview = (reviewData, id_lugar) => axiosInstance.delete(`/reviews/${id_lugar}`, { data: reviewData });
