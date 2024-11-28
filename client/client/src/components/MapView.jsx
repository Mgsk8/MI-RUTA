import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Markers from "./Markers";
import PropTypes from 'prop-types'; // Importa PropTypes

// Componente para mover el mapa cuando cambie la ubicación
const ChangeMapView = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, 13); // Mueve el mapa a la nueva ubicación con zoom 13
        }
    }, [center, map]);
    return null;
};

// Define la validación de props para ChangeMapView
ChangeMapView.propTypes = {
    center: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
    }).isRequired, // Asegura que center sea obligatorio
};

const MapView = ({ onLocationChange }) => {
    const [state, setState] = useState({
        zoom: 20,
        currentLocation: null // Deja la ubicación vacía inicialmente
    });

    useEffect(() => {
        // Solicitar la ubicación cada vez que se renderice la vista
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const newLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                console.log("Posición obtenida:", newLocation);

                // Actualiza el estado con la nueva ubicación cada vez
                setState((prevState) => ({
                    ...prevState,
                    currentLocation: newLocation
                }));

                // Llama a la función onLocationChange para actualizar el formulario
                if (onLocationChange) {
                    onLocationChange(newLocation);
                }

                console.log("Estado actualizado:", newLocation);
            },
            (error) => {
                console.error("Error al obtener la ubicación:", error);
            },
            {
                enableHighAccuracy: true,
            }
        );
    }, []); // Ejecuta al montar el componente

    // Imprime el estado para verificar antes de renderizar el mapa
    console.log("Estado actual antes de renderizar:", state);

    return (
        state.currentLocation ? (
            <MapContainer center={state.currentLocation} zoom={state.zoom} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <ChangeMapView center={state.currentLocation} />
                {/* Pasa la ubicación actual al componente Markers */}
                <Markers currentLocation={state.currentLocation} />
            </MapContainer>
        ) : (
            <div>Cargando mapa...</div>
        )
    );
};

// Define la validación de props para MapView
MapView.propTypes = {
    onLocationChange: PropTypes.func, // onLocationChange es opcional
};

export default MapView;