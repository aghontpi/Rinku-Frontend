import React from "react";
import "./PageHolder.css";
import FileManager from "./../FileManager/FileManager"

class PageHolder extends React.Component {
    constructor(){
        super();
        this.state = {
            page:"filemanager"
        }
        
    }

    getPage(){
    if(this.state.page === "filemanager"){
        return(
            <FileManager/>
        );
    }
    }

    render(){
        return (
            <div className="page-holder">
            {this.getPage()}
            </div>
        )
    }

}


export default PageHolder;