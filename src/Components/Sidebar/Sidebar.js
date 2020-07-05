import React from "react";
import {
    BrowserRouter as Router,
    NavLink
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
            children: () =>  <FileManager/> ,
            name:"explorer"
        },
        {
            path:"/manage-links",
            exact:true,
            children: () =>  <ManageLinks/> ,
            name:"manage links"
        },
        {
            path:"/url-shorten",
            exact:true,
            children: () =>  <div>url shorten</div> ,
            name:"url shorten"
        },
        {
            path:"/stats",
            exact:true,
            children: () =>  <div>url shorten</div> ,
            name:"stats"
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
                        {navItems(routes)}
                    </ul>
                </div>
            </div>
            { routes && <PageHolder routes={routes}/> }
        </Router>
    );
}

const navItems = (items) => {
    const linkActiveStyle = {
        borderBottom: "solid 3px orange",
        transition: "0.5s ease-in-out"
      }
    return(
        items.map((item,key)=>{
            return(
                <li key={key} className="leftanimation"> 
                    <NavLink 
                        to={item.path}
                        activeStyle={ linkActiveStyle }
                    >
                        {item.name}
                    </NavLink>
                </li>
            )
        })
    );
}



export default Sidebar;