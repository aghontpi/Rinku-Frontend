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
import DownloadPage from "../DownloadPage/DownloadPage"


function MyApp(){
    return(
        <Router>
                <Switch>
                    <LoginRouter exact path="/">
                    <Login/>
                    </LoginRouter>
                    <HomeRouter exact path="/:module">
                        <Home/>
                    </HomeRouter>
                    <Route path='/download/:fileid'>
                        <DownloadPage/>
                    </Route>
                </Switch>
        </Router>
    );
}

export default MyApp;