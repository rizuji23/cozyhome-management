import React from "react";
import HelmetTitle from "../etc/HelmetTitle";
import Sidebar from "../etc/Sidebar";
import { Link, Navigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import System from "../../module/System";
import moment from "moment";
import ProjectModule from "../../module/ProjectModule";
import Navbar from "../etc/Navbar";
import RincianUnitSystem from "../../module/RincianUnit";
import ModalAddKategoriUnit from "../modal/ModalAddKategoriUnit";
import ModalEditKategoriUnit from "../modal/ModalEditKategoriUnit";
import { ToastContainer, toast } from "react-toastify";
import LoadingButton from "../etc/LoadingButton";

export default class KategoriUnit extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    name: "No",
                    selector: row => row.no,
                    sortable: true,
                    width: "70px"
                },
                {
                    name: "Kategori Unit",
                    selector: row => row.nama_kategori,
                    sortable: true,
                },
                {
                    name: "Tanggal",
                    selector: row => row.created_at,
                    sortable: true,
                },
                {
                    name: "Opsi",
                    selector: row => row.opsi,
                    sortable: true,
                }
            ],
            data: [],
            data_auth: localStorage.getItem("user-cozyproject"),
            loading: true,
            navigation: false,
            search: "",
            isOpen: false,
            isOpenEdit: false,
            id: "",
            nama_kategori: "",
            loading_btn: false,
        };

        this.getKategoriUnit = this.getKategoriUnit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.delete = this.delete.bind(this);
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

    closeModalEdit() {
        this.setState({
            isOpenEdit: false
        })
    }

    delete(id: string, getKategoriUnit: any) {
        this.setState({
            loading_btn: true,
        });
        RincianUnitSystem.deleteKategoriUnit(id, this.state.data_auth).then((result: any) => {
            this.setState({
                loading_btn: false,
            });
            toast.success("Kategori Unit berhasil dihapus");
            getKategoriUnit();
        }).catch((err) => {
            console.log(err);
            this.setState({
                loading_btn: false,
            });
            toast.error("Kategori Unit gagal dihapus");
        })
    }

    getKategoriUnit() {
        RincianUnitSystem.getKategoriUnit('all', this.state.data_auth).then((result: any) => {
            console.log(result.data.data.kategori_unit);
            let no = 1;
            result.data.data.kategori_unit.map(el => {
                el['no'] = no++;
                el['created_at'] = moment(el.created_at, "YYYY-MM-DD").format("DD-MM-YYYY");
                el['opsi'] = <><button className="btn btn-success btn-sm" onClick={() => {
                    this.setState({
                        isOpenEdit: true,
                        id: el.id_kategori_unit,
                        nama_kategori: el.nama_kategori
                    })
                }} disabled={this.state.loading_btn}>{this.state.loading_btn ? <LoadingButton show={this.state.loading_btn} /> : <i className='bx bx-pencil' ></i>}</button> | <button className="btn btn-danger btn-sm" onClick={() => {
                    if (window.confirm("Apakah ingin dihapus?")) {
                        this.delete(el.id_kategori_unit, this.getKategoriUnit)
                    }
                }} disabled={this.state.loading_btn}>{this.state.loading_btn ? <LoadingButton show={this.state.loading_btn} /> : <i className='bx bx-trash' ></i>}</button></>
            });

            this.setState({
                data: result.data.data.kategori_unit,
                loading: false
            })
        }).catch((reject) => {
            console.log(reject)
        })
    }


    componentDidMount(): void {
        this.getKategoriUnit();
    }

    handleSearch(e) {
        this.setState({
            search: e.target.value
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="List Kategori Unit" />
                {this.state.navigation}
                <Sidebar />
                <Navbar title="List Kategori Unit" />
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
                <div className="main">
                    <div className="main-content project">
                        <div className="box ">
                            <div className="box-header  pt-0">
                                <div className="me-auto">
                                    <h4 className="card-title mb-0 fs-22">Kategori Unit</h4>
                                </div>
                                <div className='me-3'>
                                    <input type="text" onChange={this.handleSearch} className='form-control' placeholder='Cari Kategori Unit' />
                                </div>
                                <div className=''>
                                    <button className='btn btn-primary btn-sm' onClick={() => {
                                        this.openModel();
                                    }}>Tambah Kategori Unit Baru</button>
                                </div>
                            </div>
                            <div className="box-body pb-0 table-responsive activity mt-18">
                                <DataTable columns={this.state.columns} data={this.state.data.filter((data) => {
                                    if (this.state.search === "") {
                                        return data;
                                    } else if (data.nama_kategori.toLowerCase().includes(this.state.search.toLowerCase())) {
                                        return data;
                                    }
                                })} pagination progressPending={this.state.loading} />
                            </div>
                        </div>
                    </div>
                </div>

                <ModalAddKategoriUnit isOpen={this.state.isOpen} closeModal={() => this.closeModal()} getKategoriUnit={() => this.getKategoriUnit()} />
                <ModalEditKategoriUnit isOpen={this.state.isOpenEdit} id={this.state.id} closeModal={() => this.closeModalEdit()} getKategoriUnit={() => this.getKategoriUnit()} nama_kategori={this.state.nama_kategori} />

            </>
        )
    }
}