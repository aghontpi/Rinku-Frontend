import { Fetch as FetchApi} from "./Fetch";

const LoginApi = (formInput) => {
    const arr  = {
        "endPoint":"login",
        "data":formInput
    }

    return FetchApi(arr);
}


export default LoginApi;