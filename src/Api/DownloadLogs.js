import { Fetch as FetchApi} from "./Fetch";

const DownloadLogs = (params) => {
    const req = {
        endPoint:"downloadLogs",
        data:params
    }

    return FetchApi(req);
}

export { DownloadLogs }