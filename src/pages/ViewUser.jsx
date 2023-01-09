import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import NavBar from "../components/NavBar";
import datas from "../datas/data.json";

const ViewUser = () => {
    const mapRef = useRef(null);
    const [users, setUsers] = useState();
    const [profile, setProfile] = useState([
        {
            firstName: "toto",
            lastName: "tata",
        },
    ]);

    const [markerId, setMarkerId] = useState(5);
    const center = [-21.115141, 55.536384];
    const zoom = 10;

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/users/${markerId}`)
            .then((res) => {
                setProfile(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    // console.log(userProfile);

    const recenterMap = () => {
        if (mapRef.current) {
            mapRef.current.flyTo(center, zoom);
        }
    };

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/users`)
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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

                    {datas.persons.map((mark) => (
                        <Marker
                            key={mark.id}
                            position={[
                                mark.coordinates[0],
                                mark.coordinates[1],
                            ]}
                            onClick={() => setProfile()}
                        >
                            <Popup>
                                {mark.firstname}
                                <br />
                                {mark.lastname}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </main>
            <footer>
                {profile ? (
                    <>
                        <p>{profile.firstName}</p>

                        <p>{profile.lastName}</p>
                    </>
                ) : (
                    ""
                )}
            </footer>
        </div>
    );
};

export default ViewUser;
