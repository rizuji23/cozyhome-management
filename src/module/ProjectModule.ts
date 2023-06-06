import axios from "./axios";

class ProjectModule {
    static async get(data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: "/api/v1/project/",
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Authorization": "Bearer " + auth.access
                },
                data: {},
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

    static async getDetail(data, data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: "/api/v1/project/",
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

    static async getPrint(data, data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: "/api/v1/project_print/",
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

    static async add(data_project, data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: '/api/v1/project/',
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Authorization': 'Bearer ' + auth.access
                },
                data: data_project
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

    static async edit(data_project, data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);

        return new Promise((res, rej) => {
            axios({
                url: '/api/v1/project/',
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Authorization': 'Bearer ' + auth.access
                },
                data: data_project,
                params: {id: data_project.id}
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

    static async delete(id, data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: '/api/v1/project/',
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Authorization': 'Bearer ' + auth.access
                },
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

    static async getCount(data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: "/api/v1/project_count/",
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Authorization": "Bearer " + auth.access
                },
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

export default ProjectModule;