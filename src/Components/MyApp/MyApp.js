import React from "react";
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { checkLoggedIn } from "./../Login/Login";
import Home from "../Home/Home";
import Login from "../Login/Login";

function MyApp(){
    return(
        <div><Router>
                <Switch>
                    <Route exact path="/">
                    <Login/>
                    </Route>
                    <Route exact path="/home">
                    {checkLoggedIn() ? <Home/> : <Redirect to="/" />} 
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default MyApp;