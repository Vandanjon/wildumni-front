import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

const ViewUser = () => {
    const { user } = useContext(UserContext);
    console.log(user);
    return (
        <>
            <h1>ViewUserPage</h1>
            <p>coucou</p>
            <Link to="/admin">ADMIN</Link>
        </>
    );
};

export default ViewUser;
