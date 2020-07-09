import {authentication} from "../Components/Routes/HomeRouter"
import {checkLoggedIn} from "../Components/Login/Login"

const redirect = () => authentication.signOut(()=>window.location.reload())

const Fetch = async (params) => {
    console.log(params)
    params.endPoint !== "login" && params.endPoint !== "download" && params.endPoint !== "logout" && !checkLoggedIn()  && redirect();
    await new Promise(resolve => setTimeout(resolve, Math.random()*(1000 - 450) + 450));
    let response =  fetch('http://localhost/index.php', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        credentials: 'include',
        body: JSON.stringify(params),
        responseType: 'json',
    });
    ((await response).status === 400) && redirect()
        
    return await response;
}

export { Fetch }

export default null;
