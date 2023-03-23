import React from 'react';
import HelmetTitle from './etc/HelmetTitle';
import Sidebar from './etc/Sidebar';
import Navbar from './etc/Navbar';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import CustomerModule from '../module/CustomerModule';
import moment from 'moment-timezone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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
                    name: "Nama Perusahaan",
                    selector: row => row.nama_perusahaan,
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
            data: [],
            data_auth: localStorage.getItem("user-cozyproject"),
            loading: true,
        }

        this.getCustomer = this.getCustomer.bind(this);
    }

    getCustomer() {
        CustomerModule.get(this.state.data_auth).then((result) => {
            console.log(result);
            let no = 1;
            result.data.data.customer.map(el => {
                el['no'] = no++;
                el['nama_customer'] = <><Link to={`/detail_customer/${el.id_customer
                    }`}>{el.nama_customer}</Link></>;
                el['created_at'] = moment(el.created_at, "YYYY-MM-DD").format("DD-MM-YYYY");
            });

            this.setState({
                data: result.data.data.customer,
                loading: false,
            })
        }).catch((rejects) => {
            console.log(rejects);
            toast.error("Terjadi Kesalahan");
        })
    }

    componentDidMount(): void {
        this.getCustomer();
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="List Customer" />
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
                                <DataTable columns={this.state.column} data={this.state.data} pagination progressPending={this.state.loading} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Customer;