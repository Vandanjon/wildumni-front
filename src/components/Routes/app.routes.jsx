import { useRoutes } from "react-router-dom";
import ViewUser from "../../pages/ViewUser";
import UserDetails from "../../pages/UserDetails";

// Routes

/** @type {import("react-router-dom").RouteObject[]} */
const appRoutes = [
  {
    path: "/",
    element: <ViewUser />,
  },
  {
    path: "/users/:id",
    element: <UserDetails />,
  },
];

const AppRoutes = () => useRoutes(appRoutes);

export default AppRoutes;
