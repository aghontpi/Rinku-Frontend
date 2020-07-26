import React, { useEffect, useState } from "react";
import {Loading} from "../Loading/Loading";
import FadeIn from "react-fade-in";
import {DownloadLogs as api} from "./../../Api/DownloadLogs";
import {usePrevious} from "../Utils";
import {SnackBar} from "../SnackBar/Snackbar";
import {itemSpan, link, tableFooter} from "../ManageLinks/ManageLinks"

export const DownloadLog = (props) => {
    const [logs, setLogs] = useState({limit:10,logs:null});
    const [loading, setLoading] = useState(false);
    const [snack, setSnack] = useState(false);
    const [snackProp, setSnackProp] = useState({
        msg:"",
        type:"success"
    });
    const prevcontent = usePrevious(logs);

    const apiCallWrapper = () => {
        setLoading(true);
        ApiCall(
            {logs,setLogs},
            setLoading,
            {setSnackProp,setSnack}
        );
    }

    // mount trigger
    useEffect(()=>{
        apiCallWrapper()
        window.$('table').transition('fade up');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    // only make apicall if there is a change
    useEffect(() => {
        prevcontent && logs.limit !== prevcontent.limit && apiCallWrapper();
    }, [logs])

    return (
        <React.Fragment>
              { Loading( props={show:loading}) }
              {logs.logs && <List {...logs} setLogs={setLogs}></List>}
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

const List = ({limit, logs, setLogs}) => {
    return (
        <FadeIn>
            <table className="ui striped table">
                <TableHeader/>
                <TableBody logs = {logs}/>
                <TableFooter limit={limit} logs={logs} setLogs={setLogs}/>
            </table>
        </FadeIn>
    );
}

const TableHeader = (props) => {
    return (
        <thead>
            <tr>
                <th>logId</th>
                <th>download id/path</th>
                <th>user agent</th>
                <th>ip</th>
                <th>user (nick)</th>
                <th>download time</th>
            </tr>
        </thead>
    );
}

const TableBody = ({logs}) => {
    {
        return(
            
                logs && logs.map(({
                            download_log_id,
                            id,
                            path,
                            ip,
                            user_agent,
                            user,
                            time
                        }, key)=>{
                    return(
                        <tr key={key}> 
                            <td>{itemSpan(download_log_id)}</td>
                            <td>{itemSpan(link(path,id))}</td>
                            <td>{itemSpan(user_agent)}</td>
                            <td>{itemSpan(ip)}</td>
                            <td>{itemSpan(user)}</td>
                            <td>{itemSpan(time)}</td>
                    </tr>
                    );
                })
        );
    }
}

const TableFooter = ({limit, logs, setLogs}) => {
    const modifyItems = (value)=> {
        value && setLogs((prevstate)=>{
            const itemsChange = (+prevstate.limit) + (+value) 
            return{
                logs:null,
                limit: itemsChange,
            }
        });
    }

    const nextBtnClick = () => {
        modifyItems(+10)
    };
    const prevBtnClick = () => {
        modifyItems(-10)
    }
    return(
        tableFooter(
            {items:limit,count:logs.length},
            {prev:prevBtnClick,next:nextBtnClick},
            6
        )
        
    );
}


const ApiCall = ({logs, setLogs},setLoading,{setSnackProp, setSnack}) => {
    api({limit:logs.limit})
        .then((response)=>  (response.status === 200) ? response.json() : {})
        .then((json)=>{
            setLoading(false);
            if(json.response === "success"){
                const list = JSON.parse(json.logs.list)
                const err = ()=>{
                    setSnackProp({
                        msg:'error fetching list from server',
                        type:'success'
                    });
                    setSnack(true)
                }
                list ? setLogs((prevstate) => {
                            return {limit:prevstate.limit,logs:list}
                        }) 
                    : err();
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
}
