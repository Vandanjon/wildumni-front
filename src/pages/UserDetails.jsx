import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        email: "",
        roles: [],
        firstName: "",
        lastName: "",
        userName: "",
        session: [
            {
                location: "",
                startDate: "",
                endDate: "",
            },
        ],
        language: [
            {
                name: "",
            },
            {
                name: "",
            },
        ],
        contactLink: [
            {
                url: "",
                social: {
                    name: "",
                },
            },
        ],
        address: {
            country: "",
            region: "",
            city: "",
            postcode: 0,
            street: "",
            latitude: "",
            longitude: "",
            streetNumber: 0,
        },
    });

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    console.log(user);

    return (
        <div id="UserDetailsPage" className="pageContainer">
            <header>
                <h1>User Details</h1>
            </header>

            <main>
                <section className="mainInfos">
                    <h2>Main Infos</h2>
                    {user.id ? <p>Id : {user.id}</p> : ""}
                    {user.email ? <p>Email : {user.email}</p> : ""}
                    {user.roles ? <p>Roles : {user.roles}</p> : ""}
                </section>

                <section className="courtesies">
                    <h2>Courtesies</h2>

                    {user.firstName ? <p>Firstname : {user.firstName}</p> : ""}
                    {user.lastName ? <p>Lastname : {user.lastName}</p> : ""}
                    {user.userName ? <p>Username : {user.userName}</p> : ""}
                </section>

                <section className="sessionInfos">
                    <h2>Session Infos</h2>

                    {user.session[0]?.location ? (
                        <p>Location : {user.session[0].location}</p>
                    ) : (
                        ""
                    )}
                    {user.session[0]?.startDate ? (
                        <p>
                            Start Date :{" "}
                            {new Date(
                                user.session[0].startDate
                            ).toLocaleDateString("fr-FR")}
                        </p>
                    ) : (
                        ""
                    )}
                    {user.session[0]?.endDate ? (
                        <p>
                            End Date :{" "}
                            {new Date(
                                user.session[0].endDate
                            ).toLocaleDateString("fr-FR")}
                        </p>
                    ) : (
                        ""
                    )}
                </section>

                <section className="languageInfos">
                    <h2>Languages Infos</h2>

                    {user.language[0]?.name ? (
                        <p>Language(s) : {user.language[0].name}</p>
                    ) : (
                        ""
                    )}
                </section>

                <section className="socialInfos">
                    <h2>Social Infos</h2>

                    {user.contactLink[0]?.github ? (
                        <p>GitHub : {user.contactLink[0].github}</p>
                    ) : (
                        ""
                    )}
                    {user.contactLink[0]?.gitlab ? (
                        <p>GitLab : {user.contactLink[0].gitlab}</p>
                    ) : (
                        ""
                    )}
                    {user.contactLink[0]?.linkedin ? (
                        <p>LinkedIn : {user.contactLink[0].linkedin}</p>
                    ) : (
                        ""
                    )}
                </section>

                <section className="addressInfos">
                    <h2>Address Infos</h2>

                    {user.address?.longitude ? (
                        <p>Address : {user.address.longitude}</p>
                    ) : (
                        ""
                    )}
                    {user.address?.country ? (
                        <p>Address : {user.address.country}</p>
                    ) : (
                        ""
                    )}
                    {user.address?.region ? (
                        <p>Address : {user.address.region}</p>
                    ) : (
                        ""
                    )}
                    {user.address?.postcode ? (
                        <p>Address : {user.address.postcode}</p>
                    ) : (
                        ""
                    )}
                    {user.address?.city ? (
                        <p>Address : {user.address.city}</p>
                    ) : (
                        ""
                    )}
                    {user.address?.street ? (
                        <p>Address : {user.address.street}</p>
                    ) : (
                        ""
                    )}
                    {user.address?.streetNumber ? (
                        <p>Address : {user.address.streetNumber}</p>
                    ) : (
                        ""
                    )}
                    {user.address?.latitude ? (
                        <p>Address : {user.address.latitude}</p>
                    ) : (
                        ""
                    )}
                </section>
            </main>

            <footer>Alumni for ever</footer>
        </div>
    );
};

export default UserDetails;
