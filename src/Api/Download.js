import { Fetch as FetchApi} from "./Fetch";

const Download = (params) => {
    const req = {
        endPoint:"download",
        data:params
    }

    return FetchApi(req);
}

export { Download }