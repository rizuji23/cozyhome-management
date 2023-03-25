import React from 'react';
import HelmetTitle from './etc/HelmetTitle';
import Sidebar from './etc/Sidebar';
import Navbar from './etc/Navbar';
import DataTable from 'react-data-table-component';
import { Link, Navigate } from 'react-router-dom';
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
                    sortable: true,
                    width: "70px"
                },
                {
                    name: "Nama Customer",
                    selector: row => row.nama_customer,
                    sortable: true,
                },
                {
                    name: "Nama Perusahaan",
                    selector: row => row.nama_perusahaan,
                    sortable: true,
                },
                {
                    name: "No Telp",
                    selector: row => row.no_telp,
                },
                {
                    name: "Tanggal",
                    selector: row => row.created_at,
                    sortable: true,
                }
            ],
            data: [],
            data_auth: localStorage.getItem("user-cozyproject"),
            loading: true,
            navigation: false,
            search: "",
        }

        this.getCustomer = this.getCustomer.bind(this);
        this.handleClickRow = this.handleClickRow.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    getCustomer() {
        CustomerModule.get(this.state.data_auth).then((result) => {
            console.log(result);
            let no = 1;
            result.data.data.customer.map(el => {
                el['no'] = no++;
                el['nama_customer_2'] = el.nama_customer;
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

    handleClickRow(e) {
        console.log(e);
        this.setState({
            navigation: <Navigate to={`/detail_customer/${e.id_customer}`} />
        })
    }

    componentDidMount(): void {
        this.getCustomer();
    }

    handleSearch(e) {
        this.setState({
            search: e.target.value
        })
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
                {this.state.navigation}
                <Sidebar />
                <Navbar title="List Customer" />
                <div className="main">
                    <div className="main-content project">
                        <div className='box'>
                            <div className="box-header  pt-0 mb-3">
                                <div className="me-auto">
                                    <h4 className="card-title mb-0 fs-22">Customer</h4>
                                </div>
                                <div className='me-3'>
                                    <input type="text" className='form-control' onChange={this.handleSearch} placeholder='Cari Nama Customer' />
                                </div>

                                <div className='ms-3'>
                                    <Link to={"/tambah_customer"} className='btn btn-primary btn-sm'>Tambah Customer Baru</Link>
                                </div>
                            </div>
                            <div className='box-body'>
                                <DataTable onRowClicked={this.handleClickRow} columns={this.state.column} data={this.state.data.filter((data) => {
                                    console.log(data)
                                    if (this.state.search === "") {
                                        return data;
                                    } else if (data.nama_customer_2.toLowerCase().includes(this.state.search.toLowerCase())) {
                                        return data;
                                    }
                                })} pagination progressPending={this.state.loading} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Customer;