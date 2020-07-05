import { Fetch as FetchApi} from "./Fetch";

const managelinks = (params) => {
    const req = {
        endPoint:"managelinks",
        data:params
    }

    return FetchApi(req);
}

export { managelinks }