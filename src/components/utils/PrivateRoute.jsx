import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { UserContext } from "../../assets/contexts/UserContext";
import { useContext } from "react";

const PrivateRoute = ({ children }) => {
    // const token = sessionStorage.getItem("token");
    // const decoded = jwt_decode(token);

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
