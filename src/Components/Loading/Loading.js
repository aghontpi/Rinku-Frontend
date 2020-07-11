import React from "react";
import Lottie from "react-lottie";
import ReactDOM from "react-dom";
import "./loading.css";
import * as cLoading from "./circle-loading.json"
import FadeIn from "react-fade-in";

const Loading = (props) => {
    const options = {
        loop: true,
        autoplay: true,
        animationData: cLoading.default,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    const content = 
        props && props.show ?
            <div className="loading-container">
                <div className="loading-contents">
                    <FadeIn>
                        <Lottie options={options} width="400px" height="400px" speed={1.5}/> 
                    </FadeIn>
                </div>
                
            </div>
            : "";
    
        
    return ReactDOM.createPortal(content,document.getElementsByTagName('body')[0]);
}

export {Loading}
