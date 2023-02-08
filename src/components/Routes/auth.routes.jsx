import { useRoutes } from "react-router-dom";
import Login from "../../pages/Login";
import UserCreate from "../../pages/UserCreate";

// Routes

/** @type {import("react-router-dom").RouteObject[]} */
const authRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <UserCreate />,
  },
  {
    path: "*",
    element: <Login />,
  },
];

const AuthRoutes = () => useRoutes(authRoutes);

export default AuthRoutes;
