import React from "react"
import "./Login.css";
import LoginForm from  "../Forms/LoginForm";
import LoginApi from "../../Api/Login"

class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            form: {
                uname: "",
                pword: "",
                rmbrFlag: false,
                error:"",
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
    }

    formSubmit = (event)=> {
        event.preventDefault();
        const promise = LoginApi(this.state.form);
        promise.then((response)=>{
            if(response.status === 200){
                return response.json();
            }
            else {
                //todo handle status response errors
            }
        }).then((jsonResp)=>{
            if(jsonResp.type === "error"){
                const errmsg=jsonResp.errors.errMsg;
                this.state.setState((prevState)=>{
                    return {
                        form:{
                            ...prevState.form,
                            error:errmsg
                        }
                    }
                } )
            }
        });
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