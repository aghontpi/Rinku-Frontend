import React from "react"
import "./Login.css";
import LoginForm from  "../Forms/LoginForm";
import LoginApi from "../../Api/Login"
import LoginErr from "../Error/LoginErr";
import { Redirect } from 'react-router-dom'
import FadeIn from "react-fade-in";
class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            form: {
                uname: "",
                pword: "",
                rmbrFlag: false,
                error:"",
            },
            loggedIn: false,
            loading:false
            
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

    changeLoginState = (resp) => {
            console.log(resp);
            if(resp.content !== "undefined"){
                sessionStorage.setItem("user", resp.content.user);
                sessionStorage.setItem("loginTime", resp.content.loginTime);
                sessionStorage.setItem("nick",resp.content.nick);
                this.setState({
                    form:this.state.form,
                    loggedIn:true
                });
                console.log("state",this.state);
            }
    }

    chanageLoading = (loadBool) =>{
        this.setState((prevState)=>{
            return({
                ...prevState,
                loading:loadBool
            })
        })
    }

    formSubmit = (event)=> {
        this.chanageLoading(true);
        event.preventDefault();
        const promise = LoginApi(this.state.form);
        promise.then((response)=>{
            this.chanageLoading(false);
            if(response.status === 200){
                return response.json();
            }
            else {
                //@todo: handle status response errors
            }
        }).then((jsonResp)=>{
            if(jsonResp.response === "error"){
                this.changeErrorState(jsonResp.errors.errMsg);
            } else if (jsonResp.response === "success"){
                this.changeLoginState(jsonResp);
            }
        });
    }

    raisedSegmentForm(){
        /** @todo use hooks and move this outside class */
        return (
                <div className="top-50">
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
                                loading = {this.state.loading}
                                changeCallBack={this.handleFormChange} 
                                formSubmitCallBack={this.formSubmit}/>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }


    render(){
        if (this.state.loggedIn)
            return (
            <Redirect to='/home'/>
        );

        return(
            <FadeIn>
                <div>
                    { this.raisedSegmentForm() }
                </div>
            </FadeIn>
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

const checkLoggedIn = () => {
    let state =  true;
    ['nick','user','loginTime'].forEach((item)=>{
         sessionStorage.getItem(item) == null && (state = false)
    });
    return state;
}
export {checkLoggedIn}
export default Login;
