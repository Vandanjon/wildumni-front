import React, {
    useState,
    useRef,
    useMemo,
    useCallback,
    useEffect,
} from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const center = [51.505, -0.09];
const zoom = 13;

function DisplayPosition({ map }) {
    const [position, setPosition] = useState(() => map.getCenter());

    const onClick = useCallback(() => {
        map.setView(center, zoom);
    }, [map]);

    const onMove = useCallback(() => {
        setPosition(map.getCenter());
    }, [map]);

    useEffect(() => {
        map.on("move", onMove);
        return () => {
            map.off("move", onMove);
        };
    }, [map, onMove]);

    return (
        <p>
            latitude: {position.lat.toFixed(4)}, longitude:{" "}
            {position.lng.toFixed(4)} <button onClick={onClick}>reset</button>
        </p>
    );
}

function PersonalMap() {
    const [map, setMap] = useState(null);

    const displayMap = useMemo(
        () => (
            <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom={false}
                ref={setMap}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        ),
        []
    );

    return (
        <div>
            {map ? <DisplayPosition map={map} /> : null}
            {displayMap}
        </div>
    );
}

export default PersonalMap;
