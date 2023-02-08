import { useRoutes } from "react-router-dom";
import Login from "../../pages/Login";
import UserCreate from "../../pages/UserCreate";
import ViewUser from "../../pages/ViewUser";
import UserDetails from "../../pages/UserDetails";
import UserUpdate from "../../pages/UserUpdate";
import ViewAdmin from "../../pages/ViewAdmin";

// Routes

/** @type {import("react-router-dom").RouteObject[]} */
const adminRoutes = [
  {
    path: "/",
    element: <ViewUser />,
  },
  {
    path: "/users/:id",
    element: <UserDetails />,
  },
  {
    path: "/userUpdate/:id",
    element: <UserUpdate />,
  },
  {
    path: "/admin",
    element: <ViewAdmin />,
  },
];

const AdminRoutes = () => useRoutes(adminRoutes);

export default AdminRoutes;
