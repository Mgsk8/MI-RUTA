import { Marker } from "react-leaflet";
import IconLocation from "./IconLocation";
import PropTypes from 'prop-types';

const Markers = ({ currentLocation }) => {
    return (
        // Asegúrate de que currentLocation esté disponible antes de renderizar el Marker
        currentLocation.lat && currentLocation.lng ? (
            <Marker
                position={currentLocation} // 
                icon={IconLocation}        // Usa tu icono personalizado
            >
            </Marker>
        ) : null // No renderiza nada si no tiene la ubicación
    );
};

// Definición de tipos para las props usando prop-types
Markers.propTypes = {
    currentLocation: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired
    }).isRequired
};

export default Markers;