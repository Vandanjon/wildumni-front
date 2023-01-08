import { useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import NavBar from "../components/NavBar";

const ViewUser = () => {
    const mapRef = useRef(null);
    const [profile, setProfile] = useState([
        {
            firstName: "toto",
            lastName: "tata",
        },
    ]);
    const center = [50, 0];
    const zoom = 10;

    const recenterMap = () => {
        if (mapRef.current) {
            mapRef.current.flyTo(center, zoom);
        }
    };

    return (
        <div id="UserPage" className="pageContainer">
            <header>
                <NavBar />

                <div>
                    <button onClick={recenterMap}>Recenter on me</button>
                </div>
            </header>

            <main>
                <MapContainer center={center} zoom={zoom} ref={mapRef}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </main>
            <footer>
                <p>{profile[0].firstName}</p>

                <p>{profile[0].lastName}</p>
            </footer>
        </div>
    );
};

export default ViewUser;
