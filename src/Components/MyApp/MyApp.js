import React from "react";
import { 
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Login from "../Login/Login";
import {LoginRouter} from "../Routes/LoginRouter";
import HomeRouter from "../Routes/HomeRouter";
import Home from "../Home/Home";

function MyApp(){
    return(
        <div><Router>
                <Switch>
                    <LoginRouter exact path="/">
                    <Login/>
                    </LoginRouter>
                    <HomeRouter exact path="/home">
                        <Home/>
                    </HomeRouter>
                </Switch>
            </Router>
        </div>
    );
}

export default MyApp;