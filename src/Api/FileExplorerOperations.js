import { Fetch as FetchApi} from "./Fetch";

const FileList = (params) => {
    const req = {
        endPoint:"fileOperation",
        data:params
    }

    return FetchApi(req);
}

export { FileList }

export default null;