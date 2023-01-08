import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import NavBar from "../components/NavBar";
import PersonalMap from "../components/PersonalMap";
import { MapContainer, TileLayer } from "react-leaflet";

const ViewUser = () => {
    const { user } = useContext(UserContext);
    const [profile, setProfile] = useState([
        {
            firstName: "toto",
            lastName: "tata",
        },
    ]);

    const center = [51.505, -0.09];
    const zoom = 13;
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

    const [position, setPosition] = useState(() =>
        map ? map.getCenter() : null
    );

    const onEvent = useCallback(
        (event) => {
            if (event === "click") {
                if (map) {
                    map.setView(center, zoom);
                }
            } else if (event === "move") {
                if (map) {
                    setPosition(map.getCenter());
                }
            }
        },
        [map]
    );

    useEffect(() => {
        if (map) {
            map.on("click", () => onEvent("click"));
            map.on("move", () => onEvent("move"));
            return () => {
                map.off("click", () => onEvent("click"));
                map.off("move", () => onEvent("move"));
            };
        }
    }, [map, onEvent]);

    return (
        <div id="UserPage" className="pageContainer">
            <header>
                <NavBar />

                <div>
                    {map ? (
                        <p>
                            {/* latitude: {position.lat.toFixed(4)}, longitude:{" "}
              {position.lng.toFixed(4)}  */}
                            <button onClick={() => onEvent("click")}>
                                Recenter on me
                            </button>
                        </p>
                    ) : null}
                </div>
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
