import React, { useEffect, useState } from "react";
import {Loading} from "../Loading/Loading";
import FadeIn from "react-fade-in";
import {DownloadLog} from "./../../Api/DownloadLogs";

export default DownloadLog = (props) => {
    const [logs, setLogs] = useState({limit:10,logs:null});
    const [loading, setLoading] = useState(true);

    // mount trigger
    useEffect(()=>{
        //@todo api hit
        //setLogs
    },[]);

    return (
        <React.Fragment>
              { Loading( props={show:loading}) }
              {logs && <List></List>}
        </React.Fragment>
    );
}

const List = (props) => {
    return (
        <FadeIn>
            <table className="ui stripped table">
                <TableHeader/>
            </table>
        </FadeIn>
    );
}

const TableHeader = (props) => {
    return (
        <thead>
            <tr>
                <th>logId</th>
                <th></th>
                <th></th>
                ...//@todo aditional columns
            </tr>
        </thead>
    );
}

const TableFooter = (props) => {
    return(
        <tfoot>
            <tr>
                //@todo buttons for previous and next.
            </tr>
        </tfoot>
    )
}

const ApiCall = () => {
    DownloadLog({})
}