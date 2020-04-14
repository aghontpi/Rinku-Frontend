
const LoginApi = (formInput) => {
    console.log(formInput);
    return fetch('http://localhost/demo.php', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: JSON.stringify(formInput),
        responseType: 'json',
    });
}


export default LoginApi;