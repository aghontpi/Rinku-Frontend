import { Fetch as FetchApi} from "./Fetch";

const DownloadLogs = (params) => {
    const req = {
        endPoint:"DownloadLogs",
        data:params
    }

    return FetchApi(req);
}

export { DownloadLogs }