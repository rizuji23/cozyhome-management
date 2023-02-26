import React from 'react';
import HelmetTitle from './etc/HelmetTitle';
import Sidebar from './etc/Sidebar';
import Navbar from './etc/Navbar';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

class Customer extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            column: [
                {
                    name: "No",
                    selector: row => row.no,
                },
                {
                    name: "Nama Customer",
                    selector: row => row.nama_customer,
                },
                {
                    name: "No Telp",
                    selector: row => row.no_telp,
                },
                {
                    name: "Tanggal",
                    selector: row => row.created_at,
                }
            ],
            data: [
                {
                    no: 1,
                    nama_customer: <Link to={"/detail_customer"}>Aye Shabira</Link>,
                    no_telp: "089657581114",
                    created_at: "26-02-2023",
                }
            ]
        }
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="List Customer" />

                <Sidebar />
                <Navbar title="List Customer" />
                <div className="main">
                    <div className="main-content project">
                        <div className='box'>
                            <div className="box-header  pt-0">
                                <div className="me-auto">
                                    <h4 className="card-title mb-0 fs-22">Customer</h4>
                                </div>
                                <div className='me-3'>
                                    <input type="text" className='form-control' placeholder='Cari Customer' />
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
                                    <Link to={"/tambah_customer"} className='btn btn-primary btn-sm'>Tambah Customer Baru</Link>
                                </div>
                            </div>
                            <div className='box-body'>
                                <DataTable columns={this.state.column} data={this.state.data} pagination />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Customer;