import React from "react";
import Logout from "../Logout/Logout"
import "./PageHeader.css";

function PageHeader(props){
    return (
        <div className="page-header">
            <Logout/>
        </div>
    );
}

export default PageHeader;