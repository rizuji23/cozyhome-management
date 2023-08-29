import React from "react";
import { Button, Modal } from "react-bootstrap";
import System from "../../module/System";
import RincianUnitSystem from "../../module/RincianUnit";
import { toast } from "react-toastify";
import LoadingButton from "../etc/LoadingButton";

class ModalAddKebutuhanUnit extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                nama_bahan: "",
                harga: "",
                qty: "",
                total: "",
                id: this.props.id
            },
            disabled: true,
            loading: false,
            data_auth: localStorage.getItem("user-cozyproject"),
        }
    }

    validated() {
        if (System.isObjectEmpty(this.state.data)) {
            this.setState({ disabled: false });
        } else {
            this.setState({ disabled: true });
        }
    }

    sumTotal() {
        const total_sum = this.state.data.harga * this.state.data.qty;
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                total: total_sum
            }
        }))
    }

    send() {
        this.setState({
            loading: true,
            disabled: true,
        });
        RincianUnitSystem.addKebutuhanUnit(this.state.data, this.state.data_auth).then((result: any) => {
            console.log(result);
            this.setState({
                loading: false,
                disabled: true,
                data: {
                    nama_bahan: "",
                    harga: "",
                    qty: "",
                    total: "",
                    id: this.props.id
                }
            })
            this.props.getAPI();
            toast.success("Kebutuhan Material Unit berhasil disimpan");
            this.props.closeModal();
        }).catch((err) => {
            console.log(err);
            toast.error("Kebutuhan Material Unit gagal disimpan");
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah Kebutuhan Unit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='form-group'>
                            <label htmlFor="">Nama Bahan</label>
                            <input type="text" value={this.state.data.nama_bahan} onChange={(e) => {
                                this.setState(prevState => ({
                                    data: {
                                        ...prevState.data,
                                        nama_bahan: e.target.value
                                    }
                                }), () => {
                                    this.validated();
                                })
                            }} className="form-control" />
                        </div>
                        <div className='form-group mt-3'>
                            <label htmlFor="">Harga</label>
                            <input type="text" value={System.convertRupiah(this.state.data.harga)} onChange={(e) => {
                                this.setState(prevState => ({
                                    data: {
                                        ...prevState.data,
                                        harga: System.convertInt(e.target.value)
                                    }
                                }), () => {
                                    this.sumTotal();
                                    this.validated();
                                })
                            }} className="form-control" />
                        </div>
                        <div className='form-group mt-3'>
                            <label htmlFor="">Qty</label>
                            <input type="number" value={this.state.data.qty} onChange={(e) => {
                                this.setState(prevState => ({
                                    data: {
                                        ...prevState.data,
                                        qty: e.target.value
                                    }
                                }), () => {
                                    this.sumTotal();
                                    this.validated();
                                })
                            }} className="form-control" />
                        </div>
                        <div className='form-group mt-3'>
                            <label htmlFor="">Total</label>
                            <input type="text" value={System.convertRupiah(this.state.data.total)} disabled className="form-control" />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.closeModal}>
                            Batal
                        </Button>
                        <Button variant="primary" disabled={this.state.disabled} onClick={() => this.send()}>
                            Simpan
                            <LoadingButton show={this.state.loading} />
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ModalAddKebutuhanUnit;