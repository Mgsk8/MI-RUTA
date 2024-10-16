import { registerPlaceRequest, registerCompanyRequest } from "../api/auth";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import MapView from "../components/MapView";
import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Importa PropTypes
import axios from "axios"; // Importa axios para hacer solicitudes HTTP
import CategorySelect from "../components/CategorySelect.jsx";

// Componente Modal
function Modal({ isOpen, onClose, message, validation }) {
    if (!isOpen) return null;

    const canClose = typeof validation === "function" ? validation() : true;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-md max-w-sm mx-auto z-60">
                <h3 className="text-lg font-semibold">Información Importante</h3>
                <p className="mt-2">{message}</p>
                <button
                    className={`mt-4 w-full py-2 rounded-md ${canClose
                        ? "bg-indigo-600 text-white hover:bg-indigo-500"
                        : "bg-gray-400 text-gray-700 cursor-not-allowed"
                        }`}
                    onClick={canClose ? onClose : null}
                >
                    {canClose ? "Cerrar" : "Completa la información requerida"}
                </button>
            </div>
        </div>
    );
}

// Validación de PropTypes para Modal
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    validation: PropTypes.func,
};


export default function RegistroNegocio() {
    const id_usuario_actual = localStorage.getItem("id_usuario_actual");
    console.log("ID del usuario actual: ", id_usuario_actual);
    const { register, handleSubmit, setValue, watch } = useForm();
    const navigation = [
        { name: "Inicio", href: "/menuAfiliado", current: false },
        { name: "Registrar Negocio", href: "/registerCompany", current: true },
        { name: "Editar Negocio", href: "/editCompany", current: false },
    ];

    const [alertShown, setAlertShown] = useState(false);
    const [isModalOpen, setModalOpen] = useState(true);
    const [isModalClosed, setModalClosed] = useState(false);
    const [isResultModalOpen, setResultModalOpen] = useState(false);
    const [resultMessage, setResultMessage] = useState("");
    //const [isMapPaused, setMapPaused] = useState(false);
    const [isContentVisible, setContentVisible] = useState(true); // Nuevo estado para controlar la visibilidad del contenido

    const [selectedCategories, setSelectedCategories] = useState([]);

  // Actualiza el valor del formulario cada vez que se seleccionan categorías

  const categoriesList = ["Restaurantes", "Tiendas", "Servicios"];

    const handleLocationChange = async (location) => {
        console.log("Ubicación actualizada:", location);
        setValue("latitud", location.lat);
        setValue("longitud", location.lng);

        // Obtener la dirección usando OpenCage
        const address = await reverseGeocode(location.lat, location.lng);
        if (address) {
            // Formatear la dirección utilizando todos los componentes disponibles
            const formattedAddress = [
                address.streetNumber ? `${address.streetNumber} ${address.road}` : address.road,
                address.neighborhood,
                address.city,
                address.state,
                address.postcode,
                address.county,
                address.intersection ? `Entre ${address.intersection}` : '', // Agregar intersección si existe
                address.country
            ]
                .filter(Boolean) // Eliminar valores vacíos
                .join(', '); // Unir todos los componentes con coma

            // Asigna la dirección formateada al campo
            setValue("direccion_automatica", formattedAddress);

            // También puedes guardar otros componentes si es necesario
            setValue("neighborhood", address.neighborhood);
            setValue("county", address.county);
            setValue("countryCode", address.countryCode);
            setValue("confidence", address.confidence);
            setValue("geometry", address.geometry); // Para acceder a las coordenadas si es necesario
        }
    };

    const reverseGeocode = async (lat, lon) => {
        try {
            const response = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
                params: {
                    key: "8eeb1d3946404f6f88898afb4adf287c", // Tu clave API de OpenCage
                    q: `${lat},${lon}`,
                    no_annotations: 1,
                    pretty: 1
                },
            });

            const result = response.data.results[0];
            if (result) {
                const components = result.components;

                return {
                    houseNumber: components.house_number || '',
                    streetNumber: components.house_number || '', // Número de la calle
                    road: components.road || '', // Calle principal
                    neighborhood: components.neighborhood || '', // Barrio
                    suburb: components.suburb || '',
                    city: components.city || components.town || components.village || '', // Ciudad
                    state: components.state || '', // Estado (si aplica)
                    postcode: components.postcode || '', // Código postal
                    country: components.country || '', // País
                    intersection: components.intersection || '', // Intersección (si aplica)
                    county: components.county || '', // Condado
                    administrativeArea: components.administrative_area || '',
                    formatted: result.formatted || '', // Dirección formateada completa
                    confidence: result.confidence || '', // Confianza de la respuesta
                    geometry: result.geometry || {}, // Geometría (coordenadas)
                };
            }
        } catch (error) {
            console.error("Error al obtener la dirección:", error);
        }
        return null; // Devuelve null si no se obtiene una dirección
    };

    const [selectedImages, setSelectedImages] = useState([]);

    // Función para manejar la carga de múltiples imágenes
    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files); // Convertir los archivos en un array
        setSelectedImages((prevImages) => [...prevImages, ...files]); // Añadir nuevas imágenes al estado
    };

    // Función para eliminar una imagen seleccionada
    const handleRemoveImage = (indexToRemove) => {
        setSelectedImages((prevImages) =>
            prevImages.filter((_, index) => index !== indexToRemove) // Filtrar la imagen que se desea eliminar
        );
    };

    const uploadImagesToCloudinary = async (images) => {
        const uploadPreset = 'ml_default'; // Asegúrate de usar tu upload preset
        const cloudName = "dwionpfqj"; // Corrige el nombre del cloud si es necesario
    
        const uploadPromises = images.map(async (image) => {
            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', uploadPreset);
    
            try {
                const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
                return response.data.secure_url;
            } catch (error) {
                console.error("Error al subir la imagen:", error.response?.data || error.message);
                throw error; // Lanza el error para manejarlo más tarde
            }
        });
    
        // Espera a que todas las promesas se resuelvan y convierte las URLs a una cadena separada por comas
        const urls = await Promise.all(uploadPromises);
        return urls.join(', '); // Devuelve las URLs como una cadena separada por comas
    };   

    useEffect(() => {
        if (!alertShown) {
            setModalOpen(true);
            setAlertShown(true);
        }
    }, [alertShown]);

    const handleModalClose = () => {
        setModalOpen(false);
        setModalClosed(true);
    };

    const handleResultModalClose = () => {
        setResultModalOpen(false);
        //setMapPaused(false); // Reanuda el mapa al cerrar la modal de resultado
        setContentVisible(true); // Muestra el contenido nuevamente
        window.location.reload();
    };

    const latitud = watch("latitud");
    const longitud = watch("longitud");
    const direccion = watch("direccion_automatica");
    console.log("dirección = ", direccion);

    const googleMapsUrl =
        latitud && longitud
            ? `https://www.google.com/maps/place/?q=${latitud},${longitud}`
            : "#";

    const onSubmit = async (values) => {
        values.categorias = selectedCategories.join(", "); // Agregar las categorías seleccionadas al formulario
        values.images = await uploadImagesToCloudinary(selectedImages);
    
    try {
        console.log(values); 
        const res = await registerPlaceRequest(values);
        const id_negocio = res.data.id;
        const data_consulta = {
            id_negocio: id_negocio,
            nit: values.nit,
            id_afiliado: values.id_afiliado,
        };
        const res2 = await registerCompanyRequest(data_consulta);

        if (res2.status === 200) {
            setResultMessage("¡Negocio registrado exitosamente!");
        } else {
            setResultMessage("Error al registrar el negocio.");
        }
    } catch (error) {
        console.error(error);
        setResultMessage("Error en el proceso de registro.");
    } finally {
        setResultModalOpen(true); // Abrir modal con resultado
        setContentVisible(false); // Ocultar contenido
    }
};


    return (
        <>
            <Navbar navigation={navigation} logo="/Image/logoblanco.png" />
            <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                message="Asegúrate de estar en la ubicación del negocio al registrarlo."
            />
            <Modal
                isOpen={isResultModalOpen}
                onClose={handleResultModalClose}
                message={resultMessage}
            />
            {isContentVisible &&
                isModalClosed && ( // Solo muestra el contenido si isContentVisible es verdadero
                    <div className="bg-[url('../image/fondoRegisterCompany.jpg')] bg-cover bg-center min-h-screen w-full relative">
                        <div className="flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8">
                            <h2 className="mt-0 text-center text-3xl font-extrabold text-gray-900 mb-4 bg-[rgba(255,255,255,0.9)] p-4 rounded-md w-1/2">
                                Registrar Negocio
                            </h2>
                            <div className="flex flex-row w-full max-w-6xl">
                                <div className="w-1/2 pr-4 flex flex-col">
                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        method="POST"
                                        className="mt-8 space-y-6 bg-[rgba(255,255,255,0.9)] p-8 shadow-md rounded-lg flex-grow"
                                    >
                                        {/* Campos del formulario*/}
                                        <div>
                                            <label
                                                htmlFor="nombre"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Nombre
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    id="nombre"
                                                    name="nombre"
                                                    type="text"
                                                    required
                                                    autoComplete="given-name"
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    {...register("nombre", { required: true })}
                                                />
                                            </div>
                                        </div>
                                        {/* Información */}
                                        <div>
                                            <label
                                                htmlFor="informacion"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Información
                                            </label>
                                            <div className="mt-1">
                                                <textarea
                                                    id="informacion"
                                                    name="informacion"
                                                    required
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    {...register("informacion", { required: true })}
                                                />
                                            </div>
                                        </div>
                                        {/* Ubicación */}
                                        <div>
                                            <h3 className="block text-sm font-medium text-gray-700">
                                                Ubicación GPS
                                            </h3>
                                            <div>
                                                <label
                                                    htmlFor="latitud"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Latitud
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        id="latitud"
                                                        name="latitud"
                                                        type="text"
                                                        readOnly
                                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400"
                                                        {...register("latitud")}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="longitud"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Longitud
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        id="longitud"
                                                        name="longitud"
                                                        type="text"
                                                        readOnly
                                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400"
                                                        {...register("longitud")}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="direccion"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Dirección Automatica
                                                </label>
                                                <div className="mt-1">
                                                    <textarea
                                                        id="direccion_automatica"
                                                        name="direccion_automatica"
                                                        type="text"
                                                        readOnly
                                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400"
                                                        {...register("direccion_automatica")}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="direccion"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Dirección Manual
                                                </label>
                                                <div className="mt-1">
                                                    <textarea
                                                        id="direccion_manual"
                                                        name="direccion_manual"
                                                        type="text"
                                                        
                                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400"
                                                        {...register("direccion_manual")}
                                                    />
                                                </div>
                                            </div>
                                            {/* id_afiliado */}
                                            <div>
                                                <input
                                                    id="id_afiliado"
                                                    name="id_afiliado"
                                                    type="hidden"
                                                    //value="2"
                                                    value={id_usuario_actual}
                                                    {...register("id_afiliado", { required: true })}
                                                />
                                            </div>
                                            {/* calificacion */}
                                            <div>
                                                <input
                                                    id="calificacion"
                                                    name="calificacion"
                                                    type="hidden"
                                                    value="0"
                                                    {...register("calificacion", { required: true })}
                                                />
                                            </div>
                                            {/* tipo_lugar */}
                                            <div>
                                                <input
                                                    id="tipo_lugar"
                                                    name="tipo_lugar"
                                                    type="hidden"
                                                    value="negocio"
                                                    {...register("tipo_lugar", { required: true })}
                                                />
                                            </div>
                                        </div>
                                         {/* Componente de selección de categorías */}
                                         <div>
                                            <label className="block text-gray-700">Categorías del negocio:</label>
                                            <CategorySelect
                                                id="categorias"
                                                name="categorias"
                                                categories={categoriesList}
                                                selectedCategories={selectedCategories}
                                                setSelectedCategories={setSelectedCategories}
                                            />
                                        </div>
                                        {/* NIT */}
                                        <div>
                                            <label
                                                htmlFor="nit"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                NIT
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    id="nit"
                                                    name="nit"
                                                    type="text"
                                                    required
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    {...register("nit", { required: true })}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700">
                    Subir imágenes del negocio (opcional)
                </label>
                <input
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple  // Permitir la selección de múltiples archivos
                    onChange={handleImageUpload}  // Manejador para la carga de imágenes
                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                />
                {selectedImages.length > 0 && (
                    <div className="mt-2">
                        <p>Imágenes seleccionadas:</p>
                        <ul>
                            {selectedImages.map((image, index) => (
                                <li key={index} className="flex items-center justify-between">
                                    {image.name}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}  // Manejador para eliminar una imagen
                                        className="text-red-500 ml-2"
                                    >
                                        Quitar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
                                        {/* Botón de registro */}
                                        <div>
                                            <button
                                                type="submit"
                                                className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Registrar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="w-1/2">
                                <MapView
                                    onLocationChange={handleLocationChange}
                                    initialPosition={{ lat: 0, lng: 0 }}
                                    zoom={15}
                                />
                                <div className="bg-[rgba(255,255,255,0.8)] p-4 rounded-md shadow-md mt-4">
                                    <h3 className="text-lg font-semibold mb-2">Vista previa en Google Maps</h3>
                                    <a
                                        href={googleMapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 hover:underline"
                                    >
                                        Ver en Google Maps
                                    </a>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                )}
        </>
    );
}
