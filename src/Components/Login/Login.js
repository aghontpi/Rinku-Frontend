import React from "react"
import "./Login.css";

class Login extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }

    render(){
        return(
            <div className="ui center aligned grid">
                <div className="column left aligned">
                    <form className="ui form">
                        <div className = "ui raised segment">
                            <div className=" field">
                                <label className="ui left aligned "> Email</label>
                                <input type="text" placeholder="Enter your email" name="uname"/>
                            </div>
                            <div className="field">
                                <label className=""> Password</label>
                                <input placeholder="Enter password" type="password" name="pword"/>
                            </div>
                            <div className="field">
                                <div className="ui checkbox">
                                <input type="checkbox" tabindex="0" className=""/>
                                <label>Remember me</label>
                                </div>
                            </div>
                            <div className="ui field center aligned grid">
                                <button className="ui button primary" type="sumit">login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;