import React from 'react';
import DataTable from 'react-data-table-component';
import { Link, Navigate } from 'react-router-dom';
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
import System from '../module/System';
import ModalAddUser from './modal/ModalAddUser';
import ModalEditCustomer from './modal/ModalEditCustomer';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

class DetailCustomer extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    name: "No",
                    selector: row => row.no,
                    sortable: true,
                    width: "70px"
                },
                {
                    name: "Nama Projek",
                    selector: row => row.nama_project,
                    sortable: true,
                },
                {
                    name: "Customer",
                    selector: row => row.nama_customer,
                    sortable: true,
                },
                {
                    name: "Jumlah Volumn",
                    selector: row => row.jumlah_volumn,
                    sortable: true,
                },
                {
                    name: "Total Cost",
                    selector: row => row.total_cost,
                    sortable: true,
                },
                {
                    name: "Status",
                    selector: row => row.status,
                    sortable: true,
                },
                {
                    name: "Tanggal",
                    selector: row => row.created_at,
                    sortable: true,
                }
            ],
            data: [],
            data_auth: localStorage.getItem("user-cozyproject"),
            detail_customer: {},
            loading: true,
            navigation: false,
            search: "",
            isOpen: {
                show: false,
                customer_data: {}
            },
            navigate: false,
        }

        this.getDetail = this.getDetail.bind(this);
        this.handleClickRow = this.handleClickRow.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleCloseCustomer = this.handleCloseCustomer.bind(this);
        this.handleOpenCustomer = this.handleOpenCustomer.bind(this);
        this.handleOpenDelete = this.handleOpenDelete.bind(this);
    }

    handleOpenCustomer() {
        this.setState({
            isOpen: {
                show: true,
                customer_data: this.state.detail_customer
            },
        })
    }

    handleCloseCustomer() {
        this.setState({
            isOpen: {
                show: false,
                customer_data: {}
            },
        })
    }

    handleClickRow(e) {
        console.log(e);
        this.setState({
            navigation: <Navigate to={`/detail_projek/${e.id_project}`} />
        })
    }

    getDetail() {
        CustomerModule.getDetail({ id_customer: this.props.params.id }, this.state.data_auth).then((result) => {
            console.log(result);
            let no = 1;
            result.data.data.project.map(el => {
                el['no'] = no++;
                el['nama_project_2'] = el.nama_project
                el['nama_project'] = <><Link to={`/detail_projek/${el.id_project}`}>{el.nama_project}</Link></>
                el['created_at'] = moment(el.created_at, "YYYY-MM-DD").format("DD-MM-YYYY")
                el['total_cost'] = System.convertRupiah(el.total_cost);
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

    handleSearch(e) {
        this.setState({
            search: e.target.value,
        })
    }



    handleOpenDelete() {
        MySwal.fire({
            title: "Apa kamu yakin?",
            text: 'Data tidak akan bisa dikembalikan, dan data projek akan ikut terhapus.',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Iya',
            icon: 'warning',
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("DD");
                console.log("D")
                CustomerModule.delete(this.props.params.id, this.state.data_auth).then((result) => {
                    toast.success("Customer berhasil dihapus.");
                    this.setState({
                        navigate: <Navigate to="/customer" replace={true} />
                    })
                }).catch((err) => {
                    toast.error("Customer gagal dihapus.");
                })
            }
        })
    }

    render(): React.ReactNode {
        return (
            <>
                {this.state.navigate}
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
                {this.state.navigation}

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

                                    <div className='alert alert-danger mt-3'>
                                        <div className='d-flex justify-content-end'>
                                            <div className='align-self-center'>
                                                <b>Zona Berbahaya </b>
                                            </div>
                                            <div className='ms-3'>
                                                <button className='btn btn-success btn-sm me-2' onClick={this.handleOpenCustomer}>Edit</button>
                                                <button className='btn btn-danger btn-sm' onClick={this.handleOpenDelete}>Hapus</button>
                                            </div>
                                        </div>
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
                                            <input type="text" onChange={this.handleSearch} className='form-control' placeholder='Cari Nama Projek' />
                                        </div>

                                    </div>
                                    <div className="box-body pb-0 table-responsive activity mt-18">
                                        <DataTable onRowClicked={this.handleClickRow} columns={this.state.columns} data={this.state.data.filter((data) => {
                                            if (this.state.search === "") {
                                                return data;
                                            } else if (data.nama_project_2.toLowerCase().includes(this.state.search.toLowerCase())) {
                                                return data;
                                            }
                                        })} pagination />
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>

                <ModalEditCustomer isOpen={this.state.isOpen} closeModal={this.handleCloseCustomer} id_customer={this.props.params.id} getDetail={this.getDetail} />
            </>
        )
    }
}

export default withRouter(DetailCustomer);