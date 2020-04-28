
const Fetch = (params) => {
    return fetch('http://localhost/index.php', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        credentials: 'include',
        body: JSON.stringify(params),
        responseType: 'json',
    });
}

export { Fetch }

export default null;
