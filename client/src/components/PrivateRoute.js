import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthnicated=()=>{
    return localStorage.getItem('token')!==null;
}

const PrivateRoute=({children})=>{
    return isAuthnicated() ? children :<Navigate to="/login" />;
}

export default PrivateRoute;