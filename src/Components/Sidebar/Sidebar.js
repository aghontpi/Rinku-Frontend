import React from "react";
import {
    BrowserRouter as Router,
    NavLink
} from "react-router-dom";
import "./Sidebar.css";
import FileManager from "./../FileManager/FileManager";
import ManageLinks from "./../ManageLinks/ManageLinks";
import PageHolder from "./../PageHolder/PageHolder";
import {Stats} from "../Stats"
import FadeIn from "react-fade-in";
import Logout from "../Logout/Logout"
import {Compass, BarChart2, Filter} from "react-feather";

function Sidebar(props){

    const fadeInWrapper = (component) => {
        return(
            <FadeIn>
                {component}
            </FadeIn>
        );
    }
    //@todo get this from server side
    const routes = [
        {
            path:"/home",
            exact:true,
            children: () =>  fadeInWrapper(<FileManager/>),
            name:"explorer",
            icon:<Compass className="navIcon"/>
        },
        {
            path:"/manage-links",
            exact:true,
            children: () =>  fadeInWrapper(<ManageLinks/>),
            name:"manage links",
            icon:<Filter className="navIcon"/>
        },
        {
            path:"/stats",
            exact:true,
            children: () =>  fadeInWrapper(<Stats/>),
            name:"stats", 
            icon:<BarChart2 className="navIcon"/>
        },
    ];

    let userNickName = sessionStorage.getItem('nick');
    if(userNickName == null) userNickName = "user";
    
    return(
        <Router>
            <div className="main-sidebar">
                <div className="user-title">
                    <FadeIn>
                    <h4>Hi {userNickName}</h4>
                    <Logout/>
                    </FadeIn>
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
        color:"#f5deb3"
      }
    return(
        items.map((item,key)=>{
            return(
                <FadeIn>
                    <li key={key}> 
                        <NavLink 
                            to={item.path}
                            activeStyle={linkActiveStyle}
                        >   {item.icon}
                            <span>{item.name}</span>
                        </NavLink>
                    </li>
                </FadeIn>
            )
        })
    );
}



export default Sidebar;