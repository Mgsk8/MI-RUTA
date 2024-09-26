import { registerPlaceRequest, registerCompanyRequest } from "../api/auth";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import MapView from "../components/MapView";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types'; // Importa PropTypes

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
                    className={`mt-4 w-full py-2 rounded-md ${
                        canClose
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
    const [resultMessage, setResultMessage] = useState('');
    const [isMapPaused, setMapPaused] = useState(false);
    const [isContentVisible, setContentVisible] = useState(true); // Nuevo estado para controlar la visibilidad del contenido

    const handleLocationChange = (location) => {
        console.log("Ubicación actualizada:", location);
        setValue("latitud", location.lat);
        setValue("longitud", location.lng);
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
        setMapPaused(false); // Reanuda el mapa al cerrar la modal de resultado
        setContentVisible(true); // Muestra el contenido nuevamente
    };

    const latitud = watch("latitud");
    const longitud = watch("longitud");

    const googleMapsUrl = latitud && longitud ? `https://www.google.com/maps/place/?q=${latitud},${longitud}` : "#";

    const onSubmit = async (values) => {
        try {
            console.log(values);
            const res = await registerPlaceRequest(values);
            console.log(res);
            const id_negocio = res.data.id;
            const data_consulta = {
                id_negocio: id_negocio,
                nit: values.nit,
                id_afiliado: values.id_afiliado,
            };
            console.log(data_consulta);
            const res2 = await registerCompanyRequest(data_consulta);
            console.log(res2);

            if (res2.status === 200) {
                setResultMessage("¡Negocio registrado exitosamente!");
            } else {
                setResultMessage("Error al registrar el negocio.");
            }
        } catch (error) {
            console.error(error);
            setResultMessage("Error en el proceso de registro.");
        } finally {
            setMapPaused(true); // Pausa el mapa al abrir la modal de resultado
            setResultModalOpen(true); // Abre la modal de resultado
            setContentVisible(false); // Oculta el contenido
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
            {isContentVisible && isModalClosed && ( // Solo muestra el contenido si isContentVisible es verdadero
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
                                    {/* Campos del formulario (sin cambios) */}
                                    <div>
                                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
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
                                        <label htmlFor="informacion" className="block text-sm font-medium text-gray-700">Información</label>
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
                                        <h3 className="block text-sm font-medium text-gray-700">Ubicación GPS</h3>
                                        <div>
                                            <label htmlFor="latitud" className="block text-sm font-medium text-gray-700">Latitud</label>
                                            <div className="mt-1">
                                                <input
                                                    id="latitud"
                                                    name="latitud"
                                                    type="text"
                                                    readOnly
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    {...register("latitud")}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="longitud" className="block text-sm font-medium text-gray-700">Longitud</label>
                                            <div className="mt-1">
                                                <input
                                                    id="longitud"
                                                    name="longitud"
                                                    type="text"
                                                    readOnly
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    {...register("longitud")}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <a
                                            href={googleMapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 hover:underline"
                                        >
                                            Ver en Google Maps
                                        </a>
                                    </div>
                                    {/* id_afiliado */}
                                    <div>
                                        <input
                                            id="id_afiliado"
                                            name="id_afiliado"
                                            type="hidden"
                                            value="2"
                                            {...register("id_afiliado", { required: true })}
                                        />
                                    </div>
                                    {/* Categoria */}
                                    <div>
                                        <input
                                            id="categoria"
                                            name="categoria"
                                            type="hidden"
                                            value="negocio"
                                            {...register("categoria", { required: true })}
                                        />
                                    </div>
                                    {/* Calificación */}
                                    <div>
                                        <input
                                            id="calificacion"
                                            name="calificacion"
                                            type="hidden"
                                            value="0"
                                            {...register("calificacion", { required: true })}
                                        />
                                    </div>
                                    {/* NIT */}
                                    <div>
                                        <label htmlFor="nit" className="block text-sm font-medium text-gray-700">NIT</label>
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
                                    <div className="mt-6">
                                        <button
                                            type="submit"
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Registrar
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="w-1/2 pl-4">
                                <MapView
                                    onLocationChange={handleLocationChange}
                                    isPaused={isMapPaused} // Pasa el estado de pausa del mapa
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}