import React from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import HelmetTitle from './etc/HelmetTitle';
import Sidebar from './etc/Sidebar';
import Navbar from './etc/Navbar';
import { Tab, Tabs } from 'react-bootstrap';

class DetailCustomer extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    name: "No",
                    selector: row => row.no,
                },
                {
                    name: "Nama Projek",
                    selector: row => row.nama_projek,
                },
                {
                    name: "Customer",
                    selector: row => row.nama_customer
                },
                {
                    name: "Jumlah Volumn",
                    selector: row => row.jumlah_volumn,
                },
                {
                    name: "Total Cost",
                    selector: row => row.total_cost,
                },
                {
                    name: "Status",
                    selector: row => row.status
                },
                {
                    name: "Tanggal",
                    selector: row => row.created_at
                }
            ],
            data: [
                {
                    no: 1,
                    nama_projek: <><Link to="/detail_projek">Summarecon</Link></>,
                    nama_customer: "Aye Shabira",
                    jumlah_volumn: "20 m2",
                    total_cost: "20.000.000",
                    status: <span className="badge text-bg-primary">On Progress</span>,
                    created_at: "26-02-2023"
                }
            ]
        }
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Detail Customer" />

                <Sidebar />
                <Navbar title="Detail Customer" />
                <div className="main">
                    <div className="main-content project">
                        <Tabs
                            defaultActiveKey="home"
                            id="uncontrolled-tab-example"
                            className="mb-3 nav-custom"
                        >
                            <Tab eventKey="home" title="Infomarsi Customer">
                                <div className="box mb-4">
                                    <div className="box-header pt-0">
                                        <div className="me-auto">
                                            <h4 className="card-title mb-0 fs-22">Informasi Customer</h4>
                                        </div>
                                    </div>

                                    <div className='box-body'>
                                        <ul className="list-group mt-3">
                                            <li className="list-group-item">
                                                <small><b>Nama</b></small><br />
                                                <span>Aye Shabira</span>
                                            </li>
                                            <li className="list-group-item">
                                                <small><b>Nama Perusahaan</b></small><br />
                                                <span>PT Para Pencari Cinta.</span>
                                            </li>
                                            <li className="list-group-item">
                                                <small><b>Email</b></small><br />
                                                <span>aye@aye.com</span>
                                            </li>
                                            <li className="list-group-item">
                                                <small><b>No Telp</b></small><br />
                                                <span>021321212332</span>
                                            </li>
                                            <li className="list-group-item">
                                                <small><b>Alamat</b></small><br />
                                                <span>Teuing dimana eung.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Tab>

                            <Tab eventKey="project" title="List Projek">
                                <div className="box ">
                                    <div className="box-header  pt-0">
                                        <div className="me-auto">
                                            <h4 className="card-title mb-0 fs-22">List Projek</h4>
                                        </div>
                                        <div className='me-3'>
                                            <input type="text" className='form-control' placeholder='Cari Projek' />
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
                                            <Link to={"/tambah_projek"} className='btn btn-primary btn-sm'>Tambah Projek Baru</Link>
                                        </div>
                                    </div>
                                    <div className="box-body pb-0 table-responsive activity mt-18">
                                        <DataTable columns={this.state.columns} data={this.state.data} pagination />
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

export default DetailCustomer;