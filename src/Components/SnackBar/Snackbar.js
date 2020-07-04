import React, {useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import snackStyle from "./snackbar.module.css";
// note the first letter to be capatilized for react hook
const SnackBar = ({params}) => {
    const [show, setShow] = useState(params.show);
    const [fade, setFade] = useState(params.show);
    /* after fadein effect immediate fadeout trigger */
    useEffect(()=>{
            setFade(false);
    },[]);

    /* after the fadeout occurs remove the content */
    useEffect(()=>{
        setTimeout(()=>{
            setShow(false);
        },2500);
    });

    /* after hiding content, remove snackbar from page */
    useEffect(()=>{
        !show && params.cb(false);
    },[show,params]);

    /* decide fade in/out */
    let classnames = snackStyle.snackDiv  + (fade? " fadein ": " fadeout ");

    const msg = params.msg && params.msg.trim() !== "" 
        ? params.msg : "please provide message here!" 

    const type = params.type && params.type.trim() !== "" 
    ? params.type : "success" 


    const content =  (show && params.key) ? (
        <div className={classnames} >
            <div className={"ui floating compact "+ type +" message "}>
                <p>{msg}</p>
            </div>
        </div>
    ): "";
    /* createPortal to insert into body tag */
    return ReactDOM.createPortal(content,document.getElementsByTagName('body')[0]);
}


export {SnackBar}

export default null;
