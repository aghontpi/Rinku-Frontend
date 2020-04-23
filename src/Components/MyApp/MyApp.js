import React from "react";
import { 
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Login from "../Login/Login";
import Home from "../Home/Home"
import {LoginRouter} from "../Routes/LoginRouter";

function MyApp(){
    return(
        <div><Router>
                <Switch>
                    <LoginRouter exact path="/">
                    <Login/>
                    </LoginRouter>
                    <Route exact path="/home">
                    <Home/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default MyApp;