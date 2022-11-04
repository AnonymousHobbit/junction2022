import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const Map = ({ coordinates, locations }) => {
    
    const [position, setPosition] = useState(coordinates);

    const handleClick = (e) => {
        const { lat, lng } = e.latlng;
        setPosition(e.latlng);
    }

    useEffect(() => {
        (async function init() {
            delete L.Icon.Default.prototype._getIconUrl;

            L.Icon.Default.mergeOptions({
                iconRetinaUrl: iconRetinaUrl.src,
                iconUrl: iconUrl.src,
                shadowUrl: shadowUrl.src,
            });
        })();
    }, []);

    // loop over locations
    
    return (
        <MapContainer center={coordinates} zoom={13} scrollWheelZoom={false} style={{ height: 400, width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            // loop over locations and create marker
            {Object.keys(locations).map((key) => (
            <Marker position={locations[key]}>
                <Popup position={locations[key]}>
                    Current location: <pre>{JSON.stringify(locations[key], null, 2)}</pre>
                </Popup>
            </Marker>
            ))}

            {position && <Marker position={position} draggable={true} eventHandlers={{
                click: (e) => {
                    setPosition(e.latlng);
                },
            }}>
                <Popup position={position}>
                    Current location: <pre>{JSON.stringify(position, null, 2)}</pre>
                </Popup>
            </Marker>}
        </MapContainer>
    )
}

export default Map