import React from "react";
import { Form, Button, Grid } from "semantic-ui-react";

const LoginForm =  (params)  => {
   return ( 
   <Form>
        <Form.Field>
            <label className="ui left aligned "> Email</label>
            <Form.Input 
                placeholder="Enter your email" 
                name="uname" 
                onChange={params.changeCallBack} 
                value={params.form.uname}
    
            />
        </Form.Field>
        <Form.Field >
            <label className=""> Password</label>
            <Form.Input 
                placeholder="Enter password" 
                type="password" 
                name="pword"
                onChange={params.changeCallBack} 
                value={params.form.pword}/>
        </Form.Field>
        <Form.Field>
            <Form.Checkbox 
                name="rmbrFlag" 
                checked={params.form.rmbrFlag} 
                onChange={params.changeCallBack} 
                label='Remember me'/>
        </Form.Field>
        <Form.Field>
            <Grid padded centered>
                <Button type="submit" primary> Login </Button>
            </Grid>
        </Form.Field>
    </Form>
   );
}

export default LoginForm;