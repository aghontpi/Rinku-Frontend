
const FileList = (params) => {
    const req = {
        endPoint:"fileOperation",
        data:params
    }

    return fetch('http://localhost/demo.php', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        credentials: 'include',
        body: JSON.stringify(req),
        responseType: 'json',
    });
}

export { FileList }

export default null;