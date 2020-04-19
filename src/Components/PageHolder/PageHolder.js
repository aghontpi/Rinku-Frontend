import React from "react";
import "./PageHolder.css";

class PageHolder extends React.Component {
    constructor(){
        super();
        this.state = {
            page:"filemanager"
        }
    }
    render(){
        return (
            <div className="page-holder">
            <h3>"this is the main content";</h3>
            </div>
        )
    }

}


export default PageHolder;