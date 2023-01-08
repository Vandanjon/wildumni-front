import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const UserRoute = ({ children }) => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to="/" replace />;
    } else if (user.includes("ROLE_USER")) {
        return children;
    }
};

export default UserRoute;
