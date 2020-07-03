import React,{useState} from 'react';
import "./FileInfo.css";
import {SnackBar} from "../SnackBar/Snackbar";

function FileInfo(props){
    const [snack, setSnack] = useState(false);
    return (
        <div className="ui modal">
            <i className="close icon"></i>
            <div className="header">File info</div>
            <div className="content center-txt">
                <span>file : {props.property.key}</span>
                <br></br>
                <span>download Id : not generated</span>
                <br></br>
            <span>
                <div className="ui approve button" onClick={()=>setSnack(true)}>generate download id</div>
            </span>
            </div>
            {snack && <SnackBar params={{show:true,key:props.property.key,cb:setSnack}}/>}
        </div>
    );
}


export default null;

export { FileInfo };



