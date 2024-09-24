import React, { useState } from "react";
import { MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import Markers from "./Markers";

const MapView = () => {

    const [state, setState] = useState({
        currentLocation: {lat: '4.6973985', lng: '-74.1715412'},
        zoom: 13
    })
    return (
        <MapContainer center={state.currentLocation} zoom={state.zoom} style={{ height: "100%", width: "100%" }}>
            <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
           <Markers></Markers>
        </MapContainer>
    );
};

export default MapView;
