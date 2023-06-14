import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'react-select-search/style.css'
import System from '../../module/System';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { toast } from 'react-toastify';
import PekerjaanLain from '../../module/PekerjaanLain';
const MySwal = withReactContent(Swal)

class ModalDetailPekerjaanLain extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            lain: {
                id_pekerjaan_lain: "",
                nama_pekerjaan: "",
                desc: "",
                harga: "",
                id_user: JSON.parse(localStorage.getItem("user-cozyproject")).id_user,
            },
            disabled: true,
            data_auth: localStorage.getItem("user-cozyproject"),
        }

        this.validated = this.validated.bind(this);
        this.handleNamaPekerjaan = this.handleNamaPekerjaan.bind(this);
        this.handleHarga = this.handleHarga.bind(this);
        this.handleDesc = this.handleDesc.bind(this);
        this.clearState = this.clearState.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleOpenDelete = this.handleOpenDelete.bind(this);
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
                harga: System.convertInt(e.target.value)
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
            console.log(this.props.isOpen)
            this.setState({
                lain: {
                    id_pekerjaan_lain: this.props.isOpen.data.id_pekerjaan_lain,
                    nama_pekerjaan: this.props.isOpen.data.nama_pekerjaan,
                    desc: this.props.isOpen.data.desc,
                    harga: System.convertInt(this.props.isOpen.data.harga || ""),
                    id_user: JSON.parse(localStorage.getItem("user-cozyproject")).id_user,
                    id_project: this.props.id_project
                }
            })
        }

    }

    handleEdit() {
        PekerjaanLain.update(this.state.lain, this.state.data_auth).then((result) => {
            console.log(result);
            toast.success("Pekerjaan Lain berhasil diedit");
            this.props.closeModal();
            this.props.getPekerjaanLain();
            this.props.getCost();
            this.props.getDetail();
        }).catch((rejects) => {
            console.log(rejects);
            toast.error("Terjadi Kesalahan");
        });
    }

    handleOpenDelete() {
        MySwal.fire({
            title: "Apa kamu yakin?",
            text: 'Data tidak akan bisa dikembalikan.',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Iya',
            icon: 'warning',
        }).then((result) => {
            if (result.isConfirmed) {
                PekerjaanLain.delete(this.state.lain, this.state.data_auth).then((result) => {
                    console.log(result);
                    toast.success("Pekerjaan Lain berhasil diedit");
                    this.props.closeModal();
                    this.props.getPekerjaanLain();
                    this.props.getCost();
                    this.props.getDetail();
                }).catch((rejects) => {
                    console.log(rejects);
                    toast.error("Terjadi Kesalahan");
                });
            }
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <Modal show={this.props.isOpen.show} onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Detail Pekerjaan Lain-Lain</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='form-group'>
                            <label htmlFor="">Judul Pekerjaan</label>
                            <input type="text" value={this.state.lain.nama_pekerjaan} onChange={this.handleNamaPekerjaan} className="form-control" />
                        </div>

                        <div className='form-group mt-3'>
                            <label htmlFor="">Harga</label>
                            <input type="text" value={System.convertRupiah(this.state.lain.harga || "")} onChange={this.handleHarga} className="form-control" />
                        </div>

                        <div className='form-group mt-3'>
                            <label htmlFor="">Deskripsi</label>
                            <textarea cols={30} rows={4} value={this.state.lain.desc} onChange={this.handleDesc} className="form-control"></textarea>
                        </div>
                        <div className='alert alert-danger text-end mt-3'>
                            <b>Zona Berbahaya</b> <button className='btn btn-danger btn-sm' onClick={this.handleOpenDelete}>Hapus</button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.closeModal}>
                            Batal
                        </Button>
                        <Button variant="primary" disabled={this.state.disabled} onClick={this.handleEdit}>
                            Edit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ModalDetailPekerjaanLain;