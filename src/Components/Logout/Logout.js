import React from "react";
import { authentication } from "../Routes/HomeRouter";
import { useHistory } from "react-router-dom";

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
 history.push("/");
   
}

export default Logout;
