import React from "react";
import Navbar from "../etc/Navbar";
import Sidebar from "../etc/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import HelmetTitle from "../etc/HelmetTitle";
import { Link } from "react-router-dom";
import ProjectModule from "../../module/ProjectModule";
import System from "../../module/System";
import moment from "moment";
import SelectSearch from "react-select-search";
import RincianUnitSystem from "../../module/RincianUnit";
import ModalAddKategoriUnit from "../modal/ModalAddKategoriUnit";
import LoadingButton from "../etc/LoadingButton";

export default class AddRincianUnit extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            data_auth: localStorage.getItem("user-cozyproject"),
            kategori_unit: [],
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

    componentDidMount(): void {
        this.getProject();
        this.getKategoriUnit();
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevState.rincian !== this.state.rincian) {
            console.log(this.state.rincian);
        }
    }



    send() {
        this.setState({
            disabled: true,
            loading: true
        })
        RincianUnitSystem.addRincianUnit(this.state.rincian, this.state.data_auth).then((result: any) => {
            this.setState({
                loading: false,
                rincian: {
                    nama_unit: "",
                    id_kategori_unit: "",
                    dimensi: "",
                    desc: "",
                    id_project: "",
                }
            }, () => {
                this.validated();
            });
            toast.success("Unit berhasil di tambah");
        }).catch((err) => {
            this.setState({
                loading: false
            });
            toast.error("Unit gagal di tambah");
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Tambah Rincian Unit" />
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
                <Navbar title="Tambah Rincian Unit" />
                <div className="main">
                    <div className="main-content project">
                        <div className="box">
                            <div className="box-body">
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

                                <div className="gr-btn mt-4 text-end">
                                    <Link to="/rincian_unit" className="btn btn-danger btn-lg mr-15 fs-16">CLOSE</Link>
                                    <button className="btn btn-primary btn-lg fs-16" disabled={this.state.disabled} onClick={() => this.send()}>SIMPAN <LoadingButton show={this.state.loading} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ModalAddKategoriUnit isOpen={this.state.isOpen} closeModal={() => this.closeModal()} getKategoriUnit={() => this.getKategoriUnit()} />
            </>
        )
    }
}