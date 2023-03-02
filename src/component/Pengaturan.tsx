import React from "react";
import HelmetTitle from "./etc/HelmetTitle";
import Sidebar from "./etc/Sidebar";
import Navbar from "./etc/Navbar";
import { Button, Tab, Tabs } from "react-bootstrap";

import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import ModalAddUser from "./modal/ModalAddUser";

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

                isOpenUser: false,
            }
        }

        this.openUser = this.openUser.bind(this);
        this.closeUser = this.closeUser.bind(this);
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

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Pengaturan" />

                <Sidebar />
                <Navbar title="Pengaturan" />
                <div className="main">
                    <div className="main-content project">
                        <Tabs
                            defaultActiveKey="home"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="home" title="User">
                                <div className="box">
                                    <div className="box-header">
                                        <div className="me-auto">
                                            <h4 className="card-title mb-0 fs-22">List User</h4>
                                        </div>
                                        <div className='me-3'>
                                            <input type="text" className='form-control' placeholder='Cari User' />
                                        </div>
                                        <div className="card-options pr-3">
                                            <div className="dropdown"> <a href="#" className="btn ripple btn-outline-primary dropdown-toggle fs-14" data-bs-toggle="dropdown" aria-expanded="false"> See All <i className="feather feather-chevron-down"></i> </a>
                                                <ul className="dropdown-menu dropdown-menu-end" role="menu">
                                                    <li><a href="#">Monthly</a></li>
                                                    <li><a href="#">Yearly</a></li>
                                                    <li><a href="#">Weekly</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='ms-3'>
                                            <Button onClick={this.openUser} className='btn btn-primary btn-sm'>Tambah User Baru</Button>
                                        </div>
                                    </div>

                                    <div className="box-body">
                                        <DataTable columns={this.state.list_user.column} data={this.state.list_user.data} pagination />
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
                                            <input type="password" className="form-control" />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="">Password Baru</label>
                                            <input type="password" className="form-control" />
                                        </div>
                                        <div className="text-end mt-3">
                                            <Button className="btn btn-primary">Ganti</Button>
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