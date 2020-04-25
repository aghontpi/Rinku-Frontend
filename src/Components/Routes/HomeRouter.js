import React from "react";
import {checkLoggedIn} from "../Login/Login";
import { Redirect, Route } from "react-router-dom";


function HomeRouter({children, ...rest}){
    return (
        <Route
            {...rest}
            render ={
                ({location}) => 
                    (checkLoggedIn()) ?
                        (children)
                        :(<Redirect 
                            to={{pathname:"/", state:{from:location}}}
                            />)
            }
        />
                    
    );
}



//@todo: use this for sign in or out
const authentication =  {
    
    signIn(callback){
        callback();
    },
    signOut(callback){
        sessionStorage.clear();
        callback();
    }
}


export default HomeRouter;
export {authentication}