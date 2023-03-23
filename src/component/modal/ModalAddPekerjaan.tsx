import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'react-select-search/style.css'
import System from '../../module/System';

class ModalAddPekerjaan extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            lain: {
                nama_pekerjaan: "",
                desc: "",
                harga: "",
                id_user: JSON.parse(localStorage.getItem("user-cozyproject")).id_user,
            },
            disabled: true,
        }

        this.validated = this.validated.bind(this);
        this.handleNamaPekerjaan = this.handleNamaPekerjaan.bind(this);
        this.handleHarga = this.handleHarga.bind(this);
        this.handleDesc = this.handleDesc.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    clearState() {
        this.setState({
            lain: {
                nama_pekerjaan: "",
                desc: "",
                harga: "",
                id_user: JSON.parse(localStorage.getItem("user-cozyproject")).id_user,
            }
        })
    }

    validated() {
        if (System.isObjectEmpty(this.state.lain)) {
            this.setState({ disabled: false });
        } else {
            this.setState({ disabled: true });
        }
    }

    handleNamaPekerjaan(e) {
        this.setState(prevState => ({
            lain: {
                ...prevState.lain,
                nama_pekerjaan: e.target.value,
            }
        }), () => {
            this.validated();
        })
    }

    handleHarga(e) {
        this.setState(prevState => ({
            lain: {
                ...prevState.lain,
                harga: e.target.value,
            }
        }), () => {
            this.validated();
        })
    }

    handleDesc(e) {
        this.setState(prevState => ({
            lain: {
                ...prevState.lain,
                desc: e.target.value,
            }
        }), () => {
            this.validated();
        })
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps.isOpen !== this.props.isOpen) {
            this.clearState();
        }
    }

    render(): React.ReactNode {
        return (
            <>
                <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah Pekerjaan Lain-Lain</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='form-group'>
                            <label htmlFor="">Judul Pekerjaan</label>
                            <input type="text" value={this.state.lain.nama_pekerjaan} onChange={this.handleNamaPekerjaan} className="form-control" />
                        </div>

                        <div className='form-group mt-3'>
                            <label htmlFor="">Harga</label>
                            <input type="text" value={System.convertRupiah(this.state.lain.harga)} onChange={this.handleHarga} className="form-control" />
                        </div>

                        <div className='form-group mt-3'>
                            <label htmlFor="">Deskripsi</label>
                            <textarea cols={30} rows={4} value={this.state.lain.desc} onChange={this.handleDesc} className="form-control"></textarea>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.closeModal}>
                            Batal
                        </Button>
                        <Button variant="primary" disabled={this.state.disabled} onClick={() => this.props.handleSimpanPekerjaanLain(this.state.lain)}>
                            Simpan
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ModalAddPekerjaan;