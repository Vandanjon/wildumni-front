import { Navigate } from "react-router-dom";
import { ConnectedUserContext } from "../contexts/connectedUserContext";
import { useContext } from "react";

const UserRoute = ({ children }) => {
    const { connectedUser } = useContext(ConnectedUserContext);

    if (!connectedUser) {
        return <Navigate to="/" replace />;
    } else if (connectedUser.roles.includes("ROLE_USER")) {
        return children;
    }
};

export default UserRoute;
