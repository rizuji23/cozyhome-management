import axios from "./axios";

class Auth {
    static async login(data):Promise<any> {
        return new Promise((res, rej) => {
            axios({
                url: 'api/v1/login/',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                data: data
            }).then((result) => {
                console.log(result);
                if (result.status === 200) {
                    res({response: true, data: result.data});
                } else {
                    rej({response: false, data: 'invalid'});
                }
            }).catch((reject) => {
                rej({response: false, data: "Username Atau Password Salah"});
            });
        });
    }

    static async check(data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: '/api/v1/user/',
                method: 'GET',
                params: {username: auth.username},
                headers: {
                    Accept: 'application/json',
                    'Authorization': 'Bearer ' + auth.access,
                }
            }).then((result) => {
                console.log(result);
                if (result.status === 200) {
                    res({response: true, data: result.data});
                } else {
                    rej({response: false, data: 'invalid'});
                }
            }).catch((reject) => {
                rej({response: false, data: 'error'});
            });
        });
    }

}

export default Auth;