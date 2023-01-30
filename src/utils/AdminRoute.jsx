import { Navigate } from "react-router-dom";
import { ConnectedUserContext } from "../contexts/connectedUserContext";
import { useContext } from "react";

const AdminRoute = ({ children }) => {
    const { connectedUser } = useContext(ConnectedUserContext);

    if (!connectedUser) {
        return <Navigate to="/" replace />;
    } else if (connectedUser.roles.includes("ROLE_ADMIN")) {
        return children;
    } else {
        return <Navigate to="/user" replace />;
    }
};

export default AdminRoute;
