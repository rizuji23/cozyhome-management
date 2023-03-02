import React from "react";
import HelmetTitle from "./etc/HelmetTitle";
import Sidebar from "./etc/Sidebar";
import Navbar from "./etc/Navbar";
import { Tab, Tabs } from "react-bootstrap";
import DataTable from "react-data-table-component";

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
                        selector: row => row.kategori,
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
                data: [
                    {
                        no: 1,
                        nama_material: "Triplek",
                        kategori: "HVL",
                        stok: "20 Buah",
                        created_at: "02-03-2023",
                        updated_at: "03-03-2023 10:30:10",
                    }
                ]
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
                        selector: row => row.kategori,
                    },
                    {
                        name: "Stok Masuk",
                        selector: row => row.stok_masuk,
                    },
                    {
                        name: "Tanggal",
                        selector: row => row.created_at,
                    }
                ],

                data: [
                    {
                        no: 1,
                        nama_material: "Triplek",
                        kategori: "HVL",
                        stok_masuk: "20 Buah",
                        created_at: "02-03-2023",
                    },
                    {
                        no: 2,
                        nama_material: "Triplek",
                        kategori: "HVL",
                        stok_masuk: "10 Buah",
                        created_at: "03-03-2023",
                    }
                ]
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
                        selector: row => row.kategori,
                    },
                    {
                        name: "Stok Keluar",
                        selector: row => row.stok_keluar,
                    },
                    {
                        name: "Tanggal",
                        selector: row => row.created_at,
                    }
                ],

                data: [
                    {
                        no: 1,
                        nama_material: "Triplek",
                        kategori: "HVL",
                        stok_keluar: "10 Buah",
                        created_at: "02-03-2023",
                    }
                ]
            }
        }
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Stok Gudang" />

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
                                                        <span className="number" data-from="0" data-to="309" data-speed="2500" data-inviewport="yes">1225 +</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="icon-box bg-color-7 d-block">
                                                <div className="content text-center color-7">
                                                    <h5 className="title-box fs-17 font-w500">Total Stok Masuk</h5>
                                                    <div className="themesflat-counter fs-18 font-wb">
                                                        <span className="number" data-from="0" data-to="309" data-speed="2500" data-inviewport="yes">75 +</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="icon-box bg-color-9 d-block">
                                                <div className="content text-center color-9">
                                                    <h5 className="title-box fs-17 font-w500">Total Stok Keluar</h5>
                                                    <div className="themesflat-counter fs-18 font-wb">
                                                        <span className="number" data-from="0" data-to="309" data-speed="2500" data-inviewport="yes">1225 -</span>
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
                                        <DataTable columns={this.state.list_stok_gudang.column} data={this.state.list_stok_gudang.data} pagination expandableRows />
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="profile" title="List Stok Masuk">
                                <div className="box">
                                    <div className="box-header">
                                        <h3 className="fs-22">Stok Masuk</h3>
                                    </div>

                                    <div className="box-body">
                                        <DataTable columns={this.state.list_stok_masuk.column} data={this.state.list_stok_masuk.data} pagination expandableRows />
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="contact" title="List Stok Keluar">
                                <div className="box">
                                    <div className="box-header">
                                        <h3 className="fs-22">Stok Keluar</h3>
                                    </div>

                                    <div className="box-body">
                                        <DataTable columns={this.state.list_stok_keluar.column} data={this.state.list_stok_keluar.data} pagination expandableRows />
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