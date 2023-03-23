import React from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import HelmetTitle from './etc/HelmetTitle';
import Sidebar from './etc/Sidebar';
import Navbar from './etc/Navbar';
import { Tab, Tabs } from 'react-bootstrap';
import { withRouter } from './etc/withRouter';
import CustomerModule from '../module/CustomerModule';
import moment from 'moment'
import LoadingFull from './etc/LoadingFull';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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
                    selector: row => row.nama_project,
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
            data: [],
            data_auth: localStorage.getItem("user-cozyproject"),
            detail_customer: {},
            loading: true,
        }

        console.log(this.props);
        this.getDetail = this.getDetail.bind(this);
    }

    getDetail() {
        CustomerModule.getDetail({ id_customer: this.props.params.id }, this.state.data_auth).then((result) => {
            console.log(result);
            let no = 1;
            result.data.data.project.map(el => {
                el['no'] = no++;
                el['nama_project'] = <><Link to={`/detail_projek/${el.id_project}`}>{el.nama_project}</Link></>
                el['created_at'] = moment(el.created_at, "YYYY-MM-DD").format("DD-MM-YYYY")
            });
            this.setState({
                data: result.data.data.project,
                detail_customer: result.data.data.customer,
                loading: false,
            })
        }).catch((rejects) => {
            console.log(rejects);
            toast.error("Terjadi Kesalahan");
        })
    }

    componentDidMount(): void {
        this.getDetail();
    }

    render(): React.ReactNode {
        return (
            <>
                <LoadingFull display={this.state.loading} />
                <HelmetTitle title="Detail Customer" />
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
                                                <span>{this.state.detail_customer.nama_customer}</span>
                                            </li>
                                            <li className="list-group-item">
                                                <small><b>Nama Perusahaan</b></small><br />
                                                <span>{this.state.detail_customer.nama_perusahaan}</span>
                                            </li>
                                            <li className="list-group-item">
                                                <small><b>Email</b></small><br />
                                                <span>{this.state.detail_customer.email}</span>
                                            </li>
                                            <li className="list-group-item">
                                                <small><b>No Telp</b></small><br />
                                                <span>{this.state.detail_customer.no_telp}</span>
                                            </li>
                                            <li className="list-group-item">
                                                <small><b>Alamat</b></small><br />
                                                <span>{this.state.detail_customer.alamat}</span>
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

export default withRouter(DetailCustomer);