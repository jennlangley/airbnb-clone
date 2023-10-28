import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import './Map.css'

export default function Home({ lat, lng }) {
    const { isLoaded } = useLoadScript({ 
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    });

    if (!isLoaded) return <div>Loading...</div>;

    return <Map lat={lat} lng={lng} />
} 

function Map({ lat, lng }) {

    const center = useMemo(() => ({ lat: +lat, lng: +lng }), []);

    return (
        <GoogleMap 
            zoom={16} 
            center={center} 
            mapContainerClassName="map-container"
        >
            <Marker
            position={{lat: +lat, lng: +lng}}
             />
        </GoogleMap>
    )
}