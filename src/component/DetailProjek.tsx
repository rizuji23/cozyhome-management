import React from 'react';
import HelmetTitle from './etc/HelmetTitle';
import Sidebar from './etc/Sidebar';
import Navbar from './etc/Navbar';
import DataTable from 'react-data-table-component';
import ModalAddBahan from './modal/ModalAddBahan';
import ModalAddProgress from './modal/ModalAddProgress';
import ModalEditInformasi from './modal/ModalEditInformasi';
import ModalEditCost from './modal/ModalEditCost';
import { Link, Navigate } from 'react-router-dom';
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
import Stok from '../module/Stok';
import PekerjaanLain from '../module/PekerjaanLain';
import LoadingFull from './etc/LoadingFull';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ModalDetailPekerjaanLain from './modal/ModalDetailPekerjaanLain';
import ModalDetailProgress from './modal/ModalDetailProgress';
const MySwal = withReactContent(Swal)

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
                    name: "Nama",
                    selector: row => row.nama_material,
                },
                {
                    name: "Jenis Material",
                    selector: row => row.kategori_material,
                },
                {
                    name: "Harga",
                    selector: row => System.convertRupiah(row.harga),
                },
                {
                    name: "Qty",
                    selector: row => row.stok_out,
                },
                {
                    name: "Total All",
                    selector: row => System.convertRupiah(row.total_all),
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
                },
                {
                    name: "Opsi",
                    selector: row => row.opsi,
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
                    selector: row => row.nama_pekerjaan,
                },
                {
                    name: "Deskripsi",
                    selector: row => row.desc,
                },
                {
                    name: "Harga",
                    selector: row => row.harga
                },
                {
                    name: "Tanggal",
                    selector: row => row.created_at,
                },
                {
                    name: "Opsi",
                    selector: row => row.opsi,
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
            loading: true,
            navigate: false,
            isOpenDetailPekerjaan: {
                show: false,
                data: ""
            },
            isOpenDetailProgress: {
                show: false,
                data: "",
            }
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
        this.handleTambahBahan = this.handleTambahBahan.bind(this);
        this.getStokOut = this.getStokOut.bind(this);
        this.handleSimpanPekerjaanLain = this.handleSimpanPekerjaanLain.bind(this);
        this.getPekerjaanLain = this.getPekerjaanLain.bind(this);
        this.handleOpenDelete = this.handleOpenDelete.bind(this);
        this.handleOpenDetailPekerjaan = this.handleOpenDetailPekerjaan.bind(this);
        this.handleCloseDetailPekerjaan = this.handleCloseDetailPekerjaan.bind(this);
        this.handleOpenProgress = this.handleOpenProgress.bind(this);
        this.handleCloseProgress = this.handleCloseProgress.bind(this);
    }

    handleOpenProgress(data) {
        this.setState({
            isOpenDetailProgress: {
                show: true,
                data: data,
            }
        })
    }

    handleCloseProgress() {
        this.setState({
            isOpenDetailProgress: {
                show: false,
                data: "",
            }
        })
    }

    handleOpenDetailPekerjaan(data) {
        this.setState({
            isOpenDetailPekerjaan: {
                show: true,
                data: data
            },
        })
    }

    handleCloseDetailPekerjaan() {
        this.setState({
            isOpenDetailPekerjaan: {
                show: false,
                data: ""
            },
        })
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
        this.setState({
            loading: true,
        })
        const id_project = this.props.params.id;

        ProjectModule.getDetail({ id_project: id_project }, this.state.data_auth).then((result) => {
            console.log(result);
            this.setState({
                data_project: result.data.data.project,
                loading: false,
            })
        }).catch((rejects) => {
            console.log(rejects);
        })
    }

    getCost() {
        this.setState({
            loading: true,
        })
        const id_project = this.props.params.id;

        Cost.get({ id: id_project }, this.state.data_auth).then((result) => {
            console.log(result);
            this.setState({
                cost_data: result.data.data.cost_project,
                loading: false,
            })
        }).catch((rejects) => {
            console.log(rejects);
        })
    }

    getProgress() {
        this.setState({
            loading: true,
        })
        const id_project = this.props.params.id;

        ProgressProject.get({ id: id_project }, this.state.data_auth).then((result) => {
            console.log(result);
            let no = 1;
            result.data.data.progress_project.map(el => {
                el['no'] = no++;
                el['created_at'] = moment(el.created_at, "YYYY-MM-DD").format("DD-MM-YYYY");
                el['opsi'] = <>
                    <a className='text-success me-2' href='javascript:void(0)' onClick={() => this.handleOpenProgress(el)}>Detail</a>
                </>
            })
            this.setState({
                data_progress: result.data.data.progress_project,
                loading: false
            })
        }).catch((rejects) => {
            console.log(rejects);
        })
    }

    getPekerjaanLain() {
        this.setState({
            loading: true,
        })
        const id_project = this.props.params.id;

        PekerjaanLain.get({ id: id_project }, this.state.data_auth).then((result) => {
            console.log(result);
            let no = 1;
            result.data.data.pekerjaan_lain.map(el => {
                el['no'] = no++;
                el['created_at'] = moment(el.created_at, "YYYY-MM-DD").format("DD-MM-YYYY");
                el['harga'] = System.convertRupiah(el.harga)
                el['opsi'] = <>
                    <a className='text-success me-2' href='javascript:void(0)' onClick={() => this.handleOpenDetailPekerjaan(el)}>Detail</a>
                </>
            })
            this.setState({
                data_lain: result.data.data.pekerjaan_lain,
                loading: false,
            })
        }).catch((rejects) => {
            console.log(rejects);
        })
    }

    getStokOut() {
        this.setState({
            loading: true,
        })
        const id_project = this.props.params.id;

        Stok.getList({ id_project: id_project }, this.state.data_auth).then((result) => {
            console.log(result);
            let no = 1;
            result.data.data.stok_out.map(el => {
                el['created_at'] = moment(el.created_at, "YYYY-MM-DD").format("DD-MM-YYYY");
                el['harga'] = System.convertRupiah(el.harga);
            });

            const data = []

            result.data.data.stok_out.reduce((res, val) => {
                if (!res[val.id_material_2]) {
                    res[val.id_material_2] = { id_material_2: val.id_material_2, nama_material: val.nama_material, kategori_material: val.kategori_material, harga: System.convertInt(val.harga), stok_out: 0, total_all: 0, created_at: val.created_at };
                    data.push(res[val.id_material_2]);
                }

                res[val.id_material_2].stok_out += val.stok_out;
                res[val.id_material_2].total_all += val.stok_out * System.convertInt(val.harga);
                return res
            }, {});

            data.map((el) => {
                el['no'] = no++;

            })

            console.log(data)
            this.setState({
                data: data,
                loading: false,
            })
        }).catch((rejects) => {
            console.log(rejects);
        })
    }

    componentDidMount(): void {
        this.getDetail();
        this.getCost();
        this.getProgress();
        this.getStokOut();
        this.getPekerjaanLain();
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

    handleTambahBahan(data) {
        const payload = {
            id_stok_gudang: data.id_stok_gudang,
            id_material: data.id_material,
            id_project: this.state.data_project.id_project,
            stok_out: data.qty,
            keterangan: "",
            id_user: JSON.parse(localStorage.getItem("user-cozyproject")).id_user,
        }

        console.log(payload)

        Stok.add(payload, this.state.data_auth).then((result) => {
            console.log(result);
            this.closeBahan();
            this.getStokOut();
            this.getCost();
            this.getDetail();
            toast.success("Kebutuhan Bahan berhasil ditambah");
        }).catch((rejects) => {
            console.log(rejects);
            toast.error("Terjadi Kesalahan");
        });
    }

    handleSimpanPekerjaanLain(data) {
        const payload = {
            id_project: this.state.data_project.id_project,
            nama_pekerjaan: data.nama_pekerjaan,
            desc: data.desc,
            harga: System.convertInt(data.harga),
            id_user: data.id_user
        }

        PekerjaanLain.add(payload, this.state.data_auth).then((result) => {
            console.log(result);
            this.closePekerjaan();
            this.getStokOut();
            this.getCost();
            this.getDetail();
            this.getPekerjaanLain();
            toast.success("Pekerjaan Lain berhasil ditambah");
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
                ProjectModule.delete(this.state.data_project.id_project, this.state.data_auth).then((result) => {
                    toast.success("Projek berhasil dihapus.");
                    this.setState({
                        navigate: <Navigate to={"/projek"} replace={true} />
                    })
                }).catch((err) => {
                    toast.error("Projek gagal dihapus");
                })
            }
        })
    }

    render(): React.ReactNode {
        return (
            <>
                {
                    this.state.navigate
                }
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
                <LoadingFull display={this.state.loading} />
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
                                                <div>
                                                    <small>Nama Customer</small>
                                                    <h3>{this.state.data_project.nama_customer}</h3>
                                                </div>
                                            </div>
                                            <div className='ms-5'>
                                                <small>Timeline Projek</small>
                                                <h3>{this.state.data_project.estimasi_pengerjaan} Hari</h3>

                                                <small>Kategori Projek</small>
                                                <h3>{this.state.data_project.kategori_project}</h3>

                                                <div>
                                                    <small>Tanggal Mulai & Akhir Project</small>
                                                    <h3>{this.state.data_project.start_date} ~ {this.state.data_project.end_date}</h3>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='mt-3'>
                                            <small>Deskripsi Projek</small>
                                            <p className='mt-1 text-black'>{this.state.data_project.desc}</p>
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
                                                <Link to={`/print_stok/${this.state.data_project.id_project}`} target='_blank' className='btn btn-info btn-sm ms-2'>Print</Link>
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
                                                <Link to={`/print_pekerjaan/${this.state.data_project.id_project}`} target='_blank' className='btn btn-info btn-sm ms-2'>Print</Link>
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
                                            <Link to={`/detail_progress/${this.state.data_project.id_project}`} className='btn btn-primary' target="_blank">Lihat Detail Progress Projek</Link>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div className='col-sm col-md col'>
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
                                        {/* <div className='mb-4'>
                                            <p className='mb-1 text-black'>Cost Design</p>
                                            <div className='d-flex'>
                                                <div className='me-3'>
                                                    <h3>Rp. {System.convertRupiah(this.state.cost_data.cost_design)}</h3>
                                                </div>
                                                <div className='align-self-center'>
                                                    <button className='btn btn-success btn-sm' onClick={() => this.openCost("Cost Design")}><i className='bx bxs-edit' ></i></button>
                                                </div>
                                            </div>
                                        </div> */}
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
                                            <Link to={`/print_project/${this.state.data_project.id_project}`} target='_blank' className='btn btn-primary'>Print</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className='box'>
                                    <div className='box-body'>
                                        <div className='alert alert-danger'>
                                            <h6>Zona Berbahaya</h6>
                                            <hr />
                                            <div className='d-grid'>
                                                <button className='btn btn-danger' onClick={this.handleOpenDelete}>Hapus Projek</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ModalAddBahan handleTambahBahan={this.handleTambahBahan} isOpen={this.state.isOpenBahan} closeModal={this.closeBahan} id_project={this.state.data_project.id_project} />
                <ModalAddProgress handleSimpanProgress={this.handleSimpanProgress} status={this.state.loading_modal} isOpen={this.state.isOpenProgress} closeModal={this.closeProgress} />
                <ModalEditInformasi isOpen={this.state.isOpenInformasi} closeModal={this.closeInformasi} data_project={this.state.data_project} handleEditProject={this.handleEditProject} />
                <ModalAddPekerjaan handleSimpanPekerjaanLain={this.handleSimpanPekerjaanLain} isOpen={this.state.isOpenPekerjaan} closeModal={this.closePekerjaan} />
                <ModalEditCost isOpen={this.state.isOpenCost} handleEditCost={this.handleEditCost} closeModal={this.closeCost} cost_data={this.state.cost_data} title={this.state.data_cost} />
                <ModalDetailPekerjaanLain isOpen={this.state.isOpenDetailPekerjaan} closeModal={this.handleCloseDetailPekerjaan} id_project={this.props.params.id} getPekerjaanLain={this.getPekerjaanLain} getCost={this.getCost} getDetail={this.getDetail} />
                <ModalDetailProgress isOpen={this.state.isOpenDetailProgress} closeModal={this.handleCloseProgress} id_project={this.props.params.id} getProgress={this.getProgress} />
            </>
        )
    }
}

export default withRouter(DetailProjek);