import React, { createRef } from "react";
import { withRouter } from "../etc/withRouter";
import Navbar from "../etc/Navbar";
import Sidebar from "../etc/Sidebar";
import { ToastContainer } from "react-toastify";
import HelmetTitle from "../etc/HelmetTitle";
import RincianUnitSystem from "../../module/RincianUnit";
import LoadingFull from "../etc/LoadingFull";
import moment from "moment";
import ImageGallery from "../ImageGallery";
import DataTable from "react-data-table-component";
import ModalAddKategoriUnit from "../modal/ModalAddKategoriUnit";
import ModalAddKebutuhanUnit from "../modal/ModalAddKebutuhanUnit";
import System from "../../module/System";
import ModalUnitOperasional from "../modal/ModalUnitOperasional";
import ModalUnitProduksi from "../modal/ModalUnitProduksi";
import ModalAddPekerjaanUnit from "../modal/ModalAddPekerjaanUnit";
import ModalAddImage from "../modal/ModalAddImage";
import { URL_DEV } from "../../module/axios";
import ModalEditInformasi from "../modal/ModalEditInformasi";
import ModalEditInformasiUnit from "../modal/ModalEditInformasiUnit";

class DetailUnit extends React.Component<any, any> {
    private ref: React.RefObject<HTMLInputElement>;
    constructor(props: any) {
        super(props);
        this.ref = createRef();
        this.state = {
            loading: true,
            data: [],
            data_auth: localStorage.getItem("user-cozyproject"),
            data_kebutuhan: [],
            data_lain: [],
            data_image: [],
            column_kebutuhan: [
                {
                    name: "No",
                    selector: row => row.no,
                    width: "50px"
                },
                {
                    name: "Nama Bahan",
                    selector: row => row.nama_bahan,
                },
                {
                    name: "Harga",
                    selector: row => row.harga,
                },
                {
                    name: "Qty",
                    selector: row => row.qty
                },
                {
                    name: "Total",
                    selector: row => row.total_2
                },
                {
                    name: "Tanggal",
                    selector: row => row.created_at,
                }
            ],
            column_lain: [
                {
                    name: "No",
                    selector: row => row.no,
                    width: "50px"
                },
                {
                    name: "Judul Pekerjaan",
                    selector: row => row.judul_pekerjaan,
                },
                {
                    name: "Harga",
                    selector: row => row.harga_2,
                },
                {
                    name: "Deskripsi",
                    selector: row => row.desc
                },
                {
                    name: "Tanggal",
                    selector: row => row.created_at,
                }
            ],
            isOpenKebutuhan: false,
            isOpenLain: false,
            count_material: 0,
            count_produksi: 0,
            count_operasional: 0,
            count_lain: 0,
            count_all: 0,
            isOpenOperasional: false,
            isOpenProduksi: false,
            isOpenFoto: false,
            isOpenInformation: false,
        }


    }

    openKebutuhan() {
        this.setState({
            isOpenKebutuhan: true,
        })
    }

    closeInformation() {
        this.setState({
            isOpenInformation: false,
        })
    }

    closeKebutuhan() {
        this.setState({
            isOpenKebutuhan: false
        })
    }

    closeOperasional() {
        this.setState({
            isOpenOperasional: false
        })
    }

    closeProduksi() {
        this.setState({
            isOpenProduksi: false
        })
    }

    closeLain() {
        this.setState({
            isOpenLain: false
        })
    }

    closeFoto() {
        this.setState({
            isOpenFoto: false
        })
    }

    getRincianUnit() {
        this.setState({
            loading: true,
        });
        RincianUnitSystem.getRincianUnit(this.props.params.id, this.state.data_auth).then((result: any) => {
            console.log("DAWDAW", result.data.data.cost_operasional)
            this.setState({
                loading: false,
                data: result.data.data.rincian_unit,
                count_produksi: result.data.data.rincian_unit.cost_produksi,
                count_operasional: result.data.data.rincian_unit.cost_operasional
            }, () => {
                this.countAll();
            });
        }).catch((err) => {
            console.log(err);
        })
    }

