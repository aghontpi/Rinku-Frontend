import React,{useEffect, useState} from "react";
import style from "./style.module.css";
import { managelinks } from "./../../Api/ManageLinks"
import {SnackBar} from "../SnackBar/Snackbar";
function ManageLinks(props){
    const [contents, setContents] = useState({items:10,content:null})
    const [snack, setSnack] = useState(false);
    const [snackProp, setSnackProp] = useState({
        msg:"",
        type:"success"
    });

    useEffect(()=>{
        managelinks({limit:contents.items})
            .then((response)=>  (response.status === 200) ? response.json() : {})
            .then((json)=>{
                    if(json.response === "success"){
                        const list = JSON.parse(json.content.list)
                        const err = ()=>{
                            setSnackProp({
                                msg:'error fetching list from server',
                                type:'success'
                            });
                            setSnack(true)
                        }
                        console.log(list);
                        list ? setContents({limit:contents.item,content:list}) : err();
                    } else {
                        const  err = json.response 
                            ? json.errors.errMsg && json.errors.errMsg
                            : "can not fetch list from server"
                        setSnackProp({
                            msg:err,
                            type:"error"
                        });
                        setSnack(true);
                    }
                })
    },[])

    return (
        <div className="linksholder">
            <div>Links Available</div>
            { contents.content !== null && list(contents) }
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

function list({item, content}){
    return(
        <table className="ui stripped table">
            {
                tableHeader()
            }
            {
                content.map((content, key)=> {
                    return(
                        <tr key={key}> 
                            <td>{itemSpan(content.download_name)}</td>
                            <td>{itemSpan(content.path_of_file)}</td>
                            <td>{itemStatus(content.status)}</td>
                        </tr>
                    );
                })
            }
            {
                tableFooter()
            }
        </table>
    );
}

function tableHeader(){
    return(
        <thead>
            <tr>
                <th>downloadId</th>
                <th>Path</th>
                <th>Status</th>
            </tr>
        </thead>
    );
}

function tableFooter(){
    return(
        <tfoot className="full-width">
            <tr>
                <th colSpan="4">
                    <div className="ui small button disabled" >
                        prev
                    </div>
                    <div className="ui small right floated button">
                        next
                    </div>
                </th>
            </tr>
        </tfoot>
    )
}

function itemSpan(content){
    return(
        <span>{content}</span>
    );
}

function itemStatus(content){
    return (
        <span>{content? "enabled": "disabled"}</span>
    );
}

export default ManageLinks;