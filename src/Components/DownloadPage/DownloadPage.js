import React from "react"
import { withRouter } from "react-router";
// anyone can access this component, even logged out users
// thus this component requires a seperate router instead of 
// nested router.

import style from "./download.module.css";
import { Download } from "../../Api/Download";
import folder from "./folder.webp" ;
import { bytesToReadable } from "./../Utils";
class DownloadPage extends React.Component{
    constructor(){
        super()
        this.state = {
            filename:"filename",
            fileid:"",
            fileSize:"filesize",
            error:"",
        }
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
            
        }, ()=>console.log(this.state));

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
                    })
                });
            } else if(json.response === "error"){
                this.setState((prevState) => {
                    return({
                        ...prevState,
                        error:json.response.errMsg
                    })
                });
            }
        });

    }

    render(){
        return(
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
                <div className={style.download_button}>
                    <div>
                        <span>DOWNLOAD</span>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(DownloadPage);