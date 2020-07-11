import React from "react";
import "./PageHeader.css";
import {Switch, Route} from "react-router-dom";

function PageHeader(props){
    const routes = [
        {location:"/home/:", content:<FileManager/>}
    ]
    return (
        <div className="page-header">
            <div>
                <Switch>
                    {
                        routes.map((value, index)=>{
                            return(
                                <Route
                                    key={index+props.location.pathname}
                                    path={value.path}
                                    children={value.content}
                                />
                            );
                        })
                    }
                </Switch>
            </div>
        </div>
    );
}

const FileManager = () => {
    return(
        <React.Fragment>
            <h1>
                Explore files
            </h1>
            <h3>
                Make sure you set the correct folder in server
            </h3>
        </React.Fragment>
    )
}

export default PageHeader;