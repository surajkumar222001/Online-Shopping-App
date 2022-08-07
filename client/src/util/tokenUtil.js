
import axios from "axios";


export const isAuthenticate = (token) => {
    if (token){
        return axios.defaults.headers.common['x-auth-token'] = token;
    }
    else {
        delete axios.defaults.headers.common['x-auth-token']
    }
}