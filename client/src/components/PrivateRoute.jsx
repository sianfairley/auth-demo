import React from "react";
import { Navigate } from "react-router-dom";


function PrivateRoute(props) {
    // Redirect to /login if anonymous user
    if (!localStorage.getItem("token")) {
        return <Navigate to="/" />;
    }

    // else Render child component(s)
    return (
        <>
            {props.children}
        </>
    );
}

export default PrivateRoute;