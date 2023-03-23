import React from 'react';
import HelmetTitle from './etc/HelmetTitle';
import Sidebar from './etc/Sidebar';
import Navbar from './etc/Navbar';
import DataTable from 'react-data-table-component';
import ModalAddBahan from './modal/ModalAddBahan';
import ModalAddProgress from './modal/ModalAddProgress';
import ModalEditInformasi from './modal/ModalEditInformasi';
import ModalEditCost from './modal/ModalEditCost';
import { Link } from 'react-router-dom';
import ModalAddPekerjaan from './modal/ModalAddPekerjaan';
import { withRouter } from './etc/withRouter';
import ProjectModule from '../module/ProjectModule';
import { rejects } from 'assert';
import Cost from '../module/Cost';
import System from '../module/System';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import ProgressProject from '../module/ProgressProject';
import moment from 'moment';

class DetailProjek extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            column: [
                {
                    name: "No",
                    selector: row => row.no,
                    width: "50px"
                },
                {
                    name: "ID",
                    selector: row => row.id_material,
                },
                {
                    name: "Nama",
                    selector: row => row.nama_material,
                },
                {
                    name: "Jenis Material",
                    selector: row => row.jenis_material,
                },
                {
                    name: "Harga",
                    selector: row => row.harga_material,
                },
                {
                    name: "Qty",
                    selector: row => row.qty,
                },
                {
                    name: "Total All",
                    selector: row => row.total_all,
                },
                {
                    name: "Tanggal",
                    selector: row => row.created_at,
                }
            ],
            data: [],
            column_progress: [
                {
                    name: "No",
                    selector: row => row.no,
                    width: "50px"
                },
                {
                    name: "Judul Progress",
                    selector: row => row.nama_progress,
                },
                {
                    name: "Status",
                    selector: row => row.status
                },
                {
                    name: "Deskripsi",
                    selector: row => row.desc,
                },
                {
                    name: "Tanggal",
                    selector: row => row.created_at,
                }
            ],
            data_progress: [],
            column_lain: [
                {
                    name: "No",
                    selector: row => row.no,
                    width: "50px"
                },
                {
                    name: "Nama Pekerjaan",
                    selector: row => row.nama_progress,
                },
                {
                    name: "Deskripsi",
                    selector: row => row.desc,
                },
                {
                    name: "Harga",
                    selector: row => row.harga_lain
                },
                {
                    name: "Tanggal",
                    selector: row => row.created_at,
                }
            ],
            data_lain: [],
            isOpenBahan: false,
            isOpenProgress: false,
            isOpenInformasi: false,
            isOpenCost: false,
            isOpenPekerjaan: false,
            data_cost: "",
            data_auth: localStorage.getItem("user-cozyproject"),
            data_project: {},
            cost_data: {
                cost_bahan: 0,
                cost_design: 0,
                cost_operasional: 0,
                cost_produksi: 0,
                cost_lain: 0,
            },
            loading_modal: false,
        }

        console.log(this.props)

        this.openBahan = this.openBahan.bind(this);
        this.closeBahan = this.closeBahan.bind(this);
        this.openProgress = this.openProgress.bind(this);
        this.closeProgress = this.closeProgress.bind(this);
        this.openInformasi = this.openInformasi.bind(this);
        this.closeInformasi = this.closeInformasi.bind(this);
        this.openCost = this.openCost.bind(this);
        this.closeCost = this.closeCost.bind(this);
        this.openPekerjaan = this.openPekerjaan.bind(this);
        this.closePekerjaan = this.closePekerjaan.bind(this);
        this.getDetail = this.getDetail.bind(this);
        this.getCost = this.getCost.bind(this);
        this.handleEditProject = this.handleEditProject.bind(this);
        this.handleEditCost = this.handleEditCost.bind(this);
        this.handleSimpanProgress = this.handleSimpanProgress.bind(this);
        this.getProgress = this.getProgress.bind(this);
    }

    openBahan() {
        this.setState({
            isOpenBahan: true,
        });
    }

    closeBahan() {
        this.setState({
            isOpenBahan: false,
        })
    }

    openPekerjaan() {
        this.setState({
            isOpenPekerjaan: true,
        });
    }

    closePekerjaan() {
        this.setState({
            isOpenPekerjaan: false,
        })
    }

    openProgress() {
        this.setState({
            isOpenProgress: true,
        });
    }

    closeProgress() {
        this.setState({
            isOpenProgress: false,
        });
    }

    openInformasi() {
        this.setState({
            isOpenInformasi: true,
        });
    }

    closeInformasi() {
        this.setState({
            isOpenInformasi: false,
        });
    }

    openCost(data) {
        this.setState({
            isOpenCost: true,
            data_cost: data,
        });
    }

    closeCost() {
        this.setState({
            isOpenCost: false,
        });
    }

    getDetail() {
        const id_project = this.props.params.id;

        ProjectModule.getDetail({ id_project: id_project }, this.state.data_auth).then((result) => {
            console.log(result);
            this.setState({
                data_project: result.data.data.project
            })
        }).catch((rejects) => {
            console.log(rejects);
        })
    }

    getCost() {
        const id_project = this.props.params.id;

        Cost.get({ id: id_project }, this.state.data_auth).then((result) => {
            console.log(result);
            this.setState({
                cost_data: result.data.data.cost_project
            })
        }).catch((rejects) => {
            console.log(rejects);
        })
    }

    getProgress() {
        const id_project = this.props.params.id;

        ProgressProject.get({ id: id_project }, this.state.data_auth).then((result) => {
            console.log(result);
            let no = 1;
            result.data.data.progress_project.map(el => {
                el['no'] = no++;
                el['created_at'] = moment(el.created_at, "YYYY-MM-DD").format("DD-MM-YYYY");
            })
            this.setState({
                data_progress: result.data.data.progress_project
            })
        }).catch((rejects) => {
            console.log(rejects);
        })
    }

    componentDidMount(): void {
        this.getDetail();
        this.getCost();
        this.getProgress();
    }

    handleEditProject(data_project) {
        ProjectModule.edit(data_project, this.state.data_auth).then((result) => {
            console.log(result);
            this.getDetail();
            toast.success("Project berhasil diubah");
            this.closeInformasi();
        }).catch((rejects) => {
            console.log(rejects);
            toast.error("Terjadi Kesalahan");
        })
    }

    handleEditCost(cost) {
        console.log(cost)
        var url = "";
        if (cost.title === "Cost Produksi") {
            url = "cost_produksi"
        } else if (cost.title === "Cost Design") {
            url = "cost_design"
        } else if (cost.title === "Cost Oprasional") {
            url = "cost_operasional"
        }

        console.log(url)

        Cost.editProduksi(cost, this.state.data_auth, url).then((result) => {
            console.log(result);
            this.getCost();
            this.getDetail();
            toast.success(`${cost.title} berhasil diubah`);
            this.closeCost();
        }).catch((rejects) => {
            console.log(rejects);
            toast.error(`${cost.title} gagal diubah`);
        });
    }

    handleSimpanProgress(data) {
        console.log(data)
        this.setState({
            loading_modal: true,
        })
        ProgressProject.add(data, this.state.data_auth, this.state.data_project.id_project).then((result) => {
            console.log(result);
            this.setState({
                loading_modal: false,
            });
            this.getDetail();
            this.getProgress();
            this.closeProgress();
            toast.success("Progress Project berhasil ditambah");
        }).catch((rejects) => {
            console.log(rejects);
            this.setState({
                loading_modal: false,
            });
            toast.error("Terjadi Kesalahan")
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Detail Projek" />
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
                <Navbar title="Detail Projek" />
                <div className="main">
                    <div className="main-content project">
                        <div className='row'>
                            <div className='col-sm col-md'>
                                <div className='box'>
                                    <div className='box-body'>
                                        <div className='d-flex'>
                                            <div>
                                                <div>
                                                    <small>Nama Projek</small>
                                                    <h3>{this.state.data_project.nama_project}</h3>
                                                </div>
                                                <div>
                                                    <small>Volume</small>
                                                    <h3>{this.state.data_project.jumlah_volumn} m2</h3>
                                                </div>
                                            </div>
                                            <div className='ms-5'>
                                                <small>Timeline Projek</small>
                                                <h3>{this.state.data_project.estimasi_pengerjaan} Hari</h3>

                                                <small>Kategori Projek</small>
                                                <h3>{this.state.data_project.kategori_project}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-end'>
                                        <button className='btn btn-success btn-sm mt-1 mb-1' onClick={this.openInformasi}><i className='bx bxs-edit' ></i> Edit Informasi</button>
                                    </div>
                                    <hr />
                                    <div className='mt-4'>
                                        <div className='row mb-2'>
                                            <div className='col-sm'>
                                                <h5>Rincian Kebutuhan Material ({this.state.data_project.nama_project})</h5>
                                            </div>
                                            <div className='col-sm text-end'>
                                                <button className='btn btn-primary btn-sm' onClick={this.openBahan}><i className='bx bx-plus'></i> Tambah Item</button>
                                                <button className='btn btn-info btn-sm ms-2'>Print</button>
                                            </div>
                                        </div>
                                        <DataTable columns={this.state.column} data={this.state.data} pagination />
                                    </div>

                                    <div className='mt-4'>
                                        <div className='row mb-2'>
                                            <div className='col-sm'>
                                                <h5>Rincian Pekerjaan Lain-Lain ({this.state.data_project.nama_project})</h5>
                                            </div>
                                            <div className='col-sm text-end'>
                                                <button className='btn btn-primary btn-sm' onClick={this.openPekerjaan}><i className='bx bx-plus'></i> Tambah Pekerjaan</button>
                                                <button className='btn btn-info btn-sm ms-2'>Print</button>
                                            </div>
                                        </div>
                                        <DataTable columns={this.state.column_lain} data={this.state.data_lain} pagination />
                                    </div>
                                </div>
                                <div className='box mt-4'>
                                    <div className="pt-0 mb-3">
                                        <div className='d-flex'>
                                            <div className='flex-grow-1'>
                                                <h4 className="card-title mb-0 fs-22">Progress Projek</h4>
                                                <p className='mb-0 mt-1'>Progress Sekarang: <span className="badge text-bg-primary">{this.state.data_project.status}</span></p>
                                            </div>
                                            <div>
                                                <button className='btn btn-primary btn-sm' onClick={this.openProgress}><i className='bx bx-plus'></i> Tambah Progress</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='box-body'>
                                        <DataTable columns={this.state.column_progress} data={this.state.data_progress} pagination />

                                        <div className='d-grid mt-4'>
                                            <Link to={'/detail_progress'} className='btn btn-primary' target="_blank">Lihat Detail Progress Projek</Link>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div className='col-sm-4 col-md-4 col'>
                                <div className='box'>
                                    <div className='box-body'>
                                        <div className='mb-4'>
                                            <p className='mb-1 text-black'>Projek: </p>
                                            <h3>{this.state.data_project.nama_project}</h3>
                                        </div>
                                        <div className='mb-4'>
                                            <p className='mb-1 text-black'>Cost Material</p>
                                            <h3>Rp. {System.convertRupiah(this.state.cost_data.cost_bahan)}</h3>
                                        </div>
                                        <div className='mb-4'>
                                            <p className='mb-1 text-black'>Cost Produksi</p>
                                            <div className='d-flex'>
                                                <div className='me-3'>
                                                    <h3>Rp. {System.convertRupiah(this.state.cost_data.cost_produksi)}</h3>
                                                </div>
                                                <div className='align-self-center'>
                                                    <button className='btn btn-success btn-sm' onClick={() => this.openCost("Cost Produksi")}><i className='bx bxs-edit' ></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='mb-4'>
                                            <p className='mb-1 text-black'>Cost Design</p>
                                            <div className='d-flex'>
                                                <div className='me-3'>
                                                    <h3>Rp. {System.convertRupiah(this.state.cost_data.cost_design)}</h3>
                                                </div>
                                                <div className='align-self-center'>
                                                    <button className='btn btn-success btn-sm' onClick={() => this.openCost("Cost Design")}><i className='bx bxs-edit' ></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='mb-4'>
                                            <p className='mb-1 text-black'>Cost Operasional</p>
                                            <div className='d-flex'>
                                                <div className='me-3'>
                                                    <h3>Rp. {System.convertRupiah(this.state.cost_data.cost_operasional)}</h3>
                                                </div>
                                                <div className='align-self-center'>
                                                    <button className='btn btn-success btn-sm' onClick={() => this.openCost("Cost Oprasional")}><i className='bx bxs-edit' ></i></button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='mb-4'>
                                            <p className='mb-1 text-black'>Cost Pekerjaan Lain-Lain</p>
                                            <div className='d-flex'>
                                                <div className='me-3'>
                                                    <h3>Rp. {System.convertRupiah(this.state.cost_data.cost_lain)}</h3>
                                                </div>

                                            </div>
                                        </div>


                                        <hr />
                                        <div className='alert alert-primary'>
                                            <p className='mb-1 text-primary font-w500'>Total Keseluruhan</p>
                                            <h3 className='text-primary'>Rp. {this.state.data_project.total_cost !== undefined && System.convertRupiah(this.state.data_project.total_cost)}</h3>
                                        </div>

                                        <div className='mt-3 d-grid'>
                                            <button className='btn btn-primary'>Print</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='box'>
                            <div className='box-body'>
                                <div className='alert alert-danger'>
                                    <h6>Zona Berbahaya</h6>
                                    <hr />
                                    <div className='d-grid'>
                                        <button className='btn btn-danger'>Hapus Projek</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ModalAddBahan isOpen={this.state.isOpenBahan} closeModal={this.closeBahan} />
                <ModalAddProgress handleSimpanProgress={this.handleSimpanProgress} status={this.state.loading_modal} isOpen={this.state.isOpenProgress} closeModal={this.closeProgress} />
                <ModalEditInformasi isOpen={this.state.isOpenInformasi} closeModal={this.closeInformasi} data_project={this.state.data_project} handleEditProject={this.handleEditProject} />
                <ModalAddPekerjaan isOpen={this.state.isOpenPekerjaan} closeModal={this.closePekerjaan} />
                <ModalEditCost isOpen={this.state.isOpenCost} handleEditCost={this.handleEditCost} closeModal={this.closeCost} cost_data={this.state.cost_data} title={this.state.data_cost} />
            </>
        )
    }
}

export default withRouter(DetailProjek);