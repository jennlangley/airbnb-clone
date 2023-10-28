import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import './Map.css'

export default function Home() {
    const { isLoaded } = useLoadScript({ 
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    });

    if (!isLoaded) return <div>Loading...</div>;

    return <Map />
} 

function Map({ lat, lng}) {
    const center = useMemo(() => ({ lat: 20, lng: 40 }), []);

    return (
        <GoogleMap 
            zoom={10} 
            center={center} 
            mapContainerClassName="map-container"
        >
            <Marker
            position={{lat: 20, lng: 40}}
             />
        </GoogleMap>
    )
}