import axios from "axios";
import { useEffect, useRef, useState, useContext } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import NavBar from "../components/NavBar";
import datas from "../datas/data.json";
import { UserContext } from "../contexts/UserContext";
import * as L from "leaflet";

const ViewUser = () => {
    const mapRef = useRef(null);
    const [users, setUsers] = useState();
    const [profile, setProfile] = useState([
        {
            firstName: "toto",
            lastName: "tata",
        },
    ]);

    const redIcon = new L.Icon({
        iconUrl:
            "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    });

    // const {
    //     user: { id: userId },
    // } = useContext(UserContext);

    //check before if user.id exists
    const userId = useContext(UserContext)?.user?.id;
    const [loggedUser, setLoggedUser] = useState(0);
    console.log(userId);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`)
            .then((res) => setLoggedUser(res.data))
            .catch((err) => console.log(err));
    }, []);

    console.log(loggedUser);

    const center = [-21.115141, 55.536384];
    const zoom = 10;

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/users`)
            .then((res) => {
                setUsers(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    console.log(users);

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
                {users && loggedUser ? (
                    <MapContainer center={center} zoom={zoom} ref={mapRef}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {users.map((mark) => (
                            <Marker
                                key={mark.id}
                                position={[
                                    mark.address.latitude,
                                    mark.address.longitude,
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

                        <Marker
                            position={[
                                loggedUser.address.latitude,
                                loggedUser.address.longitude,
                            ]}
                            onClick={() => setProfile()}
                            icon={redIcon}
                        />
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
