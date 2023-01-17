import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const NavBar = () => {
    const { user } = useContext(UserContext);

    return (
        <nav>
            <Link to="/">LOGOUT</Link>

            {user && user.roles.includes("ROLE_ADMIN") ? (
                <Link to="/admin">Admin</Link>
            ) : (
                ""
            )}
            <Link to="/user">User</Link>
        </nav>
    );
};

export default NavBar;
