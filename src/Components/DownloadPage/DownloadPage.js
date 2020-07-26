import React from "react"
import { withRouter } from "react-router";
import ReCAPTCHA from "react-google-recaptcha";
// anyone can access this component, even logged out users
// thus this component requires a seperate router instead of 
// nested router.

import style from "./download.module.css";
import { Download } from "../../Api/Download";
import folder from "./folder.webp" ;
import { bytesToReadable } from "./../Utils";
import FadeIn from "react-fade-in";
import { createPortal } from "react-dom";


class DownloadPage extends React.Component{
    constructor(){
        super()
        this.state = {
            filename:"filename",
            fileid:"",
            fileSize:"filesize",
            error:"",
            captcha:false,
            loading:false,
            captchaLoading:false,
        }
        this.recaptchaRef = React.createRef();
    }

    componentDidMount(){
        // get the file id form react-router
        const { fileid } = this.props.match.params;
        this.setState((prevState) => {
            return({
                    ...prevState,
                    fileid:fileid
                }
            )
            
        });

        let promise = Download({fileid:fileid});
        promise.then((response) => {
            return (response.status === 200) ? response.json() : {};
        }).then((json)=>{
            if(json.response === "success"){
                this.setState((prevState) => {
                    return({
                        ...prevState,
                        filename:json.content.file.filename,
                        fileSize: bytesToReadable(json.content.file.filesize),
                        captcha:(json.content.file.captcha === "enable")
                    })
                });
            } else if(json.response === "error"){
                this.setState((prevState) => {
                    return({
                        ...prevState,
                        error:json.errors.errMsg
                    })
                });
            }
        });

    }

    recaptchaRender = ()=> {
        //captcha render
        return  <ReCAPTCHA
        ref={this.recaptchaRef}
        sitekey="6Le0ELAZAAAAAE-8sVHZD_AtZhSlweSznZJVDHal"
        onChange={ ()=> {
            this.setCaptchaLoading(false);
            this.downloadClick();
        } }
        size="invisible"
      />;
    }

    reCaptcha = () => {
        // recaptcha execute
        this.state.captcha 
            ? (()=>{
                this.setCaptchaLoading(true);
                this.recaptchaRef.current.execute()
            })()
            : this.downloadClick();
    }

    setLoading = (stateBool) => {
        this.setState((prevState)=>{
            return(
                {
                ...prevState,
                loading:stateBool
                }
            )
        })
    }

    setCaptchaLoading = (stateBool) => {
        this.setState((prevState)=>{
            return(
                {
                ...prevState,
                captchaLoading:stateBool
                }
            )
        })
    }

    downloadClick = () => {
        if (this.state.fileid === "") return;
        this.setLoading(true);
        let promise =  Download({
            fileid:this.state.fileid,
            action:'download',
            captcha: this.state.captcha ? this.recaptchaRef.current.getValue(): ""
        })
        promise.then((response) => {
            return (response.status === 200) ? response.json() : {};
        }).then((json) => {
            this.setLoading(false);
            // reset the captcha after response from the server
            if(json.response === "success"){
                window.location.href = json.content.file.downloadUrl;    
                this.state.captcha && this.recaptchaRef.current.reset();
            }
            else if(json.response === "error"){
                this.state.captcha && this.recaptchaRef.current.reset();
                this.setState((prevState) => {
                    return({
                        ...prevState,
                        error:json.errors.errMsg
                    })
                });
            }
        });
    }

    donwloadContent(){
        return (
            <div className={style.page_container}>
                <div className={style.download_image}>
                    <img src={folder} alt="downloadIcon"/>
                </div>
                <div className={style.file_details}>
                    <div>
                        <span>{this.state.filename}</span>
                        <span>{this.state.fileSize}</span>
                    </div>
                </div>
                <div onClick={this.reCaptcha} className={style.download_button}>
                    <div>
                       {!this.state.captchaLoading ? 
                        <span>{!this.state.loading ? "DOWNLOAD": "Starting.."}</span>
                        :<span>Checking Captcha..</span>
                       }
                    </div>
                </div>
                { this.state.captcha && createPortal(this.recaptchaRender(),document.getElementsByTagName('body')[0])}
            </div>
            
        );
    }

    errorContent(){
        const disabledButton = {
            borderColor:"grey",
            cursor:"Default",
            opacity:0.5
        }

        const disabledSpan = {
            color:"grey"
        }

        return (
            <div className={style.page_container}>
                <div className={style.file_details}>
                    <div>
                        <span style={{color:"red"}}>
                            {this.state.error}
                        </span>
                    </div>
                </div>
                <div className={style.download_button} style={disabledButton} >
                    <div>
                        <span style={disabledSpan}>DOWNLOAD</span>
                    </div>
                </div>
            </div>
        );
    }

    render(){
        let content = null;
        if(this.state.error !== ""){
            content = this.errorContent();
        } else if(this.state.filename !== "filename"){
            content = this.donwloadContent();
        }

        return( 
           content? <FadeIn>{content}</FadeIn> : ""
                
        );
    }

}



export default withRouter(DownloadPage);