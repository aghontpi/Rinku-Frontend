import React from "react";
import "./Sidebar.css";
function Sidebar(props){
    return(
        <div className="main-sidebar">
            <div className="user-title">
                <h4>Hi bluepie</h4>
            </div>
            <div className="user-content">
                <ul className="user-menuitems">
                    <li>explorer</li>
                    <li>url shortener</li>
                    <li>stats</li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;