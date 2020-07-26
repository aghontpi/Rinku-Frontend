import React, { useState, useEffect } from "react";
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
import {DownloadLog} from "../DownloadLog/DownloadLog";
import {Compass, BarChart2, Filter, Archive, ArrowRight, ArrowLeft} from "react-feather";
import {useWindowDimensions} from "./../Utils/"


function Sidebar(props){

    const [menuStyle, setMenuStyle] = useState({});
    const { height, width } = useWindowDimensions();

    const fadeInWrapper = (component) => {
        return(
            <FadeIn>
                {component}
            </FadeIn>
        );
    }

    useEffect(()=>{
        width < 768 && menuStyle && menuStyle.left && menuStyle.left === "0px" && setMenuStyle({left:"-220px"});
        width >= 768 && menuStyle && menuStyle.left && menuStyle.left !== "0px" && setMenuStyle({left:"0px"});
    },[width]);
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
        {
            path:"/download-logs",
            exact:true,
            children: () =>  fadeInWrapper(<DownloadLog/>),
            name:"download log", 
            icon:<Archive className="navIcon"/>
        },
    ];

    let userNickName = sessionStorage.getItem('nick');
    if(userNickName == null) userNickName = "user";
    
    return(
        <Router>
            <div className="menu-icon noselect" onClick={()=>setMenuStyle({left:"0px"})}>
                <span>
                    <ArrowRight className="navIcon"/>
                </span>
            </div>
            <div className="main-sidebar" style={menuStyle} >
                <div className="hide-sidebar noselect" onClick={()=> setMenuStyle({left:"-220px"})}>
                    <span className="closeArrow">
                        <ArrowLeft className="navIcon"/>
                    </span>
                </div>
                <div className="user-title">
                    <FadeIn>
                    <h4>Hi {userNickName}</h4>
                    <Logout/>
                    </FadeIn>
                </div>
                
                <div className="user-content">
                    <ul className="user-menuitems">
                        {navItems(
                            routes,
                            width,
                            ()=>setMenuStyle({left:"-220px"}),
                        )
                        }
                    </ul>
                </div>
            </div>
            { routes && <PageHolder routes={routes}/> }
        </Router>
    );
}

const navItems = (items,width, hideSideBar) => {
    const linkActiveStyle = {
        color:"#f5deb3"
      }

    const hideClickForMobileDevices = () =>{
        if(width < 768){
            hideSideBar();
        }
        // on item click scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    return(
        items.map((item,key)=>{
            return(
                <FadeIn>
                    <li key={key}> 
                        <NavLink 
                            onClick={()=>{ hideClickForMobileDevices() }}
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