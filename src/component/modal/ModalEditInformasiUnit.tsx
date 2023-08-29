import React from "react";
import { Button, Modal } from "react-bootstrap";
import System from "../../module/System";
import RincianUnitSystem from "../../module/RincianUnit";
import ProjectModule from "../../module/ProjectModule";
import { Link } from "react-router-dom";
import SelectSearch from "react-select-search";
import ModalAddKategoriUnit from "./ModalAddKategoriUnit";
import { toast } from "react-toastify";
import LoadingButton from "../etc/LoadingButton";

class ModalEditInformasiUnit extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            data_auth: localStorage.getItem("user-cozyproject"),
            kategori_unit: [],
            data_rincian: [],
            isOpen: false,
            rincian: {
                nama_unit: "",
                id_kategori_unit: "",
                dimensi: "",
                desc: "",
                id_project: "",
            },
            disabled: true,
            loading: true,
        }
        this.getProject = this.getProject.bind(this);
    }

    openModel() {
        this.setState({
            isOpen: true
        })
    }

    closeModal() {
        this.setState({
            isOpen: false
        })
    }

    getProject() {
        ProjectModule.get(this.state.data_auth).then((result: any) => {
            console.log(result.data.data.project);
            let no = 1;
            const data = result.data.data.project.map(el => {
                return {
                    name: `${el.nama_project} (${el.nama_customer})`,
                    value: el.id_project
                }
            });

            this.setState({
                data: data,
                loading: false
            })
        }).catch((reject) => {
            console.log(reject)
        })
    }

    getKategoriUnit() {
        RincianUnitSystem.getKategoriUnit('all', this.state.data_auth).then((result: any) => {
            console.log(result);
            this.setState({

                kategori_unit: result.data.data.kategori_unit
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    validated() {
        if (System.isObjectEmpty(this.state.rincian)) {
            this.setState({ disabled: false });
        } else {
            this.setState({ disabled: true });
        }
    }

    getRincianUnit() {
        this.setState({
            loading: true,
            disabled: true,
        });
        RincianUnitSystem.getRincianUnit(this.props.id, this.state.data_auth).then((result: any) => {
            console.log(result);
            this.setState({
                loading: false,
                data_rincian: result.data.data.rincian_unit,
                rincian: {
                    nama_unit: result.data.data.rincian_unit.nama_unit,
                    id_kategori_unit: result.data.data.rincian_unit.id_kategori_unit,
                    dimensi: result.data.data.rincian_unit.dimensi,
                    desc: result.data.data.rincian_unit.desc,
                    id_project: result.data.data.rincian_unit.id_project,
                }
            });
        }).catch((err) => {
            console.log(err);
        })
    }



    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevState.rincian !== this.state.rincian) {
            console.log(this.state.rincian);
        }

        if (prevProps.isOpen !== this.props.isOpen) {
            this.getProject();
            this.getKategoriUnit();
            this.getRincianUnit();
        }
    }

    send() {
        this.setState({
            loading: true,
            disabled: true,
        });
        console.log("dd", { ...this.state.rincian, id: this.props.id, type_edit: 'except' })
        RincianUnitSystem.editRincianUnit({ ...this.state.rincian, id: this.props.id, type_edit: 'except' }, this.state.data_auth).then((result: any) => {
            this.setState({
                loading: false,
            });
            this.props.getAPI();
            this.props.closeModal();
            toast.success("Informasi berhasil diedit");
        }).catch((err) => {
            this.setState({
                loading: false,
            });
            toast.error("Informasi gagal diedit");
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Informasi Unit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-6 col-sm-12 mb-24">
                                <div className="form-group">
                                    <label htmlFor="">Projek</label>
                                    <div>
                                        <SelectSearch options={this.state.data} value={this.state.rincian.id_project} onChange={(e) => {
                                            this.setState(prevState => ({
                                                rincian: {
                                                    ...prevState.rincian,
                                                    id_project: e
                                                }
                                            }), () => {
                                                this.validated();
                                            })
                                        }} search />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12 mb-24">
                                <div className="form-group">
                                    <label htmlFor="">Kategori Unit</label>
                                    <select name="" className="form-control" onChange={(e) => {
                                        this.setState(prevState => ({
                                            rincian: {
                                                ...prevState.rincian,
                                                id_kategori_unit: e.target.value
                                            }
                                        }), () => {
                                            this.validated();
                                        })
                                    }} id="">
                                        <option value={this.state.data_rincian.id_kategori_unit}>{this.state.data_rincian.kategori_unit}</option>
                                        <option value="">Pilih Kategori Unit</option>
                                        {
                                            this.state.kategori_unit.map((el: any) => {
                                                return (
                                                    <option value={el.id_kategori_unit}>{el.nama_kategori}</option>
                                                )
                                            })
                                        }
                                    </select>

                                    <Link to="#" className='mt-2' onClick={() => this.openModel()}>Tambah Kategori Unit Baru?</Link>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 col-sm-12 mb-24">
                                <div className="form-group mt-1">
                                    <label htmlFor="">Nama Unit</label>
                                    <input type="text" value={this.state.rincian.nama_unit} onChange={(e) => {
                                        this.setState(prevState => ({
                                            rincian: {
                                                ...prevState.rincian,
                                                nama_unit: e.target.value
                                            }
                                        }), () => {
                                            this.validated();
                                        })
                                    }} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12 mb-24">
                                <div className="form-group">
                                    <label className="form-label">Jumlah Volumn</label>
                                    <div className="input-group">
                                        <input type="text" value={this.state.rincian.dimensi} onChange={(e) => {
                                            this.setState(prevState => ({
                                                rincian: {
                                                    ...prevState.rincian,
                                                    dimensi: e.target.value
                                                }
                                            }), () => {
                                                this.validated();
                                            })
                                        }} className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                                        <span className="input-group-text">m2</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Deskripsi</label>
                            <textarea className="form-control" value={this.state.rincian.desc} onChange={(e) => {
                                this.setState(prevState => ({
                                    rincian: {
                                        ...prevState.rincian,
                                        desc: e.target.value
                                    }
                                }), () => {
                                    this.validated();
                                })
                            }}></textarea>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.closeModal}>
                            Batal
                        </Button>
                        <Button variant="primary" disabled={this.state.disabled} onClick={() => this.send()}>
                            Edit
                            <LoadingButton show={this.state.loading} />
                        </Button>
                    </Modal.Footer>
                </Modal>
                <ModalAddKategoriUnit isOpen={this.state.isOpen} closeModal={() => this.closeModal()} getKategoriUnit={() => this.getKategoriUnit()} />
            </>
        )
    }
}

export default ModalEditInformasiUnit;