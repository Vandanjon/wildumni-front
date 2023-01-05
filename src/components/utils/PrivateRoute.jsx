import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const PrivateRoute = ({ children }) => {
    const token = sessionStorage.getItem("token");
    const decoded = jwt_decode(token);

    if (!decoded.roles.includes("ROLE_ADMIN")) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;
