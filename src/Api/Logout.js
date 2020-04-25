import { Fetch as FetchApi} from "./Fetch";

const Logout = () => {
    const req = {
        endPoint:"logout"
    }

    return FetchApi(req);
}

export { Logout }

export default null;