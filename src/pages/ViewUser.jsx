import { useEffect, useRef, useState, useContext } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import * as L from "leaflet";
import axios from "axios";

import NavBar from "../components/NavBar";
import { UserContext } from "../contexts/UserContext";

const ViewUser = () => {
    const [users, setUsers] = useState();
    const [selectedUser, setSelectedUser] = useState();
    const [center, setCenter] = useState();

    const { user, setUser } = useContext(UserContext);
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
            .get(`${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                if (err) {
                    console.log(err);
                }
            });
    }, []);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`)
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

                <div>
                    <button onClick={recenterMap}>Recenter on me</button>
                </div>
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
                            if (user.id === userM.id) {
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
                        <div className="div1"></div>
                        <div className="div2">ACCOUNT</div>
                        <div className="div3">ADDRESS</div>
                        <div className="div4">
                            {selectedUser.firstName} {selectedUser.lastName}
                        </div>
                        <div className="div5">{selectedUser.userName}</div>
                        <div className="div6">
                            {selectedUser.roles[0]}
                            <br />
                            {selectedUser.roles[1]}
                        </div>
                        <div className="div8">
                            {" "}
                            {selectedUser.address.streetNumber}
                            {", "}
                            {selectedUser.address.street}
                            {", "}
                            {selectedUser.address.city}
                        </div>
                        <div className="div9">
                            {selectedUser.address.postcode}
                            {", "}
                            {selectedUser.address.city}
                        </div>
                        <div className="div10">
                            {selectedUser.address.country}
                        </div>
                        <div className="div11">SESSION</div>
                        <div className="div12">
                            {selectedUser.session.map((el, index) => (
                                <span key={index}>
                                    {el.location}
                                    <br />
                                    {new Date(el.startDate).toLocaleDateString(
                                        "fr-FR",
                                        {
                                            year: "numeric",
                                            month: "numeric",
                                        }
                                    )}
                                    <br />
                                    {new Date(el.endDate).toLocaleDateString(
                                        "fr-FR",
                                        {
                                            year: "numeric",
                                            month: "numeric",
                                        }
                                    )}
                                </span>
                            ))}
                        </div>
                        <div className="div13">LANGUAGE</div>
                        <div className="div14">
                            {selectedUser.language.map((el, index) => (
                                <span key={index}>
                                    {el.name}
                                    <br />
                                </span>
                            ))}
                        </div>
                    </>
                ) : (
                    // user ?? <p>{user.id}</p>
                    ""
                )}
            </footer>
        </div>
    );
};

export default ViewUser;
