import React,{useEffect, useState} from "react";
import {SnackBar} from "../SnackBar/Snackbar";
import {Chart} from "./Barchar"
function Stats(){
    const [snack, setSnack] = useState(false);
    const [snackProp, setSnackProp] = useState({
        msg:"",
        type:"success"
    });
    return(
        <div className="linksholder">
            <div>stats</div>
            <div style={{height:"600px"}}>
            <Chart/>
            </div>
            
            
            {snack && <SnackBar params={
                {show:true,
                key:1,
                msg:snackProp.msg,
                type:snackProp.type,
                cb:setSnack}
                }/>}
        </div>
    );
}

export { Stats }