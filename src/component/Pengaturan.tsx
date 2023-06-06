import React from "react";
import HelmetTitle from "./etc/HelmetTitle";
import Sidebar from "./etc/Sidebar";
import Navbar from "./etc/Navbar";
import { Button, Tab, Tabs } from "react-bootstrap";

import DataTable from "react-data-table-component";
import { Link, Navigate } from "react-router-dom";
import ModalAddUser from "./modal/ModalAddUser";
import System from "../module/System";
import Auth from "../module/Auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import LoadingButton from "./etc/LoadingButton";


class Pengaturan extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            list_user: {
                column: [
                    {
                        name: "No",
                        selector: row => row.no,
                        width: "100px",
                    },
                    {
                        name: "Nama User",
                        selector: row => row.nama_user,
                    },
                    {
                        name: "Username",
                        selector: row => row.username,
                    },
                    {
                        name: "Bagian",
                        selector: row => row.role
                    },
                    {
                        name: "Tanggal",
                        selector: row => row.created_at,
                    }
                ],

                data: [
                    {
                        no: 1,
                        nama_user: "Aye Shabira",
                        username: "aye",
                        role: "Admin",
                        created_at: "02-03-2023",
                    }
                ],


            },
            user: {
                username: JSON.parse(localStorage.getItem("user-cozyproject")).username,
                old_password: "",
                new_password: "",
            },
            info: {
                img: "",
                first_name: "",
                last_name: "",
                email: "",
            },
            disabled: true,
            loading: false,
            data_auth: localStorage.getItem("user-cozyproject"),
            navigation: false,
            img: "/img_user/profile.png",
            change_profile: false,
        }

        this.openUser = this.openUser.bind(this);
        this.closeUser = this.closeUser.bind(this);
        this.validated = this.validated.bind(this);
        this.handleOldPassword = this.handleOldPassword.bind(this);
        this.handleNewPassword = this.handleNewPassword.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clearState = this.clearState.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleUploadInput = this.handleUploadInput.bind(this);
        this.handleChangeProfile = this.handleChangeProfile.bind(this);

    }

    validated() {
        if (System.isObjectEmpty(this.state.user)) {
            this.setState({ disabled: false });
        } else {
            this.setState({ disabled: true });
        }
    }

    clearState() {
        this.setState({
            user: {
                username: JSON.parse(localStorage.getItem("user-cozyproject")).username,
                old_password: "",
                new_password: "",
            },
        })
    }

    handleOldPassword(e) {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                old_password: e.target.value,
            }
        }), () => {
            this.validated();
        })
    }

    handleNewPassword(e) {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                new_password: e.target.value,
            }
        }), () => {
            this.validated();
        })
    }

    handleChange() {
        this.setState({
            disabled: true,
            loading: true,
        })
        const data = {
            username: this.state.user.username,
            old_password: this.state.user.old_password,
            new_password: this.state.user.new_password,
        }

        Auth.changePassword(data, this.state.data_auth).then((result) => {
            console.log(result);
            this.setState({
                disabled: false,
                loading: false,
                navigation: <Navigate to={'/'} />
            }, () => {
                localStorage.setItem("user-cozyproject", JSON.stringify({ "refresh": "", "access": "", "name": "", "role": 123123, "username": "", "id_user": 123123 }))
            });
            toast.success("Password berhasil diubah");
            this.clearState();
        }).catch((reject) => {
            console.log(reject);
            toast.error("Password gagal diubah");
            this.setState({
                disabled: true,
                loading: false,
            });
            this.clearState();
        })
    }

    openUser() {
        this.setState({
            isOpenUser: true,
        });
    }

    closeUser() {
        this.setState({
            isOpenUser: false,
        })
    }

    handleUploadInput(e) {
        this.setState(prevState => ({
            info: {
                ...prevState.info,
                img: e.target.files
            }
        }));
    }

    handleFirstName(e) {
        this.setState(prevState => ({
            info: {
                ...prevState.info,
                first_name: e.target.value,
            }
        }))
    }

    handleLastName(e) {
        this.setState(prevState => ({
            info: {
                ...prevState.info,
                last_name: e.target.value,
            }
        }))
    }

    handleEmail(e) {
        this.setState(prevState => ({
            info: {
                ...prevState.info,
                email: e.target.value,
            }
        }))
    }

    getUserDetail() {
        const data_auth = localStorage.getItem("user-cozyproject");
        Auth.check(data_auth).then((result: any) => {
            console.log(result);
            if (result.response === true) {
                this.setState(prevState => ({
                    img: result.data.data.detail_user.img,
                    info: {
                        ...prevState.info,
                        first_name: result.data.data.user.first_name,
                        last_name: result.data.data.user.last_name,
                        email: result.data.data.user.email
                    }
                }))
            }
        })
    }

    componentDidMount(): void {
        this.getUserDetail();
    }

    handleChangeProfile() {
        this.setState({
            disabled: true,
            loading: true,
        })
        const data = {
            img: this.state.info.img,
            first_name: this.state.info.first_name,
            last_name: this.state.info.last_name,
            email: this.state.info.email,
            user: JSON.parse(localStorage.getItem("user-cozyproject")).id_user,
        }

        Auth.updateProfile(data, this.state.data_auth).then((result) => {
            console.log(result);
            this.setState({
                disabled: false,
                loading: false,
                change_profile: this.state.info
            }, () => {
                this.getUserDetail();
            });
            toast.success("Detail username berhasil diubah");
        }).catch((reject) => {
            console.log(reject);
            toast.error("Detail username gagal diubah");
            this.setState({
                disabled: true,
                loading: false,
                change_profile: true
            }, () => {
                this.getUserDetail();
            });
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Pengaturan" />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <Sidebar />
                {this.state.navigation}
                <Navbar title="Pengaturan" change={this.state.change_profile} />
                <div className="main">
                    <div className="main-content project">
                        <Tabs
                            defaultActiveKey="info"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey={"info"} title="Info User">
                                <div className="box">
                                    <div className="box-header">
                                        <div className="me-auto">
                                            <h4 className="card-title mb-0 fs-22">Info User</h4>
                                        </div>
                                    </div>

                                    <div className="box-body">
                                        <div className="d-flex mt-3">
                                            <div>
                                                <img className="rounded-circle header-profile-user" width={60} src={`https://cozyhome.api.weworks.ink${this.state.img}`}
                                                    alt="Header Avatar" />
                                            </div>
                                            <div className="align-self-center" style={{ marginLeft: 15 }}>
                                                <input className="form-control" type="file" onChange={this.handleUploadInput} />
                                            </div>
                                        </div>

                                        <hr />
                                        <div className="d-flex">
                                            <div className="form-group flex-fill p-3">
                                                <label htmlFor="">Nama Depan</label>
                                                <input type="text" className="form-control" onChange={this.handleFirstName} value={this.state.info.first_name} />
                                            </div>
                                            <div className="form-group flex-fill p-3">
                                                <label htmlFor="">Nama Belakang</label>
                                                <input type="text" className="form-control" onChange={this.handleLastName} value={this.state.info.last_name} />
                                            </div>
                                        </div>

                                        <div className="form-group flex-fill p-3">
                                            <label htmlFor="">Email</label>
                                            <input type="text" className="form-control" onChange={this.handleEmail} value={this.state.info.email} />
                                        </div>

                                        <div className="text-end">
                                            <button className="btn btn-primary btn-lg fs-16 btn btn-primary" onClick={this.handleChangeProfile}>SIMPAN <LoadingButton show={this.state.loading} /></button>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="profile" title="Profile">
                                <div className="box">
                                    <div className="box-header">
                                        <div className="me-auto">
                                            <h4 className="card-title mb-0 fs-22">Ganti Password</h4>
                                        </div>
                                    </div>

                                    <div className="box-body">
                                        <div className="form-group mt-4">
                                            <label htmlFor="">Password Lama</label>
                                            <input type="password" value={this.state.user.old_password} onChange={this.handleOldPassword} className="form-control" />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="">Password Baru</label>
                                            <input type="password" value={this.state.user.new_password} onChange={this.handleNewPassword} className="form-control" />
                                        </div>
                                        <div className="text-end mt-3">
                                            <Button className="btn btn-primary" disabled={this.state.disabled} onClick={this.handleChange}>Ganti <LoadingButton show={this.state.loading} /></Button>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>

                <ModalAddUser isOpen={this.state.isOpenUser} closeModal={this.closeUser} />
            </>
        )
    }
}

export default Pengaturan;