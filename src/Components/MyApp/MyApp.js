import React from "react";
import { 
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Login from "../Login/Login";

function MyApp(){
    return(
        <div><Router>
                <Switch>
                    <Route exact path="/">
                        <Login/>
                    </Route>
                    <Route exact path="/home">
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default MyApp;