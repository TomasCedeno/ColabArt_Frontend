import {createContext, useContext, useState} from 'react';
import axios from 'axios';
import io from "socket.io-client";

import { AUTH_URL } from './assets/urls';

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
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        lastName: 'lastName',
        token_access: '',
        token_refresh: ''
    });

    const verifyToken = async () => {
        await axios.post(AUTH_URL+"/refresh/", {refresh: user.token_refresh}, {headers: {}} )
            .then((result) => {
                setUser({...user, token_access: result.data.access})
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    const getUserData = async () => {
        verifyToken()
    
        await axios.get(AUTH_URL+`/user/${ user.id }/`, {headers: {'Authorization': `Bearer ${user.token_access}`}})
            .then((result) => {
                setUser({...user, id: result.data.id, name: result.data.name, email: result.data.email})
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const logOut = () => {
        setUser({
            id: null,
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            lastName: 'lastName',
            token_access: null,
            token_refresh: null,
        });
    }

    return <GlobalContext.Provider value={{socket, user, setUser, getUserData, verifyToken, logOut}} >
        {children}
    </GlobalContext.Provider>
}

export default AppContext;