import React from "react";
import { Button, Modal } from "react-bootstrap";
import System from "../../module/System";
import RincianUnitSystem from "../../module/RincianUnit";
import { toast } from "react-toastify";
import LoadingButton from "../etc/LoadingButton";

class ModalAddPekerjaanUnit extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                judul_pekerjaan: "",
                harga: "",
                desc: "",
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

    send() {
        this.setState({
            loading: true,
            disabled: true,
        });
        RincianUnitSystem.addPekerjaanLain(this.state.data, this.state.data_auth).then((result: any) => {
            console.log(result);
            this.setState({
                loading: false,
                disabled: true,
                data: {
                    judul_pekerjaan: "",
                    harga: "",
                    desc: "",
                    id: this.props.id
                }
            })
            this.props.getAPI();
            toast.success("Pekerjaan Lain Unit berhasil disimpan");
            this.props.closeModal();
        }).catch((err) => {
            console.log(err);
            toast.error("Pekerjaan Lain Unit gagal disimpan");
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah Pekerjaan Lain</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='form-group'>
                            <label htmlFor="">Judul Pekerjaan</label>
                            <input type="text" value={this.state.data.judul_pekerjaan} onChange={(e) => {
                                this.setState(prevState => ({
                                    data: {
                                        ...prevState.data,
                                        judul_pekerjaan: e.target.value
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
                                    this.validated();
                                })
                            }} className="form-control" />
                        </div>
                        <div className='form-group mt-3'>
                            <label htmlFor="">Deskripsi</label>
                            <textarea value={this.state.data.desc} onChange={(e) => {
                                this.setState(prevState => ({
                                    data: {
                                        ...prevState.data,
                                        desc: e.target.value
                                    }
                                }), () => {
                                    this.validated();
                                })
                            }} className="form-control"></textarea>
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

export default ModalAddPekerjaanUnit;