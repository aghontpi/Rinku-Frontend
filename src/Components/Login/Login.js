import React from "react"
import "./Login.css";
import LoginForm from  "../Forms/LoginForm";
import LoginApi from "../../Api/Login"
import LoginErr from "../Error/LoginErr";
import { Redirect } from 'react-router-dom'
import FadeIn from "react-fade-in";
import ReCAPTCHA from "react-google-recaptcha";
import { createPortal } from "react-dom";
class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            form: {
                uname: "",
                pword: "",
                rmbrFlag: false,
                error:"",
                captcha:"",
            },
            loggedIn: false,
            loading:false
            
        };
        this.handleFormChange = this.handleFormChange.bind(this);
        this.recaptchaRef = React.createRef();
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
            if(resp.content !== "undefined"){
                sessionStorage.setItem("user", resp.content.user);
                sessionStorage.setItem("loginTime", resp.content.loginTime);
                sessionStorage.setItem("nick",resp.content.nick);
                this.setState({
                    form:this.state.form,
                    loggedIn:true
                });
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

    setCapchaResponse = (cb) => {
        this.setState((prevState)=>{return({
            ...prevState,
            form:{
                ...prevState.form,
                captcha: this.recaptchaRef.current.getValue()
            }
        })},()=>cb())
    }

    formSubmit = ()=> {
        const callBack = ()=>{
                LoginApi(this.state.form).then((response)=>{
                this.chanageLoading(false);
                if(response.status === 200){
                    return response.json();
                }
                else {
                    //@todo: handle status response errors
                }
            }).then((jsonResp)=>{
                this.recaptchaRef.current.reset();
                if(jsonResp.response === "error"){
                    this.changeErrorState(jsonResp.errors.errMsg);
                } else if (jsonResp.response === "success"){
                    this.changeLoginState(jsonResp);
                }
            });
        }
        this.setCapchaResponse(callBack);
        
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
                                formSubmitCallBack={this.reCaptcha}/>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }

    recaptchaRender = ()=> {
        //captcha render
        return  <ReCAPTCHA
        ref={this.recaptchaRef}
        sitekey="6Le0ELAZAAAAAE-8sVHZD_AtZhSlweSznZJVDHal"
        onChange={ ()=>this.formSubmit() }
        size="invisible"
      />;
    }

    reCaptcha = (event) => {
        this.chanageLoading(true);
        event.preventDefault();
        // recaptcha execute
        this.recaptchaRef.current.execute()
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
                    {   createPortal(
                            this.recaptchaRender(),
                            document.getElementsByTagName('body')[0]
                        )
                    }
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
