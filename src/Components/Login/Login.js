import React from "react"
import "./Login.css";
import LoginForm from  "../Forms/LoginForm";

class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            form: {
                uname: "",
                pword: "",
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
                [name]: event.target.checked
            }
        }) : this.setState({
            form: {
                ...this.state.form,
                [name]:[value]
            }
      });
      console.log(this.state.form);
    }

    formSubmit = (event)=> {
        event.preventDefault();
        console.log("called");
    }

    render(){
        return(
            <div className="ui grid centered" >
                <div className="ui column">
                    <div className="ui segment raised">
                        <LoginForm 
                        form = {this.state.form} 
                        changeCallBack={this.handleFormChange} 
                        formSubmitCallBack={this.formSubmit}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;