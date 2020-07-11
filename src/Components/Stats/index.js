import React,{useEffect, useState} from "react";
import {SnackBar} from "../SnackBar/Snackbar";
import {Chart} from "./Barchar";
import {Stats as Sapi} from "../../Api/Stats";
import {Loading} from "../Loading/Loading";
import FadeIn from "react-fade-in";

function Stats(){
    const [snack, setSnack] = useState(false);
    const [snackProp, setSnackProp] = useState({
        msg:"",
        type:"success"
    });
    const [stats,setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        Sapi({date:"datehere"})
            .then((response)=>  (response.status === 200) ? response.json() : {})
            .then((json)=>{
                setLoading(false);
                if(json.response !== "success"){
                    const  err = json.response 
                                ? json.errors.errMsg && json.errors.errMsg
                                : "can not fetch list from server"
                    setSnackProp({
                            msg:err,
                            type:"error"
                        });
                    setSnack(true);
                    return;
                }
                const stats = JSON.parse(json.content.stats);
                const err = ()=>{
                    setSnackProp({
                        msg:'error fetching stats from server',
                        type:'success'
                    });
                    setSnack(true)
                }
                stats ? setStats(stats) : err();  

            })
    },[])

    return(
        <React.Fragment>
            <FadeIn>
            <Loading show={loading}/>
            <div style={{height:"600px"}}>
                <Chart stats={stats}/>
            </div>
            </FadeIn>
            
            {snack && <SnackBar params={
                {show:true,
                key:1,
                msg:snackProp.msg,
                type:snackProp.type,
                cb:setSnack}
                }/>}
        </React.Fragment>
    );
}

export { Stats }