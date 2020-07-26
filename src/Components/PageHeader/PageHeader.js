import React from "react";
import "./PageHeader.css";
import {Switch, Route} from "react-router-dom";

function PageHeader(props){
    const routes = [
        {location:"/home", content:<FileManager/>},
        {location:"/manage-links", content:<ManageLinks/>},
        {location:"/stats", content:<DownloadStats/>},
        {location:"/download-logs", content:<DownloadLogHeader/>},
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
                                    path={value.location}
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

const ManageLinks = () => {
    return(
        <React.Fragment>
        <h1>
            Browse & Manage links
        </h1>
        <h3>
            Enable or disable links here
        </h3>
    </React.Fragment>
    )
}


const DownloadStats = () => {
    return(
        <React.Fragment>
        <h1>
            Track the download StatisTics
        </h1>
        <h3>
            Currently sorting data is based on all time data.
        </h3>
        </React.Fragment>
    )
}

const DownloadLogHeader = () => {
    return(
        <React.Fragment>
        <h1>
            Track the Download log
        </h1>
        <h3>
            Logs are sorted in reverse Order, (i.e) most recent downloads are shown first.
        </h3>
        </React.Fragment>
    )
}
export default PageHeader;