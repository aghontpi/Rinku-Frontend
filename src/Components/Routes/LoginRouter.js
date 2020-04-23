import React from "react";
import { Redirect, Route } from "react-router-dom";
import { checkLoggedIn } from "../Login/Login";

// redirects to home page if user is logged in
function LoginRouter({children, ...rest}){
    return (
        <Route
        {...rest}
        render= {
            ({location}) => (checkLoggedIn())?
                (<Redirect to={{pathname:'/home', state:{from:location}}}/>)
                : (children)
        }
        />
    )
}

export default null;

export {LoginRouter}