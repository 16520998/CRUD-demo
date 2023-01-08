import React from "react";
import { Outlet , Navigate } from "react-router-dom";
export const PrivateRoute = ({ component: Component, ...rest }) => {
    const userDetails = localStorage.getItem("userDetails")
    return userDetails ? <Outlet/> : <Navigate to="/login"/>
};