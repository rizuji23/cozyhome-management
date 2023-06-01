import React from "react";
import HelmetTitle from "./etc/HelmetTitle";
import Sidebar from "./etc/Sidebar";
import Navbar from "./etc/Navbar";
import { Tab, Tabs } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Stok from "../module/Stok";
import moment from 'moment';
import LoadingFull from "./etc/LoadingFull";

class StokGudang extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            list_stok_gudang: {
                column: [
                    {
                        name: "No",
                        selector: row => row.no,
                        width: "100px"
                    },
                    {
                        name: "Nama Material",
                        selector: row => row.nama_material,
                    },
                    {
                        name: "Kategori",
                        selector: row => row.kategori_material,
                    },
                    {
                        name: "Stok",
                        selector: row => row.stok,
                    },
                    {
                        name: "Tanggal Dibuat",
                        selector: row => row.created_at,
                    },
                    {
                        name: "Tanggal Diupdate",
                        selector: row => row.updated_at,
                    }
                ],
                data: []
            },

            list_stok_masuk: {
                column: [
                    {
                        name: "No",
                        selector: row => row.no,
                        width: "100px"
                    },
                    {
                        name: "Nama Material",
                        selector: row => row.nama_material,
                    },
                    {
                        name: "Kategori",
                        selector: row => row.kategori_material,
                    },
                    {
                        name: "Stok Masuk",
                        selector: row => row.stok_in,
                    },
                    {
                        name: "Tanggal",
                        selector: row => row.created_at,
                    }
                ],

                data: []
            },


            list_stok_keluar: {
                column: [
                    {
                        name: "No",
                        selector: row => row.no,
                        width: "100px"
                    },
                    {
                        name: "Nama Material",
                        selector: row => row.nama_material,
                    },
                    {
                        name: "Kategori",
                        selector: row => row.kategori_material,
                    },
                    {
                        name: "Stok Keluar",
                        selector: row => row.stok_out,
                    },
                    {
                        name: "Projek",
                        selector: row => row.nama_project,
                    },
                    {
                        name: "Tanggal",
                        selector: row => row.created_at,
                    }
                ],

                data: []
            },
            data_auth: localStorage.getItem("user-cozyproject"),
            stok_all: "loading...",
            stok_in: "loading...",
            stok_out: "loading...",
            loading: true,
        }

        this.getStokGudang = this.getStokGudang.bind(this);
        this.getStokIn = this.getStokIn.bind(this);
        this.getStokOut = this.getStokOut.bind(this);
    }

    getStokGudang() {
        this.setState({
            loading: true,
        })
        Stok.get(this.state.data_auth).then((result) => {
            console.log(result);

            let no = 1;
            result.data.data.stok.map(el => {
                el['no'] = no++;
                el['created_at'] = moment(el.created_at).format("DD-MM-YYYY HH:mm:ss");
                el['updated_at'] = moment(el.updated_at).format("DD-MM-YYYY HH:mm:ss");
            })

            this.setState(prevState => ({
                list_stok_gudang: {
                    ...prevState.list_stok_gudang,
                    data: result.data.data.stok,
                },
                loading: false,
            }))
        }).catch((rejects) => {
            console.log(rejects);
        });
    }

    getStokIn() {
        this.setState({
            loading: true,
        })
        Stok.getIn(this.state.data_auth).then((result) => {
            console.log(result);

            let no = 1;
            result.data.data.stok_in.map(el => {
                el['no'] = no++;
                el['created_at'] = moment(el.created_at).format("DD-MM-YYYY HH:mm:ss");
                el['updated_at'] = moment(el.updated_at).format("DD-MM-YYYY HH:mm:ss");
            })

            this.setState(prevState => ({
                list_stok_masuk: {
                    ...prevState.list_stok_masuk,
                    data: result.data.data.stok_in,
                },
                loading: false,
            }))
        }).catch((rejects) => {
            console.log(rejects);
        });
    }

    getStokOut() {
        this.setState({
            loading: true,
        })
        Stok.getOut(this.state.data_auth).then((result) => {
            console.log(result);

            let no = 1;
            result.data.data.stok_out.map(el => {
                el['no'] = no++;
                el['created_at'] = moment(el.created_at).format("DD-MM-YYYY HH:mm:ss");
                el['updated_at'] = moment(el.updated_at).format("DD-MM-YYYY HH:mm:ss");
            })

            this.setState(prevState => ({
                list_stok_keluar: {
                    ...prevState.list_stok_keluar,
                    data: result.data.data.stok_out,
                },
                loading: false,
            }));
        }).catch((rejects) => {
            console.log(rejects);
        });
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevState.loading !== this.state.loading) {
            this.getCountStok();
        }
    }

    componentDidMount(): void {
        this.getStokGudang();
        this.getStokIn();
        this.getStokOut();
        this.getCountStok();
    }

    getCountStok() {
        Stok.getCount(this.state.data_auth).then((result) => {
            console.log(result);
            this.setState({
                stok_all: result.data.data.count.stok_gudang,
                stok_in: result.data.data.count.stok_in,
                stok_out: result.data.data.count.stok_out,
            });
        }).catch((rejects) => {
            console.log(rejects);
        })


    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Stok Gudang" />
                <LoadingFull display={this.state.loading} />
                <Sidebar />
                <Navbar title="Stok Gudang" />
                <div className="main">
                    <div className="main-content project">
                        <div className="box mb-3">
                            <div className="box-body">
                                <div className="row">
                                    <div className="">
                                        <div className="box card-box">
                                            <div className="icon-box bg-color-6 d-block">
                                                <div className="content text-center color-6">
                                                    <h5 className="title-box fs-17 font-w500">Total Stok Semua</h5>
                                                    <div className="themesflat-counter fs-18 font-wb">
                                                        <span className="number" data-from="0" data-to="309" data-speed="2500" data-inviewport="yes">{this.state.stok_all} +</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="icon-box bg-color-7 d-block">
                                                <div className="content text-center color-7">
                                                    <h5 className="title-box fs-17 font-w500">Total Stok Masuk</h5>
                                                    <div className="themesflat-counter fs-18 font-wb">
                                                        <span className="number" data-from="0" data-to="309" data-speed="2500" data-inviewport="yes">{this.state.stok_in} +</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="icon-box bg-color-9 d-block">
                                                <div className="content text-center color-9">
                                                    <h5 className="title-box fs-17 font-w500">Total Stok Keluar</h5>
                                                    <div className="themesflat-counter fs-18 font-wb">
                                                        <span className="number" data-from="0" data-to="309" data-speed="2500" data-inviewport="yes">{this.state.stok_out} -</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <Tabs
                            defaultActiveKey="home"
                            id="uncontrolled-tab-example"
                            className="mb-3">

                            <Tab eventKey="home" title="List Stok Gudang">
                                <div className="box">
                                    <div className="box-header">
                                        <h3 className="fs-22">Stok Gudang</h3>
                                    </div>

                                    <div className="box-body">
                                        <DataTable columns={this.state.list_stok_gudang.column} data={this.state.list_stok_gudang.data} pagination />
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="profile" title="List Stok Masuk">
                                <div className="box">
                                    <div className="box-header">
                                        <h3 className="fs-22">Stok Masuk</h3>
                                    </div>

                                    <div className="box-body">
                                        <DataTable columns={this.state.list_stok_masuk.column} data={this.state.list_stok_masuk.data} pagination />
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="contact" title="List Stok Keluar">
                                <div className="box">
                                    <div className="box-header">
                                        <h3 className="fs-22">Stok Keluar</h3>
                                    </div>

                                    <div className="box-body">
                                        <DataTable columns={this.state.list_stok_keluar.column} data={this.state.list_stok_keluar.data} pagination />
                                    </div>
                                </div>
                            </Tab>

                        </Tabs>
                    </div>
                </div>
            </>
        )
    }
}

export default StokGudang;