import { useEffect, useRef, useState, useContext } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import * as L from "leaflet";
import axios from "axios";

import NavBar from "../components/NavBar";
import { UserContext } from "../contexts/UserContext";

const ViewUser = () => {
    const [users, setUsers] = useState();
    const [profile, setProfile] = useState([]);
    const [loggedUser, setLoggedUser] = useState([]);
    const [center, setCenter] = useState();

    const { user } = useContext(UserContext);
    const userId = useContext(UserContext)?.user?.id;

    const mapRef = useRef(null);

    const zoom = 10;

    const redIcon = new L.Icon({
        iconUrl:
            "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    });

    const blueIcon = new L.Icon({
        iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
        shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    });

    const recenterMap = () => {
        if (mapRef.current) {
            mapRef.current.flyTo(center, zoom);
        }
    };

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`)
            .then((res) => {
                setLoggedUser(res.data);
                setCenter([
                    res.data.address.latitude,
                    res.data.address.longitude,
                ]);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/users`)
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => console.log(err));
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
                {users && loggedUser && center ? (
                    <MapContainer center={center} zoom={zoom} ref={mapRef}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {users.map((user) => {
                            let icon = blueIcon;
                            if (loggedUser.id === user.id) {
                                icon = redIcon;
                            }

                            return (
                                <Marker
                                    key={user.id}
                                    position={[
                                        parseFloat(user.address.latitude),
                                        parseFloat(user.address.longitude),
                                    ]}
                                    icon={icon}
                                    onClick={() => setProfile()}
                                >
                                    <Popup>
                                        {user.firstName}
                                        <br />
                                        {user.email}
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </MapContainer>
                ) : (
                    <>
                        <p>Datas loading</p>
                        <p>please wait a bit</p>
                    </>
                )}
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
