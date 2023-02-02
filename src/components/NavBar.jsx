import { Link } from "react-router-dom";
import { ConnectedUserContext } from "../contexts/connectedUserContext";
import { useContext } from "react";

const NavBar = () => {
    const { connectedUser } = useContext(ConnectedUserContext);

    return (
        <nav className="navBar">
            <Link to="/">LOGOUT</Link>

            <div className="nav-routes">
                {connectedUser && connectedUser.roles.includes("ROLE_ADMIN") ? (
                    <Link to="/admin">Admin</Link>
                ) : (
                    ""
                )}
                <Link to="/user">User</Link>
            </div>
        </nav>
    );
};

export default NavBar;
