import { Fetch as FetchApi} from "./Fetch";

const Download = (params) => {
    const req = {
        endPoint:"download",
        fileid:params.fileid
    }

    return FetchApi(req);
}

export { Download }