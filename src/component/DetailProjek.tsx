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
            data: [
                {
                    no: 1,
                    id_material: "TEST01",
                    nama_material: "Triplek",
                    jenis_material: "HVL",
                    harga_material: "20.000",
                    qty: 3,
                    total_all: "60.000",
                    created_at: "26-02-2023"
                }
            ],
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
            data_progress: [
                {
                    no: 1,
                    nama_progress: "Test Unit",
                    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
                    status: <><span className="badge text-bg-info">On Progress 25%</span></>,
                    created_at: "23-02-2023",
                }
            ],
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
            data_lain: [
                {
                    no: 1,
                    nama_progress: "Pengecatan Area Dinding Kitchen",
                    desc: "ukuran 20 m2",
                    harga_lain: "2.000.000",
                    created_at: "23-02-2023",
                }
            ],
            isOpenBahan: false,
            isOpenProgress: false,
            isOpenInformasi: false,
            isOpenCost: false,
            isOpenPekerjaan: false,
            data_cost: "",
        }

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

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Detail Projek" />

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
                                                    <h3>Kitchen Set</h3>
                                                </div>
                                                <div>
                                                    <small>Volume</small>
                                                    <h3>20 m2</h3>
                                                </div>
                                            </div>
                                            <div className='ms-5'>
                                                <small>Timeline Projek</small>
                                                <h3>20 Hari</h3>

                                                <small>Kategori Projek</small>
                                                <h3>Residential</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-end'>
                                        <button className='btn btn-success btn-sm mt-1 mb-1' onClick={this.openInformasi}><i className='bx bxs-edit' ></i> Edit Informasi</button>
                                    </div>
                                    <hr />
                                    <div className='mt-4'>
                                        <div className='d-flex mb-2'>
                                            <div className='flex-grow-1'>
                                                <h5>Rincian Kebutuhan Material (Kitchen Set)</h5>
                                            </div>
                                            <div>
                                                <button className='btn btn-primary btn-sm' onClick={this.openBahan}><i className='bx bx-plus'></i> Tambah Item</button>
                                            </div>
                                        </div>
                                        <DataTable columns={this.state.column} data={this.state.data} pagination />
                                    </div>

                                    <div className='mt-4'>
                                        <div className='d-flex mb-2'>
                                            <div className='flex-grow-1'>
                                                <h5>Rincian Pekerjaan Lain-Lain (Kitchen Set)</h5>
                                            </div>
                                            <div>
                                                <button className='btn btn-primary btn-sm' onClick={this.openPekerjaan}><i className='bx bx-plus'></i> Tambah Pekerjaan</button>
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
                                            </div>
                                            <div>
                                                <button className='btn btn-primary btn-sm' onClick={this.openProgress}><i className='bx bx-plus'></i> Tambah Progress</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='box-body'>
                                        <DataTable columns={this.state.column_progress} data={this.state.data_progress} pagination expandableRows />

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
                                            <h3>Kitchen Set</h3>
                                        </div>
                                        <div className='mb-4'>
                                            <p className='mb-1 text-black'>Cost Material</p>
                                            <h3>Rp. 60.000</h3>
                                        </div>
                                        <div className='mb-4'>
                                            <p className='mb-1 text-black'>Cost Produksi</p>
                                            <div className='d-flex'>
                                                <div className='me-3'>
                                                    <h3>Rp. 40.000.000</h3>
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
                                                    <h3>Rp. 20.000.000</h3>
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
                                                    <h3>Rp. 10.000.000</h3>
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
                                                    <h3>Rp. 2.000.000</h3>
                                                </div>

                                            </div>
                                        </div>


                                        <hr />
                                        <div className='alert alert-primary'>
                                            <p className='mb-1 text-primary font-w500'>Total Keseluruhan</p>
                                            <h3 className='text-primary'>Rp. 72.060.000</h3>
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
                <ModalAddProgress isOpen={this.state.isOpenProgress} closeModal={this.closeProgress} />
                <ModalEditInformasi isOpen={this.state.isOpenInformasi} closeModal={this.closeInformasi} />
                <ModalAddPekerjaan isOpen={this.state.isOpenPekerjaan} closeModal={this.closePekerjaan} />
                <ModalEditCost isOpen={this.state.isOpenCost} closeModal={this.closeCost} title={this.state.data_cost} />
            </>
        )
    }
}

export default DetailProjek;