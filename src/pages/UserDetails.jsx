import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div id="UserDetailsPage" className="pageContainer">
            <header>
                <h1>User Details</h1>
            </header>

            <main>
                {user.firstName ? <p>Firstname : {user.firstName}</p> : ""}
                {user.id ? <p>Id : {user.id}</p> : ""}
                {user.lastName ? <p>Lastname : {user.lastName}</p> : ""}
                {user.address?.latitude ? (
                    <p>Address : {user.address.latitude}</p>
                ) : (
                    ""
                )}
            </main>

            <footer>Alumni for ever</footer>
        </div>
    );
};

export default UserDetails;
