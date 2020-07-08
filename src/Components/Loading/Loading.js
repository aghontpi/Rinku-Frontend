import React from "react";
import Lottie from "react-lottie";
import ReactDOM from "react-dom";
import ReactLoading from "react-loading";
import "./loading.css";

const Loading = (props) => {
    // const content = 
    //     props && props.show ?
    //         <div className="loading-container">
    //             <div className="loading-contents">
    //                 <ReactLoading type={"bubbles"} color={"black"} />
    //             </div>
    //         </div>
    //         : "";
    let content = 
            <div className="loading-container">
                <div className="loading-contents">
                    <ReactLoading type={"bubbles"} color={"black"} />
                </div>
            </div>
    
        
    return ReactDOM.createPortal(content,document.getElementsByTagName('body')[0]);
}

export {Loading}