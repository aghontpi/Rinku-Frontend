
const Login = (formInput) => {
    return fetch('localhost/demo.php', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: JSON.stringify(formInput)
    });
}


export default Login;