import React from "react"
import "./Login.css";
import LoginForm from  "../Forms/LoginForm";

import { Grid,  Segment } from "semantic-ui-react";

class Login extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }

    render(){
        return(
            <Grid centered>
                <Grid.Column>
                <Segment raised>
                    <LoginForm/>
                </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Login;