import axios from "./axios";

class ProgressProject {
    static async add(data_project, data_auth, id):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: '/api/v1/progress/',
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Authorization': 'Bearer ' + auth.access
                },
                data: data_project,
                params: {id: id}
            }).then((result) => {
                console.log(result);
                if (result.status === 201) {
                    res({response: true, data: 'data is saved'});
                } else {
                    rej({response: false, data: 'invalid'});
                }
            }).catch((reject) => {
                rej({response: false, data: 'error'})
            })
        });
    }

    static async get(data, data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: "/api/v1/progress/",
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Authorization": "Bearer " + auth.access
                },
                params: data,
            }).then((result) => {
                console.log(result);
                if (result.status === 200) {
                    res({response: true, data: result.data})
                } else {
                    rej({response: false, data: "invalid"});
                }
            }).catch((reject) => {
                rej({response: false, data: "error"});
            });
        });
    }

    static async getDetail(data):Promise<any> {
        return new Promise((res, rej) => {
            axios({
                url: "/api/v1/progress_detail/",
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
                params: data,
            }).then((result) => {
                console.log(result);
                if (result.status === 200) {
                    res({response: true, data: result.data})
                } else {
                    rej({response: false, data: "invalid"});
                }
            }).catch((reject) => {
                rej({response: false, data: "error"});
            });
        });
    }
}

export default ProgressProject;