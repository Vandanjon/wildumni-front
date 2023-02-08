import { createContext, useEffect, useState } from "react";

export const ConnectedUserContext = createContext();

export const ConnectedUserContextProvider = ({ children }) => {
  const [connectedUser, setConnectedUser] = useState();

  useEffect(() => {}, [connectedUser]);

  return (
    <ConnectedUserContext.Provider value={{ connectedUser, setConnectedUser }}>
      {children}
    </ConnectedUserContext.Provider>
  );
};