    getKebutuhanUnit() {
        this.setState({
            loading: true,
        });
        RincianUnitSystem.getKebutuhanUnit({ id: this.props.params.id, type_get: 'all' }, this.state.data_auth).then((result: any) => {
            console.log(result);
            let no = 1;
            result.data.data.kebutuhan_unit.map((el: any) => {
                el['no'] = no++;
                el['harga'] = System.convertRupiah(el['harga'])
                el['total_2'] = System.convertRupiah(el['total'])
                el['created_at'] = moment(el.created_at).format("DD-MM-YYYY HH:mm:ss")
            });

            const data_count = result.data.data.kebutuhan_unit.reduce((i: any, el: any) => {
                return i + System.convertInt(el.total)
            }, 0);

            console.log("data_count", data_count)
            this.setState({
                loading: false,
                data_kebutuhan: result.data.data.kebutuhan_unit,
                count_material: data_count
            }, () => {
                this.countAll();
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    getPekerjaanLain() {
        this.setState({
            loading: true,
        });
        RincianUnitSystem.getPekerjaanLain({ id: this.props.params.id, type_get: 'all' }, this.state.data_auth).then((result: any) => {
            console.log(result);
            let no = 1;
            result.data.data.pekerjaan_lain.map((el: any) => {
                el['no'] = no++;

                el['harga_2'] = System.convertRupiah(el['harga'])
                el['created_at'] = moment(el.created_at).format("DD-MM-YYYY HH:mm:ss")
            });

            const data_count = result.data.data.pekerjaan_lain.reduce((i: any, el: any) => {
                return i + System.convertInt(el.harga)
            }, 0);

            console.log("data_count", data_count)
            this.setState({
                loading: false,
                data_lain: result.data.data.pekerjaan_lain,
                count_lain: data_count
            }, () => {
                this.countAll();
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    getImage() {
        this.setState({
            loading: true,
        });
        RincianUnitSystem.getImage(this.props.params.id, this.state.data_auth).then((result: any) => {
            console.log(result);
            let no = 1;

            const data = result.data.data.image_unit.map((el: any) => {
                return {
                    id: el.id_image_unit,
                    url: URL_DEV + el.url_image
                }
            });

            this.setState({
                loading: false,
                data_image: data,
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    countAll() {
        const count_all = parseInt(this.state.count_material) + parseInt(this.state.count_operasional) + parseInt(this.state.count_produksi) + parseInt(this.state.count_lain);
        this.setState({
            count_all: count_all
        });
    }

    getAllAPI() {
        this.getRincianUnit();
        this.getKebutuhanUnit();
        this.getPekerjaanLain();
        this.getImage();
    }

    componentDidMount(): void {
        this.getAllAPI();
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Detail Unit" />
                <LoadingFull display={this.state.loading} />
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
                <Navbar title="Detail Unit" />
                <div className="main">
                    <div className="main-content project">
                        <div className='row'>
                            <div className='col-sm col-md'>
                                <div className='box'>
                                    <div className='box-body'>
                                        <div className="mb-2">
                                            <ImageGallery data={this.state.data_image} getAPI={() => this.getAllAPI()} id={this.props.params.id} />

                                            <div className="text-end mt-2">
                                                <button className="btn btn-primary btn-sm" onClick={() => {
                                                    this.setState({
                                                        isOpenFoto: true,
                                                    })
                                                }}>Tambah Foto</button>
                                            </div>
                                        </div>

                                        <div className='d-flex'>
                                            <div>
                                                <div>
                                                    <small>Nama Unit</small>
                                                    <h3>{this.state.data?.nama_unit}</h3>
                                                </div>
                                                <div>
                                                    <small>Volume</small>
                                                    <h3>{this.state.data?.dimensi} m2</h3>
                                                </div>
                                                <div>
                                                    <small>Kategori Unit</small>
                                                    <h3>{this.state.data?.kategori_unit}</h3>
                                                </div>
                                            </div>
                                            <div className='ms-5'>
                                                <div>
                                                    <small>Nama Projek</small>
                                                    <h3>{this.state.data?.project}</h3>
                                                </div>

                                                <div>
                                                    <small>Tanggal Input</small>
                                                    <h3>{moment(this.state.data?.created_at).format("DD-MM-YYYY HH:mm:ss")}</h3>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='mt-3'>
                                            <small>Deskripsi Projek</small>
                                            <p className='mt-1 text-black'>{this.state.data?.desc}</p>
                                        </div>

                                        <div className="mt-3 text-end">
                                            <button className="btn btn-success btn-sm" onClick={() => {
                                                this.setState({
                                                    isOpenInformation: true,
                                                })
                                            }}>Edit Informasi</button>
                                        </div>

                                        <hr />

                                        <div className='mt-4'>
                                            <div className='row mb-2'>
                                                <div className='col-sm'>
                                                    <h5>Rincian Kebutuhan Material ({this.state.data?.nama_unit})</h5>
                                                </div>
                                                <div className='col-sm text-end'>
                                                    <button className='btn btn-primary btn-sm' onClick={() => this.openKebutuhan()}><i className='bx bx-plus'></i> Tambah Item</button>
                                                </div>
                                            </div>
                                            <DataTable columns={this.state.column_kebutuhan} data={this.state.data_kebutuhan} pagination />
                                        </div>
                                        <hr />
                                        <div className='mt-4'>
                                            <div className='row mb-2'>
                                                <div className='col-sm'>
                                                    <h5>Rincian Pekerjaan Lain-Lain ({this.state.data?.nama_unit})</h5>
                                                </div>
                                                <div className='col-sm text-end'>
                                                    <button className='btn btn-primary btn-sm' onClick={() => {
                                                        this.setState({
                                                            isOpenLain: true,
                                                        })
                                                    }}><i className='bx bx-plus'></i> Tambah Item</button>
                                                </div>
                                            </div>
                                            <DataTable columns={this.state.column_lain} data={this.state.data_lain} pagination />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm col-md col'>
                                <div className='box'>
                                    <div className='box-body'>
                                        <div className='mb-4'>
                                            <p className='mb-1 text-black'>Unit: </p>
                                            <h3>{this.state.data?.nama_unit}</h3>
                                        </div>
                                        <div className='mb-4'>
                                            <p className='mb-1 text-black'>Cost Material</p>
                                            <h3>Rp. {System.convertRupiah(this.state.count_material)}</h3>
                                        </div>
                                        <div className='mb-4'>
                                            <p className='mb-1 text-black'>Cost Produksi</p>
                                            <div className='d-flex'>
                                                <div className='me-3'>
                                                    <h3>Rp. {System.convertRupiah(this.state.count_produksi)}</h3>
                                                </div>
                                                <div className='align-self-center'>
                                                    <button className='btn btn-success btn-sm' onClick={() => {
                                                        this.setState({
                                                            isOpenProduksi: true
                                                        })
                                                    }}><i className='bx bxs-edit' ></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='mb-4'>
                                            <p className='mb-1 text-black'>Cost Operasional</p>
                                            <div className='d-flex'>
                                                <div className='me-3'>
                                                    <h3>Rp. {System.convertRupiah(this.state.count_operasional)}</h3>
                                                </div>
                                                <div className='align-self-center'>
                                                    <button className='btn btn-success btn-sm' onClick={() => this.setState({
                                                        isOpenOperasional: true
                                                    })}><i className='bx bxs-edit' ></i></button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='mb-4'>
                                            <p className='mb-1 text-black'>Cost Pekerjaan Lain-Lain</p>
                                            <div className='d-flex'>
                                                <div className='me-3'>
                                                    <h3>Rp. {System.convertRupiah(this.state.count_lain)}</h3>
                                                </div>

                                            </div>
                                        </div>
                                        <hr />
                                        <div className='alert alert-primary'>
                                            <p className='mb-1 text-primary font-w500'>Total Keseluruhan</p>
                                            <h3 className='text-primary'>Rp. {System.convertRupiah(this.state.count_all)}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ModalAddKebutuhanUnit isOpen={this.state.isOpenKebutuhan} id={this.props.params.id} closeModal={() => this.closeKebutuhan()} getAPI={() => this.getAllAPI()} />
                <ModalEditInformasiUnit isOpen={this.state.isOpenInformation} id={this.props.params.id} closeModal={() => this.closeInformation()} getAPI={() => this.getAllAPI()} />
                <ModalAddImage isOpen={this.state.isOpenFoto} id={this.props.params.id} closeModal={() => this.closeFoto()} getAPI={() => this.getAllAPI()} />
                <ModalAddPekerjaanUnit isOpen={this.state.isOpenLain} id={this.props.params.id} closeModal={() => this.closeLain()} getAPI={() => this.getAllAPI()} />
                <ModalUnitOperasional isOpen={this.state.isOpenOperasional} closeModal={() => this.closeOperasional()} cost={this.state.count_operasional} id={this.props.params.id} getAPI={() => this.getAllAPI()} />
                <ModalUnitProduksi isOpen={this.state.isOpenProduksi} closeModal={() => this.closeProduksi()} cost={this.state.count_produksi} id={this.props.params.id} getAPI={() => this.getAllAPI()} />
            </>
        )
    }
}

export default withRouter(DetailUnit);