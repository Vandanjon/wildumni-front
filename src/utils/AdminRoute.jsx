import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const AdminRoute = ({ children }) => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to="/" replace />;
    } else if (user.roles.includes("ROLE_ADMIN")) {
        return children;
    } else {
        return <Navigate to="/user" replace />;
    }
};

export default AdminRoute;
