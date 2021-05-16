import { authentication } from "../Components/Routes/HomeRouter"
import { checkLoggedIn } from "../Components/Login/Login"
// override the server url, if the server files are not in root
// ex: const serverUrl = "some-domain.com-or-ip/path/to/directory/"; 
const serverUrl = window.location.protocol + "//" + window.location.hostname + "/index.php";
const redirect = () => authentication.signOut(() => window.location.reload())
const Fetch = async (params) => {
    params.endPoint !== "login" && params.endPoint !== "download" && params.endPoint !== "logout" && !checkLoggedIn() && redirect();
    // intoduce random delay for modules other than update
    params && params.data && !params.data.update && await new Promise(resolve => setTimeout(resolve, Math.random() * (1000 - 450) + 450));
    await new Promise(resolve => setTimeout(resolve, Math.random() * (1000 - 450) + 450));
    let response = fetch(serverUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(params),
        responseType: 'json',
    });
    ((await response).status === 400) && redirect()

    return await response;
}

export { Fetch }

