import { Fetch as FetchApi} from "./Fetch";

const Stats = (params) => {
    const req = {
        endPoint:"stats",
        data:params
    }

    return FetchApi(req);
}

export { Stats }