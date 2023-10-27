import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import './Map.css'

export default function Home() {
    const { isLoaded } = useLoadScript({ 
        googleMapsApiKey: "AIzaSyBRSMFPqkV3xbHdhTqXoIJIQI6xfSIGhlc",
    });

    if (!isLoaded) return <div>Loading...</div>;

    return <Map />
} 

function Map({ lat, lng}) {
    const center = useMemo(() => ({ lat: lat, lng: lng }), []);

    return (
        <GoogleMap 
            zoom={10} 
            center={center} 
            mapContainerClassName="map-container"
        >
            <Marker
            position={{lat: lat, lng: lng}}
             />
        </GoogleMap>
    )
}