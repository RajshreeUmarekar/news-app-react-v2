import { setCookie } from "typescript-cookie";
import instance from "./axios";

export async function authenticate(credentials:any) {
    await instance.get('/login', {
        params : {username:credentials.username, password: credentials.password}
    })
    .then((response) => {
        setCookie('username', credentials.username);
        setCookie('password', credentials.password);
        if(response.data === 'Login Success'){
            setCookie('login_success', true);
        }else if(response.data === 'Login Failure'){
            setCookie('login_success', false);
        }
    })
    .catch((error) => {
        console.error(error);
        console.log("Request failed!");
    });
}

