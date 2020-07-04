import { Fetch as FetchApi} from "./Fetch";

const CreateDL = (params) => {
    const req = {
        endPoint:"createDL",
        data:params
    }

    return FetchApi(req);
}

export { CreateDL }