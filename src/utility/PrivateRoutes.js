import React from 'react'
import { useLocalState } from './UseLocalStorage'
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    return jwt != null || jwt != "" ? children : <Navigate to={"/login"}/>;
};

export default PrivateRoutes