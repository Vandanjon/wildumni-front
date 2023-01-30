import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState();

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
                {user ? (
                    <>
                        <section className="mainInfos">
                            <h2>Main Infos</h2>
                            {user.id ? <p>Id : {user.id}</p> : ""}
                            {user.email ? <p>Email : {user.email}</p> : ""}
                            {user.roles ? <p>Roles : {user.roles}</p> : ""}
                        </section>

                        <section className="courtesies">
                            <h2>Courtesies</h2>

                            {user.firstName ? (
                                <p>Firstname : {user.firstName}</p>
                            ) : (
                                ""
                            )}
                            {user.lastName ? (
                                <p>Lastname : {user.lastName}</p>
                            ) : (
                                ""
                            )}
                            {user.userName ? (
                                <p>Username : {user.userName}</p>
                            ) : (
                                ""
                            )}
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

                            {user?.contactLink[0] ? (
                                <>
                                    <p>GitHub : {user.contactLink[0].github}</p>
                                    <p>GitLab : {user.contactLink[0].gitlab}</p>
                                    <p>
                                        BitBucket :{" "}
                                        {user.contactLink[0].bitbucket}
                                    </p>
                                    <p>
                                        Twitter : {user.contactLink[0].twitter}
                                    </p>
                                    <p>
                                        LinkedIn :{" "}
                                        {user.contactLink[0].linkedin}
                                    </p>
                                </>
                            ) : (
                                ""
                            )}
                            {/* {user?.contactLink.map((link) => {
                                const linkName = Object.keys(link);
                                return linkName.map((socialName, id) => (
                                    <p key={id}>
                                        {socialName} :{" "}
                                        {link[socialName]
                                            ? link[socialName]
                                            : "none defined"}
                                    </p>
                                ));
                            })} */}
                        </section>

                        <section className="addressInfos">
                            <h2>Address Infos</h2>
                            <div>
                                {user.address?.latitude ? (
                                    <p>Latitude : {user.address.latitude}</p>
                                ) : (
                                    ""
                                )}
                                {user.address?.longitude ? (
                                    <p>Longitude : {user.address.longitude}</p>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div>
                                {user.address?.streetNumber ? (
                                    <span>{user.address.streetNumber}</span>
                                ) : (
                                    ""
                                )}{" "}
                                {user.address?.street ? (
                                    <span>{user.address.street}</span>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div>
                                {user.address?.postcode ? (
                                    <span>{user.address.postcode}</span>
                                ) : (
                                    ""
                                )}{" "}
                                {user.address?.city ? (
                                    <span>{user.address.city}</span>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div>
                                {user.address?.region ? (
                                    <span>{user.address.region}</span>
                                ) : (
                                    ""
                                )}{" "}
                                {user.address?.country ? (
                                    <span>{user.address.country}</span>
                                ) : (
                                    ""
                                )}
                            </div>
                        </section>
                    </>
                ) : (
                    ""
                )}
            </main>

            <footer></footer>
        </div>
    );
};

export default UserDetails;
