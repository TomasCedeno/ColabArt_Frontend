import {createContext, useContext, useEffect, useState} from 'react';
import io from "socket.io-client";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext)

const AppContext = ({children}) => {
    const server = "http://localhost:5000";
    const connectionOptions = {
        "force new connection": true,
        reconnectionAttempts: "Infinity",
        timeout: 10000,
        transports: ["websocket"],
    };

    const socket = io(server, connectionOptions);
    const [user, setUser] = useState({id:1, name:"Juan"});

    return <GlobalContext.Provider value={{socket, user, setUser}} >
        {children}
    </GlobalContext.Provider>
}

export default AppContext;