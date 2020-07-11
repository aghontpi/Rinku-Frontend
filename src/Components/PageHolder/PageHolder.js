import React from "react";
import {Switch, Route, useLocation} from "react-router-dom";
import "./PageHolder.css";
import PageHeader from "./../PageHeader/PageHeader";
import FadeIn from "react-fade-in";
import {
    TransitionGroup,
    CSSTransition
  } from "react-transition-group";


const PageHolder = (props) => {
    let windowLocation = useLocation();
    return(
        <div className="page-holder">
        <PageHeader location={windowLocation}/>

                <div className="actual-page">
                    <FadeIn delay="100" transitionDuration="800">
                        <div className="title-holder">
                            <div className="page-title">
                            </div>
                        </div>
                            <TransitionGroup>
                                <CSSTransition
                                    key={windowLocation.key}
                                    classNames="routeTransition"
                                    timeout={{ enter: 300, exit: 300 }}
                                >
                                <div className="page-render-area">
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
                                </div>
                                </CSSTransition>
                            </TransitionGroup>
                    </FadeIn>
                </div>
        </div>
    );
}

export default PageHolder;