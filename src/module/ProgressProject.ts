import axios from "./axios";

class ProgressProject {
    static async add(data_project, data_auth, id):Promise<any> {
        const formData = new FormData();
        formData.append('nama_progress', data_project.nama_progress)
        formData.append('status', data_project.status)
        formData.append('desc', data_project.desc)
        formData.append('percentage', data_project.percentage)
        formData.append('id_user', data_project.id_user)
        formData.append('foto', data_project.foto[0])
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: '/api/v1/progress/',
                method: 'POST',
                headers: {
                    'Content-Type':  `multipart/form-data;`,
                    'Authorization': 'Bearer ' + auth.access
                },
                data: formData,
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

    static async delete(data_project, data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: '/api/v1/progress/',
                method: 'DELETE',
                headers: {
                    'Content-Type':  `multipart/form-data;`,
                    'Authorization': 'Bearer ' + auth.access
                },
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

    static async update(data_project, data_auth):Promise<any> {
        const formData = new FormData();
        formData.append('nama_progress', data_project.nama_progress)
        formData.append('status', data_project.status)
        formData.append('desc', data_project.desc)
        formData.append('percentage', data_project.percentage)
        formData.append('id_user', data_project.id_user)
        formData.append('foto', data_project.foto[0])
        formData.append('id_project', data_project.id_project)
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: '/api/v1/progress/',
                method: 'PUT',
                headers: {
                    'Content-Type':  `multipart/form-data;`,
                    'Authorization': 'Bearer ' + auth.access
                },
                data: formData,
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