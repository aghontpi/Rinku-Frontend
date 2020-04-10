import React from "react"
import "./Login.css";
import { Form, Button } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import { Segment } from "semantic-ui-react";

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
                        <Form>
                            <Form.Field>
                                <label className="ui left aligned "> Email</label>
                                <Form.Input placeholder="Enter your email" name="uname"/>
                            </Form.Field>
                            <Form.Field >
                                <label className=""> Password</label>
                                <Form.Input placeholder="Enter password" type="password" name="pword"/>
                            </Form.Field>
                            <Form.Field>
                                <Form.Checkbox label='Remember me'/>
                            </Form.Field>
                            <Form.Field>
                                <Grid padded centered>
                                    <Button type="submit" primary> Login </Button>
                                </Grid>
                            </Form.Field>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Login;