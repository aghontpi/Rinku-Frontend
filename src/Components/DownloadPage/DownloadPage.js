import React from "react"
import { withRouter } from "react-router";
// anyone can access this component, even logged out users
// thus this component requires a seperate router instead of 
// nested router.

import style from "./download.module.css";
class DownloadPage extends React.Component{
    constructor(){
        super()
        this.state = {
            fileid:""
        }
    }

    componentDidMount(){
        const { fileid } = this.props.match.params;
        this.setState((prevState) => {
            return({
                    ...prevState,
                    fileid:fileid
                }
            )
            
        }, ()=>console.log(this.state));
        
    }

    render(){
        return(
            <div className={style.page_container}>
                <div className={style.download_image}>

                </div>
                <div className={style.file_details}>
                    <div>
                        <span>filename.ext</span>
                        <span>4844KB</span>
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