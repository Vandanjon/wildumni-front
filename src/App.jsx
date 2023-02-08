import { BrowserRouter, Routes } from "react-router-dom";
import RouteRoleRenderer from "./components/Routes/RouteRoleRenderer";
import { ConnectedUserContextProvider } from "./contexts/connectedUserContext";

const App = () => {
  return (
    <BrowserRouter>
      <ConnectedUserContextProvider>
        <RouteRoleRenderer />
      </ConnectedUserContextProvider>
    </BrowserRouter>
  );
};

export default App;
