import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types'; // Importa PropTypes

const MapView = ({ onLocationChange }) => {
    // Estado para almacenar la ubicación actual
    const [currentLocation, setCurrentLocation] = useState(null);

    // Obtener la ubicación actual solo una vez
    useEffect(() => {
        // Solo solicitar la ubicación si currentLocation es null
        if (!currentLocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const initialLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    setCurrentLocation(initialLocation);

                    // Llama a la función onLocationChange para actualizar la ubicación en el componente padre
                    if (onLocationChange) {
                        onLocationChange(initialLocation);
                    }
                },
                (error) => {
                    console.error("Error al obtener la ubicación:", error);
                    // En caso de error, establecer una ubicación predeterminada
                    const defaultLocation = { lat: 51.505, lng: -0.09 }; // Londres como ubicación predeterminada
                    setCurrentLocation(defaultLocation);
                    if (onLocationChange) {
                        onLocationChange(defaultLocation);
                    }
                },
                { enableHighAccuracy: true }
            );
        }
    }, [currentLocation, onLocationChange]); // Agrega currentLocation como dependencia

    // Manejador para capturar eventos de clic en el mapa
    const ClickHandler = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setCurrentLocation({ lat, lng }); // Actualiza la ubicación del marcador

                // Actualizar la ubicación al hacer clic en el mapa
                if (onLocationChange) {
                    onLocationChange({ lat, lng });
                }
            },
        });

        return null;
    };

    // Si la ubicación aún no está disponible, muestra un mensaje de carga
    if (!currentLocation) {
        return <div>Cargando mapa...</div>;
    }

    return (
        <MapContainer center={currentLocation} zoom={13} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={currentLocation} />
            <ClickHandler /> {/* Este componente detecta los clics en el mapa */}
        </MapContainer>
    );
};

// Agregar validación de PropTypes
MapView.propTypes = {
    onLocationChange: PropTypes.func.isRequired, // onLocationChange debe ser una función requerida
};

export default MapView;
