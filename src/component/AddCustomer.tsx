import React from 'react';
import HelmetTitle from './etc/HelmetTitle';
import Sidebar from './etc/Sidebar';
import Navbar from './etc/Navbar';
import System from '../module/System';
import { Button } from 'react-bootstrap';
import LoadingButton from './etc/LoadingButton';
import CustomerModule from '../module/CustomerModule';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


class AddCustomer extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            customer: {
                nama_customer: "",
                no_telp: "",
                email: "",
                nama_perusahaan: "",
                alamat: "",
                id_user: JSON.parse(localStorage.getItem("user-cozyproject")).id_user,
            },
            data_auth: localStorage.getItem("user-cozyproject"),
            disabled: true,
            loading: false,
        }

        this.validated = this.validated.bind(this);
        this.handleNamaCustomer = this.handleNamaCustomer.bind(this);
        this.handleNoTelp = this.handleNoTelp.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleNamaPerusahaan = this.handleNamaPerusahaan.bind(this);
        this.handleAlamat = this.handleAlamat.bind(this);
        this.handleSimpan = this.handleSimpan.bind(this);

    }

    validated() {
        console.log(this.state.customer)
        if (System.isObjectEmpty(this.state.customer)) {
            this.setState({ disabled: false });
        } else {
            this.setState({ disabled: true });
        }
    }

    clearState() {
        this.setState(prevState => ({
            customer: {
                ...prevState.customer,
                nama_customer: "",
                no_telp: "",
                email: "",
                nama_perusahaan: "",
                alamat: "",
            }
        }))
    }

    handleNamaCustomer(e) {
        this.setState(prevState => ({
            customer: {
                ...prevState.customer,
                nama_customer: e.target.value,
            }
        }), () => {
            this.validated();
        })
    }

    handleNoTelp(e) {
        this.setState(prevState => ({
            customer: {
                ...prevState.customer,
                no_telp: e.target.value,
            }
        }), () => {
            this.validated();
        })
    }

    handleEmail(e) {
        this.setState(prevState => ({
            customer: {
                ...prevState.customer,
                email: e.target.value,
            }
        }), () => {
            this.validated();
        })
    }

    handleNamaPerusahaan(e) {
        this.setState(prevState => ({
            customer: {
                ...prevState.customer,
                nama_perusahaan: e.target.value,
            }
        }), () => {
            this.validated();
        })
    }

    handleAlamat(e) {
        this.setState(prevState => ({
            customer: {
                ...prevState.customer,
                alamat: e.target.value,
            }
        }), () => {
            this.validated();
        })
    }

    handleSimpan() {
        this.setState({
            disabled: true,
            loading: true,
        });

        CustomerModule.add(this.state.customer, this.state.data_auth).then((result) => {
            console.log(result);
            this.setState({
                disabled: true,
                loading: false,
            });
            toast.success("Customer Berhasil Disimpan");
            this.clearState();
        }).catch((rejects) => {
            console.log(rejects);
            this.setState({
                disabled: false,
                loading: false,
            });
            toast.error("Terjadi Kesalahan");
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Tambah Customer" />
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
                <Navbar title="Tambah Customer" />
                <div className="main">
                    <div className="main-content project">
                        <div className="box">
                            <div className="box-body">
                                <div className="row">
                                    <div className="col-md-6 col-sm-12 mb-24">
                                        <div className="form-group">
                                            <label className="form-label">Nama Customer</label>
                                            <input className="form-control" onChange={this.handleNamaCustomer} value={this.state.customer.nama_customer} />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-24">
                                        <div className="form-group">
                                            <label className="form-label">No Telp</label>
                                            <input className="form-control" type='number' onChange={this.handleNoTelp} value={this.state.customer.no_telp} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 col-sm-12 mb-24">
                                        <div className="form-group">
                                            <label className="form-label">Email</label>
                                            <input className="form-control" onChange={this.handleEmail} value={this.state.customer.email} />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-24">
                                        <div className="form-group">
                                            <label className="form-label">Nama Perusahaan</label>
                                            <input className="form-control" onChange={this.handleNamaPerusahaan} value={this.state.customer.nama_perusahaan} />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Alamat:</label>
                                    <textarea className="form-control" onChange={this.handleAlamat} name="text" cols={30} rows={5} value={this.state.customer.alamat}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="gr-btn mt-4 text-end">
                            <a href="/customer" className="btn btn-danger btn-lg mr-15 fs-16">CLOSE</a>
                            <Button disabled={this.state.disabled} className="btn btn-primary btn-lg fs-16" onClick={this.handleSimpan}>SIMPAN <LoadingButton show={this.state.loading} /></Button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AddCustomer;