import axios from "./axios";

class CustomerModule {
    static async get(data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: '/api/v1/customer/',
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Authorization': 'Bearer ' + auth.access,
                },
                
            }).then((result) => {
                console.log(result);
                if (result.status === 200) {
                    res({response: true, data: result.data});
                } else {
                    rej({response: false, data: "invalid"});
                }
            }).catch((reject) => {
                rej({response: false, data: "error"});
            });
        });
    }

    static async add(data, data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: '/api/v1/customer/',
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + auth.access
                },
                data: data
            }).then((result) => {
                console.log(result);
                if (result.status === 201) {
                    res({response: true, data: result.data});
                } else {
                    rej({response: false, data: 'invalid'});
                }
            }).catch((reject) => {
                rej({response: false, data: 'error'});
            });
        });
    }

    static async getDetail(data, data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: '/api/v1/customer_detail/',
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Authorization': 'Bearer ' + auth.access,
                },
                params: data

            }).then((result) => {
                console.log(result);
                if (result.status === 200) {
                    res({response: true, data: result.data});
                } else {
                    rej({response: false, data: "invalid"});
                }
            }).catch((reject) => {
                rej({response: false, data: "error"});
            });
        });
    }
}

export default CustomerModule;