import React from "react";
import {Switch, Route} from "react-router-dom";
import "./PageHolder.css";
import PageHeader from "./../PageHeader/PageHeader";
import FadeIn from "react-fade-in";


const PageHolder = (props) => {
    return(
        <div className="page-holder">
        <PageHeader />
            
                <div className="actual-page">
                <FadeIn delay="100" transitionDuration="800">
                    <div className="title-holder">
                        <div className="page-title">
                        </div>
                    </div>
                    <Switch>
                        { 
                            props.routes.map((routes, index) => {
                                return(
                                <Route
                                    key={index}
                                    path={routes.path}
                                    exact={routes.exact}
                                    children={routes.children}
                                />
                                )
                            })
                            
                        }
                    </Switch>
                    </FadeIn>
                </div>
        </div>
    );
}

export default PageHolder;