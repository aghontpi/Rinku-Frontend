import React from "react";

const LoginErr  = (params) => {
    return (
        <div className="ui negative message">
            <div className="header">{params.title}</div>
            <p>{params.msg}</p>
        </div>
    );
}


export default LoginErr;