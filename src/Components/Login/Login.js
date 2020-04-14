import React from "react"
import "./Login.css";
import LoginForm from  "../Forms/LoginForm";
import LoginApi from "../../Api/Login"
import LoginErr from "../Error/LoginErr";

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

    changeErrorState = (ErrMsg) =>{
        this.setState((prevState)=>{
            return {
                form:{
                    ...prevState.form,
                    error:ErrMsg
                }
            }
        } );
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
            if(jsonResp.response === "error"){
                this.changeErrorState(jsonResp.errors.errMsg);
            }
        });
    }


    render(){

        
        return(
            <div className="ui grid centered" >
                <div className="ui column">
                    <div className="ui segment raised">
                        <ErrorMessage 
                        msg={this.state.form.error}
                        closeAction = {()=>{
                            this.changeErrorState("");
                        }}/>
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


function ErrorMessage(props){
    const err = "Sorry can not log you in!"
    if (props.msg.length > 1){
        return (
            <LoginErr 
                title={err} 
                msg= {props.msg}
                closeActionCallback = {props.closeAction}/> 
        );
    }
    return "";
}

export default Login;