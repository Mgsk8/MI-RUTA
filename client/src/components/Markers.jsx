import React from "react";
import { Marker } from "react-leaflet";
import IconLocation from "./IconLocation";

const Markers = () =>{
    return(
        <Marker
        position={{lat: 4.6973985, lng: -74.1715412}} icon={IconLocation}
        >

        </Marker>
    )
}

export default Markers;