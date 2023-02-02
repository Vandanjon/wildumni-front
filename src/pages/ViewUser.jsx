import { useEffect, useRef, useState, useContext } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import * as L from "leaflet";
import axios from "axios";

import NavBar from "../components/NavBar";
import { ConnectedUserContext } from "../contexts/connectedUserContext";

const ViewUser = () => {
    const [users, setUsers] = useState();
    const [selectedUser, setSelectedUser] = useState();
    const [center, setCenter] = useState();

    const { connectedUser } = useContext(ConnectedUserContext);

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
            .get(
                `${import.meta.env.VITE_BACKEND_URL}/users/${connectedUser.id}`
            )
            .then((res) => {
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

    const changeUser = (el) => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/users/${el.id}`)
            .then((res) => {
                setSelectedUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div id="UserPage" className="pageContainer">
            <header>
                <NavBar />

                <h1>User View</h1>

                <button onClick={recenterMap}>Recenter on me</button>
            </header>

            <main>
                {users && center ? (
                    <MapContainer center={center} zoom={zoom} ref={mapRef}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {users.map((userM) => {
                            let icon = blueIcon;
                            if (connectedUser.id === userM.id) {
                                icon = redIcon;
                            }

                            return (
                                <Marker
                                    key={userM.id}
                                    position={[
                                        parseFloat(userM.address.latitude),
                                        parseFloat(userM.address.longitude),
                                    ]}
                                    icon={icon}
                                    eventHandlers={{
                                        click: (e) => changeUser(userM),
                                    }}
                                >
                                    <Popup>
                                        {userM.firstName}
                                        <br />
                                        {userM.email}
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
                {selectedUser ? (
                    <>
                        <div className="container account">
                            <h2>ACCOUNT</h2>
                            <p>
                                {selectedUser.firstName} {selectedUser.lastName}
                            </p>
                            <p>AKA {selectedUser.userName}</p>
                        </div>

                        <div className="container address">
                            <h2>ADDRESS</h2>
                            <p>
                                {selectedUser.address.streetNumber}
                                {", "}
                                {selectedUser.address.street}
                                {", "}
                                {selectedUser.address.city}
                            </p>
                            <p>
                                {selectedUser.address.postcode}
                                {", "}
                                {selectedUser.address.city}
                            </p>
                            <p>{selectedUser.address.country}</p>
                        </div>

                        <div className="container roles">
                            <h2>ROLE(S)</h2>
                            {selectedUser.roles[0]}
                            <br />
                            {selectedUser.roles[1]}
                        </div>

                        <div className="container sessions">
                            <h2>SESSION(S)</h2>
                            {selectedUser.session.map((el, index) => (
                                <span key={index}>
                                    {el.location}
                                    {" - "}
                                    {new Date(el.startDate).toLocaleDateString(
                                        "fr-FR",
                                        {
                                            month: "long",
                                        }
                                    )}
                                    {" à "}
                                    {new Date(el.endDate).toLocaleDateString(
                                        "fr-FR",
                                        {
                                            month: "long",
                                            year: "numeric",
                                        }
                                    )}
                                </span>
                            ))}
                        </div>

                        <div className="container languages">
                            <h2>LANGUAGE(S)</h2>
                            {selectedUser.language.map((el, index) => (
                                <span key={index}>
                                    {el.name}
                                    <br />
                                </span>
                            ))}
                        </div>
                    </>
                ) : null}
            </footer>
        </div>
    );
};

export default ViewUser;
