
const LoginApi = (formInput) => {
    const arr  = {
        "endPoint":"login",
        "data":formInput
    }

    return fetch('http://localhost/index.php', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        credentials: 'include',
        body: JSON.stringify(arr),
        responseType: 'json',
    });
}


export default LoginApi;