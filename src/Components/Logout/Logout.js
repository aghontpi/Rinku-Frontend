import React, { useState } from "react";
import { authentication } from "../Routes/HomeRouter";
import { useHistory } from "react-router-dom";
import { Logout as LogoutApi } from "../../Api/Logout";
import {Loading} from "../Loading/Loading"
import {LogOut} from "react-feather";
function Logout(props){
    let history = useHistory()
    const [loading, setLoading] = useState(false);
    return (
            <React.Fragment>
                <Loading show={loading}/>
                <span onClick={ () =>
                    authentication.signOut(
                        () => reloadPage(history, setLoading)
                    )
                }
                    style={{margin:"8px", display:"inline-block", cursor:"pointer"}}
                    data-tooltip="logout" data-position="bottom center" data-inverted=""
                    >
                    <LogOut size="12px"/>
                </span>
            </React.Fragment>
    );
}

const reloadPage = (history, loadingCB) => {
    loadingCB(true);
    LogoutApi().then((resp)=>{
        return (resp.status === 200) && resp.json();
    }).then((json)=> loadingCB(false) || window.location.reload());
   
}

export default Logout;
