import L from 'leaflet';
import iconUrl from '../assets/venue_location_icon.svg'; // Asegúrate de que esta ruta sea correcta

const IconLocation = L.icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconUrl,
    iconAnchor: [17.5, 35], 
    iconSize: [40, 40],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    className: "leaflet-venue-icon",
});

export default IconLocation;
