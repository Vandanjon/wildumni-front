import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import NavBar from "../components/NavBar";
import PersonalMap from "../components/PersonalMap";
import { MapContainer, TileLayer } from "react-leaflet";

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
            {/* latitude: {position.lat.toFixed(4)}, longitude:{" "}
            {position.lng.toFixed(4)}  */}
            <button onClick={onClick}>locate me</button>
        </p>
    );
}

const ViewUser = () => {
    const { user } = useContext(UserContext);
    const [profile, setProfile] = useState([
        {
            firstName: "toto",
            lastName: "tata",
        },
    ]);

    const [map, setMap] = useState(null);

    const displayMap = useMemo(
        () => (
            <MapContainer center={center} zoom={zoom} ref={setMap}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        ),
        []
    );

    return (
        <div id="UserPage" className="pageContainer">
            <header>
                <NavBar />

                <div>{map ? <DisplayPosition map={map} /> : null}</div>
            </header>

            <main>{displayMap}</main>
            <footer>
                <p>{profile[0].firstName}</p>

                <p>{profile[0].lastName}</p>
            </footer>
        </div>
    );
};

export default ViewUser;
