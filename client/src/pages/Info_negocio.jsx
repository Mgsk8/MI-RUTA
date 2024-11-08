import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { infoLugar } from "../api/auth";
import Navbar from "../components/Navbar";
import MapViewNegocio from "../components/MapViewNegocio";

const StarRating = ({ rating, setRating }) => {
    const handleClick = (index) => {
        setRating(index + 1);
    };

    return (
        <div className="flex space-x-1">
            {[...Array(5)].map((_, index) => (
                <svg
                    key={index}
                    onClick={() => handleClick(index)}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-6 h-6 cursor-pointer ${index < rating ? "text-yellow-500" : "text-gray-300"}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 15l-5.293 2.788 1.014-5.93-4.301-4.1 5.944-.875L10 1l2.636 5.883 5.944.875-4.3 4.1 1.014 5.93L10 15z"
                        clipRule="evenodd"
                    />
                </svg>
            ))}
        </div>
    );
};

export default function InfoNegocio() {
    const { id } = useParams();
    const [businessData, setBusinessData] = useState(null);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const navigation = [
        { name: "Menú", href: "/menuCliente", current: false },
        { name: "Información de Negocio", href: "/infoNegocio", current: true }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await infoLugar(id);
                setBusinessData(res.data[0]);
            } catch (error) {
                console.error("Error fetching business data:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmitReview = () => {
        console.log("Reseña:", review, "Calificación:", rating);
        setShowAlert(true); // Muestra el aviso flotante

        // Oculta el aviso después de 3 segundos
        setTimeout(() => setShowAlert(false), 3000);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: businessData.nombre,
                text: `¡Mira este lugar! ${businessData.nombre}`,
                url: window.location.href,
            })
            .then(() => console.log("Compartido exitosamente"))
            .catch((error) => console.error("Error al compartir:", error));
        } else {
            alert("La función de compartir no es compatible con este navegador.");
        }
    };

    if (!businessData || businessData.latitud === undefined || businessData.longitud === undefined) {
        return <p>Cargando...</p>;
    }

    return (
        <>
            <Navbar navigation={navigation} logo="/Image/logoblanco.png" />

            <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4 md:p-8">
                <div className="max-w-6xl w-full bg-white shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row">
                    
                    {/* Columna Izquierda - Información del lugar */}
                    <div className="w-full md:w-1/2 p-4 md:p-8 space-y-4 md:space-y-8">
                        <div className="h-48 md:h-64 bg-gray-200 relative mb-4 md:mb-6">
                            <img
                                src={businessData.images}
                                alt={businessData.nombre}
                                className="w-full h-full object-cover opacity-90"
                            />
                            <div className="absolute bottom-4 left-4 text-white font-semibold text-lg md:text-2xl">
                                {businessData.nombre}
                            </div>
                        </div>

                        <div>
                            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 md:mb-4">
                                {businessData.nombre}
                            </h1>
                            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                                {businessData.informacion}
                            </p>
                        </div>

                        {/* Sección para la calificación y reseña */}
                        <div className="space-y-4 mt-6 md:mt-8">
                            <h3 className="text-lg md:text-xl font-semibold">Añadir Reseña y Calificación</h3>

                            <StarRating rating={rating} setRating={setRating} />

                            <textarea
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder="Escribe tu reseña aquí..."
                                className="border p-2 mt-2 rounded w-full"
                            />

                            <div className="flex space-x-4 mt-4">
                                <button
                                    onClick={handleSubmitReview}
                                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded w-full md:w-auto"
                                >
                                    Enviar Reseña
                                </button>

                                <button
                                    onClick={handleShare}
                                    className="mt-4 bg-green-600 text-white py-2 px-4 rounded w-full md:w-auto"
                                >
                                    Compartir Negocio
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha - Mapa */}
                    <div className="w-full md:w-1/2 h-64 md:h-auto">
                        <MapViewNegocio 
                            latitude={businessData.latitud} 
                            longitude={businessData.longitud} 
                            onLocationChange={(location) => console.log("Nueva ubicación:", location)} 
                        />
                    </div>
                </div>

                {/* Aviso flotante */}
                {showAlert && (
                    <div id="alert-3" className="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                        ¡Gracias por tu reseña!
                        <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span class="sr-only">Info</span>
                    </div>
                )}
            </div>
        </>
    );
}
