import axios from "./axios";

class PekerjaanLain {
    static async get(data, data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: "/api/v1/pekerjaan_lain/",
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Authorization": "Bearer " + auth.access
                },
                params: {id: data.id}
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

    static async add(data, data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: "/api/v1/pekerjaan_lain/",
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Authorization": "Bearer " + auth.access
                },
                data: data
            }).then((result) => {
                console.log(result);
                if (result.status === 201) {
                    res({response: true, data: result.data})
                } else {
                    rej({response: false, data: "invalid"});
                }
            }).catch((reject) => {
                rej({response: false, data: "error"});
            });
        });
    }

    static async update(data, data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: "/api/v1/pekerjaan_lain/",
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Authorization": "Bearer " + auth.access
                },
                data: data,
                params: {id: data.id_pekerjaan_lain}
            }).then((result) => {
                console.log(result);
                if (result.status === 201) {
                    res({response: true, data: result.data})
                } else {
                    rej({response: false, data: "invalid"});
                }
            }).catch((reject) => {
                rej({response: false, data: "error"});
            });
        });
    }

    static async delete(data, data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: "/api/v1/pekerjaan_lain/",
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Authorization": "Bearer " + auth.access
                },
                data: data,
                params: {id: data.id_pekerjaan_lain}
            }).then((result) => {
                console.log(result);
                if (result.status === 201) {
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

export default PekerjaanLain;