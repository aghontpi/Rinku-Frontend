import React from "react"
import "./Login.css";
import LoginForm from  "../Forms/LoginForm";

import { Grid,  Segment } from "semantic-ui-react";

class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            form: {
                uname: null,
                pword: null,
                rmbrFlag: false,
            }
        };
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleFormChange(event){
      const {name, value, type} = event.target;
      (type === "checkbox") ? this.setState({
            form: { 
                ...this.state.form,
                [name]:!value
            }
        }) : this.setState({
            form: {
                ...this.state.form,
                [name]:[value]
            }
      });
      console.log(this.state.form);
    }

    render(){
        return(
            <Grid centered>
                <Grid.Column>
                <Segment raised>
                    <LoginForm form = {this.state.form} changeCallBack={this.handleFormChange}/>
                </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Login;