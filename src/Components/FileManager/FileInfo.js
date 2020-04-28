import React from 'react';
import "./FileInfo.css";

function FileInfo(props){
    console.log(props);
    return (
        <div className="ui modal">
            <i class="close icon"></i>
            <div class="header">File info</div>
            <div class="content center-txt">
                <span>file : {props.property.key}</span>
                <br></br>
                <span>download Id : not generated</span>
                <br></br>
            <span>
                <div class="ui approve button">generate download id</div>
            </span>
            </div>
        </div>
    );
}


export default null;

export { FileInfo };



