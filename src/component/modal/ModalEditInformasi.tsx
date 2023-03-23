import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import System from '../../module/System';

class ModalEditInformasi extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            project: {
                nama_project: "",
                jumlah_volumn: "",
                kategori_project: "",
                desc: "",
                id_user: "",
                id: "",
            }
        }

        this.validated = this.validated.bind(this);
        this.handleNamaProject = this.handleNamaProject.bind(this);
        this.handleJumlahVolumn = this.handleJumlahVolumn.bind(this);
        this.handleKategori = this.handleKategori.bind(this);
        this.handleDesc = this.handleDesc.bind(this);
        this.setDetail = this.setDetail.bind(this);
    }

    setDetail() {
        this.setState({
            project: {
                id: this.props.data_project.id_project,
                nama_project: this.props.data_project.nama_project,
                jumlah_volumn: this.props.data_project.jumlah_volumn,
                kategori_project: this.props.data_project.kategori_project,
                desc: this.props.data_project.desc,
                id_user: JSON.parse(localStorage.getItem("user-cozyproject")).id_user,
            }
        })
    }

    componentDidMount(): void {
        this.setDetail();
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps.isOpen !== this.props.isOpen) {
            this.setDetail();
        }
    }

    validated() {
        if (System.isObjectEmpty(this.state.project)) {
            this.setState({ disabled: false });
        } else {
            this.setState({ disabled: true });
        }
    }

    handleNamaProject(e) {
        this.setState(prevState => ({
            project: {
                ...prevState.project,
                nama_project: e.target.value,
            }
        }), () => {
            this.validated();
        });
    }

    handleJumlahVolumn(e) {
        this.setState(prevState => ({
            project: {
                ...prevState.project,
                jumlah_volumn: e.target.value,
            }
        }), () => {
            this.validated();
        });
    }

    handleKategori(e) {
        this.setState(prevState => ({
            project: {
                ...prevState.project,
                kategori_project: e.target.value,
            }
        }), () => {
            this.validated();
        });
    }

    handleDesc(e) {
        this.setState(prevState => ({
            project: {
                ...prevState.project,
                desc: e.target.value,
            }
        }), () => {
            this.validated();
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Informasi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='form-group'>
                            <label htmlFor="">Nama Projek</label>
                            <input type="text" value={this.state.project.nama_project} onChange={this.handleNamaProject} className="form-control" />
                        </div>

                        <div className="form-group mt-3">
                            <label className="form-label">Jumlah Volumn</label>
                            <div className="input-group">
                                <input type="text" value={this.state.project.jumlah_volumn} onChange={this.handleJumlahVolumn} className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                                <span className="input-group-text">m2</span>
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <label className="form-label">Kategori</label>
                            <select name="" defaultValue={this.state.project.kategori_project} onChange={this.handleKategori} className='form-control' id="">
                                <option value="">Pilih Kategori Projek</option>
                                <option value={this.state.project.kategori_project}>{this.state.project.kategori_project}</option>
                                <option value="Residential">Residential</option>
                                <option value="Komersial">Komersial</option>
                            </select>
                        </div>

                        <div className='form-group mt-3'>
                            <label htmlFor="">Deskripsi</label>
                            <textarea cols={30} rows={4} className="form-control" onChange={this.handleDesc} value={this.state.project.desc}></textarea>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.closeModal}>
                            Batal
                        </Button>
                        <Button variant="primary" onClick={() => this.props.handleEditProject(this.state.project)}>
                            Edit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ModalEditInformasi;