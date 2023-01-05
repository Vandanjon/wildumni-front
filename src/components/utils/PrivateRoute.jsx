import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

const PrivateRoute = ({ children }) => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to="/" replace />;
    } else if (user.includes("ROLE_ADMIN")) {
        return <Navigate to="/admin" replace />;
    } else {
        return <Navigate to="/user" replace />;
    }

    return children;
};

export default PrivateRoute;
