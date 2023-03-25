import React from 'react';
import HelmetTitle from './etc/HelmetTitle';
import Sidebar from './etc/Sidebar';
import Navbar from './etc/Navbar';
import { InputSuggestions } from 'react-input-suggestions';
import CustomerModule from '../module/CustomerModule';
import { rejects } from 'assert';
import Suggestion from './etc/Suggestion';
import System from '../module/System';
import LoadingButton from './etc/LoadingButton';
import ProjectModule from '../module/ProjectModule';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Link } from 'react-router-dom';

class AddProjek extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            list_customer: [],
            data_auth: localStorage.getItem("user-cozyproject"),
            data_customer: {
                id_customer: "",
                nama_project: "",
                kategori_project: "",
                jumlah_volumn: "",
                start_date: "",
                end_date: "",
                desc: "",
                status: "",
                id_user: JSON.parse(localStorage.getItem("user-cozyproject")).id_user,
                total_cost: 0,
                estimasi_pengerjaan: ""

            },
            disabled: true,
            loading: false,
        }

        this.getCustomer = this.getCustomer.bind(this);
        this.validated = this.validated.bind(this);
        this.handleCustomer = this.handleCustomer.bind(this);
        this.handleNamaProject = this.handleNamaProject.bind(this);
        this.handleKategori = this.handleKategori.bind(this);
        this.handleJumlahVolumn = this.handleJumlahVolumn.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.handleDesc = this.handleDesc.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleSimpan = this.handleSimpan.bind(this);
        this.getDays = this.getDays.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    clearState() {
        this.setState(prevState => ({
            data_customer: {
                ...prevState.data_customer,
                nama_project: "",
                jumlah_volumn: "",
                start_date: "",
                end_date: "",
                desc: "",
                total_cost: 0,
                estimasi_pengerjaan: ""
            }
        }))
    }

    validated() {
        console.log(this.state.data_customer)

        if (System.isObjectEmpty(this.state.data_customer)) {
            this.setState({ disabled: false });
        } else {
            this.setState({ disabled: true });
        }
    }

    getDays() {
        if (this.state.data_customer.start_date.length !== 0 && this.state.data_customer.end_date.length !== 0) {
            const estimasi = System.getDaysDiff(this.state.data_customer.start_date, this.state.data_customer.end_date);
            console.log(estimasi);
            this.setState(prevState => ({
                data_customer: {
                    ...prevState.data_customer,
                    estimasi_pengerjaan: estimasi
                }
            }));
        }
    }

    handleCustomer(e) {
        this.setState(prevState => ({
            data_customer: {
                ...prevState.data_customer,
                id_customer: e.target.value,
            }
        }), () => {
            this.validated();
        });

    }

    handleNamaProject(e) {
        this.setState(prevState => ({
            data_customer: {
                ...prevState.data_customer,
                nama_project: e.target.value,
            }
        }), () => {
            this.validated();
        });

    }

    handleKategori(e) {
        this.setState(prevState => ({
            data_customer: {
                ...prevState.data_customer,
                kategori_project: e.target.value,
            }
        }), () => {
            this.validated();
        });

    }

    handleJumlahVolumn(e) {
        this.setState(prevState => ({
            data_customer: {
                ...prevState.data_customer,
                jumlah_volumn: e.target.value,
            }
        }), () => {
            this.validated();
        });

    }

    handleStartDate(e) {
        this.setState(prevState => ({
            data_customer: {
                ...prevState.data_customer,
                start_date: e.target.value,
            }
        }), () => {
            this.validated();
            this.getDays();
        });

    }

    handleEndDate(e) {
        this.setState(prevState => ({
            data_customer: {
                ...prevState.data_customer,
                end_date: e.target.value,
            }
        }), () => {
            this.validated();
            this.getDays();
        });

    }

    handleDesc(e) {
        this.setState(prevState => ({
            data_customer: {
                ...prevState.data_customer,
                desc: e.target.value,
            }
        }), () => {
            this.validated();
        });

    }

    handleStatus(e) {
        this.setState(prevState => ({
            data_customer: {
                ...prevState.data_customer,
                status: e.target.value,
            }
        }), () => {
            this.validated();
        });

    }

    getCustomer() {
        CustomerModule.get(this.state.data_auth).then((result) => {
            console.log(result);
            const customer = result.data.data.customer.map(el => {
                return (
                    <><option value={el.id_customer}>{el.nama_customer}</option></>
                )
            })
            this.setState({
                list_customer: customer,
            })
        }).catch((rejects) => {
            console.log(rejects);
        })
    }

    componentDidMount(): void {
        this.getCustomer();
    }

    handleSimpan() {
        this.setState({
            disabled: true,
            loading: true,
        })
        const data = this.state.data_customer;

        ProjectModule.add(data, this.state.data_auth).then((result) => {
            console.log(result);
            this.setState({
                disabled: true,
                loading: false,
            });
            toast.success("Project Berhasil Disimpan");
            this.clearState();
        }).catch((rejects) => {
            console.log(rejects);
            this.setState({
                disabled: false,
                loading: false,
            });
            toast.error("Terjadi Kesalahan");
        });
    }



    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Tambah Baru Projek" />
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
                <Navbar title="Tambah Baru Projek" />
                <div className="main">
                    <div className="main-content project">
                        <div className="box">
                            <div className="box-body">
                                <div className="row">
                                    <div className="col-md-6 col-sm-12 mb-24">
                                        <div className="form-group">
                                            <label className="form-label">Customer</label>
                                            <select name="" onChange={this.handleCustomer} className='form-control' id="">
                                                <option value="">Pilih Customer</option>
                                                {this.state.list_customer}
                                            </select>

                                            <Link to="/tambah_customer" className='mt-2'>Tambah Customer Baru?</Link>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-24">
                                        <div className="form-group">
                                            <label className="form-label">Judul Projek</label>
                                            <input onChange={this.handleNamaProject} value={this.state.data_customer.nama_project} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-sm-12 mb-24">
                                        <div className="form-group">
                                            <label className="form-label">Kategori</label>
                                            <select onChange={this.handleKategori} name="" className='form-control' id="">
                                                <option value="">Pilih Kategori Projek</option>
                                                <option value="Residential">Residential</option>
                                                <option value="Komersial">Komersial</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-24">
                                        <div className="form-group">
                                            <label className="form-label">Jumlah Volumn</label>
                                            <div onChange={this.handleJumlahVolumn} className="input-group">
                                                <input type="text" value={this.state.data_customer.jumlah_volumn} className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                                                <span className="input-group-text">m2</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-sm-12 mb-24">
                                        <div className="form-group">
                                            <label className="form-label">Tanggal Mulai</label>
                                            <input type='date' value={this.state.data_customer.start_date} onChange={this.handleStartDate} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-24">
                                        <div className="form-group">
                                            <label className="form-label">Tanggal Berakhir</label>
                                            <input type='date' onChange={this.handleEndDate} value={this.state.data_customer.end_date} className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Description:</label>
                                    <textarea className="form-control" onChange={this.handleDesc} value={this.state.data_customer.desc} name="text" cols={30} rows={10}></textarea>
                                </div>

                                <div className="custom-controls-stacked d-lg-flex align-items-center">
                                    <label className="form-label mt-1 fs-18 font-w500 color-primary">Status Pekerjaan :</label>

                                    <label className="custom-control custom-radio success me-4">
                                        <input type="radio" onClick={this.handleStatus} className="custom-control-input  me-2" name="example-radios1" value="Pending" />
                                        <span className="custom-control-label">Pending</span>
                                    </label>
                                    <label className="custom-control custom-radio success me-4">
                                        <input type="radio" onClick={this.handleStatus} className="custom-control-input  me-2" name="example-radios1" value="On Progress" />
                                        <span className="custom-control-label">On Progress</span>
                                    </label>
                                </div>


                            </div>

                        </div>
                        <div className="gr-btn mt-4 text-end">
                            <Link to="/projek" className="btn btn-danger btn-lg mr-15 fs-16">CLOSE</Link>
                            <button className="btn btn-primary btn-lg fs-16" onClick={this.handleSimpan} disabled={this.state.disabled}>SIMPAN <LoadingButton show={this.state.loading} /></button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AddProjek;