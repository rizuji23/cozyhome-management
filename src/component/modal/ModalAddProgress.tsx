import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'react-select-search/style.css'
import System from '../../module/System';
import LoadingButton from '../etc/LoadingButton';

class ModalAddProgress extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            progress: {
                nama_progress: "",
                status: "",
                desc: "",
                percentage: 0,
                id_user: JSON.parse(localStorage.getItem("user-cozyproject")).id_user,
            },
            disabled: true,
        }

        this.validated = this.validated.bind(this);
        this.handleNamaProgress = this.handleNamaProgress.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleDesc = this.handleDesc.bind(this);
        this.clearState = this.clearState.bind(this);
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
                        <Modal.Title>Tambah Progress</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='form-group'>
                            <label htmlFor="">Judul Progress</label>
                            <input type="text" onChange={this.handleNamaProgress} value={this.state.progress.nama_progress} className="form-control" />
                        </div>

                        <div className='form-group mt-3'>
                            <label htmlFor="">Status Progress</label>
                            <select name="" onChange={this.handleStatus} className='form-control' id="">
                                <option value="">Pilih Status</option>
                                <option value="On Progress 25%">On Progress 25%</option>
                                <option value="On Progress 50%">On Progress 50%</option>
                                <option value="On Progress 100%">On Progress 100%</option>
                                <option value="Perakitan Projek Di Lokasi">Perakitan Projek Di Lokasi</option>
                                <option value="Projek Selesai">Projek Selesai</option>
                            </select>
                        </div>

                        <div className='form-group mt-3'>
                            <label htmlFor="">Deskripsi</label>
                            <textarea cols={30} rows={4} onChange={this.handleDesc} value={this.state.progress.desc} className="form-control"></textarea>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.closeModal}>
                            Batal
                        </Button>
                        <Button variant="primary" disabled={this.state.disabled} onClick={() => this.props.handleSimpanProgress(this.state.progress)}>
                            Simpan <LoadingButton show={this.props.loading} />
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ModalAddProgress;