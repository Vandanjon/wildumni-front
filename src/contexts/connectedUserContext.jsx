import { createContext, useState } from "react";

export const ConnectedUserContext = createContext();

export const ConnectedUserContextProvider = ({ children }) => {
    const [connectedUser, setConnectedUser] = useState();

    return (
        <ConnectedUserContext.Provider
            value={{ connectedUser, setConnectedUser }}
        >
            {children}
        </ConnectedUserContext.Provider>
    );
};
