import React,{useState,useEffect} from 'react';
import "./FileInfo.css";
import {SnackBar} from "../SnackBar/Snackbar";
import {CreateDL} from "../../Api/CreateDL";

function FileInfo(props){
    const [snack, setSnack] = useState(false);
    const file = props.property.key;
    const [snackProp, setSnackProp] = useState({
        msg:"",
        type:"success"
    });
    const loadingMsg = "loading..";
    const [downloadId, setDownloadId] = useState(loadingMsg);
    
    useEffect(() => {
        setDownloadId(loadingMsg)
    },[file])


    return (
        <div className="ui modal">
            <i className="close icon"></i>
            <div className="header">File info</div>
            <div className="content center-txt">
                <span>file : {file}</span>
                <br></br>
                    <span>download Id : { downloadId}</span>
                <br></br>
            <span>
                <div className={" ui approve button " + 
                    (downloadId !== loadingMsg ? " disabled ": "" ) } 
                    onClick={
                        ()=>requestDL(
                            file,
                            setSnack,
                            setSnackProp,
                            setDownloadId
                        )
                    }>generate download id</div>
            </span>
            </div>
            {snack && <SnackBar params={
                {show:true,
                key:props.property.key,
                msg:snackProp.msg,
                type:snackProp.type,
                cb:setSnack}
                }/>}
        </div>
    );
}

function requestDL(file,snackBarCB,snackBarPropCB,downloadIdCB){
    let promise = CreateDL({file:file});
    promise.then((response)=>{
        return (response.status === 200) ? response.json() : {};
    }).then((json)=>{
        if(json.response === "success"){
            snackBarPropCB({
                msg:json.content.Msg,
                type:"success"
            });
            downloadIdCB(json.content.downloadId);
            snackBarCB(true);
        } else if(json.response === "error"){
            snackBarPropCB({
                msg:json.errors.errMsg,
                type:"error"
            });
            snackBarCB(true);
        }
    });
    snackBarCB(true)
}


export default null;

export { FileInfo };



