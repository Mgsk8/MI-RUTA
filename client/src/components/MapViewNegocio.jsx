import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';

const MapViewNegocio = ({ latitude, longitude, onLocationChange }) => {
    const [currentLocation, setCurrentLocation] = useState({
        lat: latitude || 51.505, 
        lng: longitude || -0.09  
    });

    const ClickHandler = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setCurrentLocation({ lat, lng });
                
                if (onLocationChange) {
                    onLocationChange({ lat, lng });
                }
            },
        });

        return null;
    };

    return (
        <MapContainer center={currentLocation} zoom={20} style={{ height: "400px", width: "100%" }}>
            <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={currentLocation} />
            <ClickHandler />
        </MapContainer>
    );
};

MapViewNegocio.propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    onLocationChange: PropTypes.func,
};

export default MapViewNegocio;