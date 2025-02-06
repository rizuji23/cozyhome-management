import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'react-select-search/style.css'
import System from '../../module/System';
import LoadingButton from '../etc/LoadingButton';
import withReactContent from 'sweetalert2-react-content'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import ProgressProject from '../../module/ProgressProject';
const MySwal = withReactContent(Swal)
class ModalDetailProgress extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            progress: {
                nama_progress: "",
                status: "",
                desc: "",
                percentage: 0,
                id_user: JSON.parse(localStorage.getItem("user-cozyproject")).id_user,
                foto: "",
            },
            disabled: true,
            foto_true: "",
            data_auth: localStorage.getItem("user-cozyproject"),
        }

        this.validated = this.validated.bind(this);
        this.handleNamaProgress = this.handleNamaProgress.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleDesc = this.handleDesc.bind(this);
        this.clearState = this.clearState.bind(this);
        this.handleFoto = this.handleFoto.bind(this);
        this.handleOpenDelete = this.handleOpenDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    validated() {
        if (System.isObjectEmpty(this.state.progress)) {
            this.setState({ disabled: false });
        } else {
            this.setState({ disabled: true });
        }
    }

    clearState() {
        this.setState({
            progress: {
                nama_progress: "",
                status: "",
                desc: "",
                percentage: 0,
                id_user: JSON.parse(localStorage.getItem("user-cozyproject")).id_user,
                foto: "",
            }
        })
    }

    handleNamaProgress(e) {
        this.setState(prevState => ({
            progress: {
                ...prevState.progress,
                nama_progress: e.target.value,
            }
        }), () => {
            this.validated();
        });
    }

    handleStatus(e) {
        this.setState(prevState => ({
            progress: {
                ...prevState.progress,
                status: e.target.value,
            }
        }), () => {
            this.validated();
        });
    }

    handleDesc(e) {
        this.setState(prevState => ({
            progress: {
                ...prevState.progress,
                desc: e.target.value,
            }
        }), () => {
            this.validated();
        });
    }

    handleFoto(e) {
        this.setState({
            foto_true: e.target.files,
        });
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps.isOpen !== this.props.isOpen) {
            console.log(this.props.isOpen);
            this.setState({
                progress: {
                    nama_progress: this.props.isOpen.data.nama_progress,
                    status: this.props.isOpen.data.status,
                    desc: this.props.isOpen.data.desc,
                    percentage: this.props.isOpen.data.percentage,
                    id_user: JSON.parse(localStorage.getItem("user-cozyproject")).id_user,
                    foto: this.props.isOpen.data.foto,
                }
            })
        }
    }

    handleEdit() {
        const data = { ...this.state.progress, id_project: this.props.id_project, id: this.props.isOpen.data.id_progress_project, foto: this.state.foto_true }
        ProgressProject.update(data, this.state.data_auth).then((result) => {
            console.log(result);
            toast.success("Progress Projek berhasil diedit.");
            this.props.getProgress();
            this.props.closeModal();
        }).catch((err) => {
            toast.error("Progress Projek gagal diedit.");
        })
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
                const data = { ...this.state.progress, id_project: this.props.id_project, id: this.props.isOpen.data.id_progress_project, foto: this.state.foto_true }
                console.log(data);
                ProgressProject.delete(data, this.state.data_auth).then((result) => {
                    toast.success("Progress Projek berhasil dihapus.");
                    this.props.getProgress();
                    this.props.closeModal();
                }).catch((err) => {
                    toast.error("Progress Projek gagal dihapus.");
                })
            }
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <Modal show={this.props.isOpen.show} onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Detail Progress</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='form-group'>
                            <label htmlFor="">Judul Progress</label>
                            <input type="text" onChange={this.handleNamaProgress} value={this.state.progress.nama_progress} className="form-control" />
                        </div>

                        <div className='form-group mt-3'>
                            <label htmlFor="">Status Progress</label>
                            <select name="" onChange={this.handleStatus} className='form-control' id="">
                                <option value={this.state.progress.status}>{this.state.progress.status}</option>
                                <option value="">Pilih Status</option>
                                <option value="On Progress 25%">On Progress 25%</option>
                                <option value="On Progress 50%">On Progress 50%</option>
                                <option value="On Progress 100%">On Progress 100%</option>
                                <option value="Perakitan Projek Di Lokasi">Perakitan Projek Di Lokasi</option>
                                <option value="Projek Selesai">Projek Selesai</option>
                            </select>
                        </div>

                        <div className='form-group mt-3'>
                            <img src={`https://apicozy.rlstudio.my.id${this.state.progress.foto}`} width={150} alt="" /><br />
                            <label htmlFor="">Foto</label>
                            <input type="file" className='form-control' onChange={this.handleFoto} />
                        </div>

                        <div className='form-group mt-3'>
                            <label htmlFor="">Deskripsi</label>
                            <textarea cols={30} rows={4} onChange={this.handleDesc} value={this.state.progress.desc} className="form-control"></textarea>
                        </div>

                        <div className='alert alert-danger mt-3 text-end'>
                            <b>Zona Berbahaya</b> <button className='btn btn-danger btn-sm' onClick={this.handleOpenDelete}>Hapus</button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.closeModal}>
                            Batal
                        </Button>
                        <Button variant="primary" disabled={this.state.disabled} onClick={this.handleEdit}>
                            Edit <LoadingButton show={this.props.loading} />
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ModalDetailProgress;