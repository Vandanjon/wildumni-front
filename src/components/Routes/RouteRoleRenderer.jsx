import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ConnectedUserContext } from "../../contexts/connectedUserContext";

import AdminRoutes from "./admin.routes";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

const RouteRoleRenderer = () => {
  const context = useContext(ConnectedUserContext);

  if (context.connectedUser === undefined) {
    return <AuthRoutes />;
  }

  if (
    context.connectedUser.role.findIndex((item) => item === "ROLE_ADMIN") !== -1
  ) {
    return <AdminRoutes />;
  }

  return <AppRoutes />;
};

export default RouteRoleRenderer;
