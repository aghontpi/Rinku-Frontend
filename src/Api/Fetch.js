
const Fetch = async (params) => {
    await new Promise(resolve => setTimeout(resolve, Math.random()*(1000 - 450) + 450));
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
