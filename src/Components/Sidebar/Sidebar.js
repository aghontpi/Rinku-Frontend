import React from "react";
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import "./Sidebar.css";
import FileManager from "./../FileManager/FileManager";
import ManageLinks from "./../ManageLinks/ManageLinks";
import PageHolder from "./../PageHolder/PageHolder";

function Sidebar(props){

    //@todo get this from server side
    const routes = [
        {
            path:"/home",
            exact:true,
            children: () =>  <FileManager/> 
        },
        {
            path:"/manage-links",
            exact:true,
            children: () =>  <ManageLinks/> 
        },
        {
            path:"/url-shorten",
            exact:true,
            children: () =>  <div>url shorten</div> 
        },
        {
            path:"/stats",
            exact:true,
            children: () =>  <div>url shorten</div> 
        },
    ];

    let userNickName = sessionStorage.getItem('nick');
    if(userNickName == null) userNickName = "user";
    
    return(
        <Router>
            <div className="main-sidebar">
                <div className="user-title">
                    <h4>Hi {userNickName}</h4>
                </div>
                <div className="user-content">
                    <ul className="user-menuitems">
                        <li> <Link to="/home">explorer</Link></li>
                        <li> <Link to="/manage-links">manage links</Link></li>
                        <li> <Link to="/url-shorten">url shortener</Link></li>
                        <li> <Link to="/stats">stats</Link></li>
                    </ul>
                </div>
            </div>
            { routes && <PageHolder routes={routes}/> }
        </Router>
    );
}



export default Sidebar;