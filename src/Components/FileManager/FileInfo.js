import React, { useState, useEffect } from 'react';
import "./FileInfo.css";
import { SnackBar } from "../SnackBar/Snackbar";
import { CreateDL } from "../../Api/CreateDL";
import { Download } from "../../Api/Download";
const def_msg = "id not yet generated";
function FileInfo(props) {
    const [snack, setSnack] = useState(false);
    const file = props.property.key;
    const [snackProp, setSnackProp] = useState({
        msg: "",
        type: "success"
    });
    const [loadingMsg, setLoadingMsg] = useState("loading..");
    const [downloadId, setDownloadId] = useState(loadingMsg);


    // check whether a download link has already been generated.
    useEffect(() => {
        let promise = Download({ filepath: file });
        promise.then((response) => {
            return (response.status === 200) ? response.json() : {};
        }).then((json) => {
            if (json.response === "success") {
                setLoadingMsg(
                    linkComponent(
                        json.content.file.downloadName ?
                            json.content.file.downloadName :
                            json.content.file
                    )
                );
            } else if (json.response === "error") {
                setSnackProp({
                    msg: "can not query file info from server side",
                    type: "error"
                });
                setSnack(true);
            }
        });

    }, [file]);

    useEffect(() => {
        setDownloadId(loadingMsg)
    }, [file, loadingMsg])



    return (
        <div className="ui modal">
            <i className="close icon"></i>
            <div className="header">File info</div>
            <div className="content center-txt">
                <span>file : {file}</span>
                <br></br>
                <span>download Id : {downloadId === "loading.." ?
                    downloadId : linkComponent(downloadId)
                }</span>
                <br></br>
                <span>
                    <div className={" ui approve button " +
                        ((downloadId !== def_msg) ? " disabled " : "")}
                        onClick={
                            () => requestDL(
                                file,
                                setSnack,
                                setSnackProp,
                                setDownloadId
                            )
                        }>generate download id</div>
                </span>
            </div>
            {snack && <SnackBar params={
                {
                    show: true,
                    key: props.property.key,
                    msg: snackProp.msg,
                    type: snackProp.type,
                    cb: setSnack
                }
            } />}
        </div>
    );
}

function requestDL(file, snackBarCB, snackBarPropCB, downloadIdCB) {
    let promise = CreateDL({ file: file });
    promise.then((response) => {
        return (response.status === 200) ? response.json() : {};
    }).then((json) => {
        if (json.response === "success") {
            snackBarPropCB({
                msg: json.content.Msg,
                type: "success"
            });
            downloadIdCB(json.content.downloadId);
            snackBarCB(true);
        } else if (json.response === "error") {
            snackBarPropCB({
                msg: json.errors.errMsg,
                type: "error"
            });
            snackBarCB(true);
        }
    });
}

function linkComponent(id) {
    return (id === def_msg)
        ? id
        : <a target="blank" href={"../download/" + id}> {id}</a>;
}




export { FileInfo };



