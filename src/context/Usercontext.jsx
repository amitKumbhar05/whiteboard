import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const INITIAL_USER = { username: "", userId: "" };

const INITIAL_CONTEXT = {
    user: INITIAL_USER,
    sessionId: "",
    setUser: (value) => { },
    setSessionId: (value) => { },
};

const Authcontext = createContext(undefined);


export const Usercontext = ({ children }) => {
    const [user, setUser] = useState(INITIAL_USER);
    const [sessionId, setSessionId] = useState("");

    const value = {
        user,
        sessionId,
        setUser,
        setSessionId,
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("Userinfo")) {
            navigate('/login');
        }
    }, [])

    return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
};

export const useUserContext = () => useContext(Authcontext);