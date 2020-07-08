import React from "react";
import { authentication } from "../Routes/HomeRouter";
import { useHistory } from "react-router-dom";
import { Logout as LogoutApi } from "../../Api/Logout";
function Logout(props){
    let history = useHistory()
    return (
        <h4 onClick={ () =>
                        authentication.signOut(
                            () => reloadPage(history)
                        )
                
            }
            >Logout</h4>
    );
}

const reloadPage = (history) => {
    LogoutApi().then((resp)=>{
        return (resp.status === 200) && resp.json();
    }).then((json)=> window.location.reload());
   
}

export default Logout;
