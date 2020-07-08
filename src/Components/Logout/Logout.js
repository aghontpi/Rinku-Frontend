import React, { useState } from "react";
import { authentication } from "../Routes/HomeRouter";
import { useHistory } from "react-router-dom";
import { Logout as LogoutApi } from "../../Api/Logout";
import {Loading} from "../Loading/Loading"
function Logout(props){
    let history = useHistory()
    const [loading, setLoading] = useState(false);
    return (<div>
            <Loading show={loading}/>
            <h4 onClick={ () =>
                        authentication.signOut(
                            () => reloadPage(history, setLoading)
                        )
                
            }
            >Logout</h4>
            </div>
    );
}

const reloadPage = (history, loadingCB) => {
    loadingCB(true);
    LogoutApi().then((resp)=>{
        return (resp.status === 200) && resp.json();
    }).then((json)=> loadingCB(false) || window.location.reload());
   
}

export default Logout;
