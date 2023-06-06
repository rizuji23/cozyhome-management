import React from "react";
import { Button, Modal } from "react-bootstrap";
import System from "../../module/System";
import CustomerModule from "../../module/CustomerModule";
import { toast } from "react-toastify";
import LoadingButton from "../etc/LoadingButton";

class ModalEditCustomer extends React.Component<any, any> {
    constructor(props) {
        super(props);
        console.log(props.isOpen)
        this.state = {
            customer: {
                nama_customer: props.isOpen.nama_customer,
                no_telp: props.isOpen.no_telp,
                email: props.isOpen.email,
                nama_perusahaan: props.isOpen.nama_perusahaan,
                alamat: props.isOpen.alamat,
                id_user: JSON.parse(localStorage.getItem("user-cozyproject")).id_user,
                id: props.id_customer
            },
            disabled: true,
            loading: false,
            data_auth: localStorage.getItem("user-cozyproject"),
        }


        this.validated = this.validated.bind(this);
        this.handleNamaCustomer = this.handleNamaCustomer.bind(this);
        this.handleNoTelp = this.handleNoTelp.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleNamaPerusahaan = this.handleNamaPerusahaan.bind(this);
        this.handleAlamat = this.handleAlamat.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    validated() {
        if (System.isObjectEmpty(this.state.customer)) {
            this.setState({ disabled: false });
        } else {
            this.setState({ disabled: true });
        }
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps.isOpen != this.props.isOpen) {
            this.setState({
                customer: {
                    nama_customer: this.props.isOpen.customer_data.nama_customer,
                    no_telp: this.props.isOpen.customer_data.no_telp,
                    email: this.props.isOpen.customer_data.email,
                    nama_perusahaan: this.props.isOpen.customer_data.nama_perusahaan,
                    alamat: this.props.isOpen.customer_data.alamat,
                    id_user: JSON.parse(localStorage.getItem("user-cozyproject")).id_user,
                    id: this.props.id_customer
                }
            })
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

    handleEdit() {
        this.setState({
            disabled: true,
            loading: true,
        });

        CustomerModule.update(this.state.customer, this.state.data_auth).then((result) => {
            console.log(result);
            this.setState({
                disabled: true,
                loading: false,
            });
            toast.success("Customer Berhasil Diubah");
            this.props.getDetail()
            this.props.closeModal()
        }).catch((rejects) => {
            console.log(rejects);
            this.setState({
                disabled: false,
                loading: false,
            });
            this.props.getDetail()
            toast.error("Terjadi Kesalahan");
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <Modal show={this.props.isOpen.show} onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Customer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='form-group'>
                            <label htmlFor="">Nama</label>
                            <input type="text" className="form-control" onChange={this.handleNamaCustomer} value={this.state.customer.nama_customer} />
                        </div>
                        <div className='form-group mt-3'>
                            <label htmlFor="">Nama Perusahaan</label>
                            <input type="text" className="form-control" onChange={this.handleNamaPerusahaan} value={this.state.customer.nama_perusahaan} />
                        </div>
                        <div className='form-group mt-3'>
                            <label htmlFor="">Email</label>
                            <input type="text" className="form-control" onChange={this.handleEmail} value={this.state.customer.email} />
                        </div>
                        <div className='form-group mt-3'>
                            <label htmlFor="">No Telp</label>
                            <input type="text" className="form-control" onChange={this.handleNoTelp} value={this.state.customer.no_telp} />
                        </div>
                        <div className='form-group mt-3'>
                            <label htmlFor="">Alamat</label>
                            <textarea name="" className="form-control" onChange={this.handleAlamat} id="" cols={30} rows={5} value={this.state.customer.alamat}></textarea>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.closeModal}>
                            Batal
                        </Button>
                        <Button disabled={this.state.disabled} className="btn btn-primary btn-lg fs-16" onClick={this.handleEdit}>Edit <LoadingButton show={this.state.loading} /></Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ModalEditCustomer;