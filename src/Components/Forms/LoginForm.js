import React from "react";

const LoginForm =  (params)  => {
   return ( 
   <form className="ui form" onSubmit={params.formSubmitCallBack}>
        <div className="field">
            <label className="ui left aligned "> Email</label>
           <div className="ui input">
                <input type="text"
                placeholder="Enter your email" 
                name="uname" 
                onChange={params.changeCallBack} 
                value={params.form.uname}
                />    
            </div>
        </div>
        <div className="field">
            <label className=""> Password</label>
            <div className="ui input">
                <input type="password"
                placeholder="Enter password" 
                name="pword"
                onChange={params.changeCallBack} 
                value={params.form.pword}
                />
            </div>
        </div>
        <div className="field">
            <div className="ui checkbox">
                <input 
                    type="checkbox"
                    onChange={params.changeCallBack}
                    name="rmbrFlag"
                    checked={params.form.rmbrFlag}
                  />
                <label>Remember me</label>
            </div>
        </div>
        <div className="field">
            <div className="ui grid padded centered">
                <button 
                    type="submit" 
                    className="ui button primary">
                        Login 
                </button>
            </div>
        </div>
    </form>
   );
}

export default LoginForm;