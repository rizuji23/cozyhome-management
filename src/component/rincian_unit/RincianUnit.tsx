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

export default class RincianUnit extends React.Component<any, any> {
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
                    name: "Nama Unit",
                    selector: row => row.nama_unit_2,
                    sortable: true,
                },
                {
                    name: "Projek",
                    selector: row => row.project_2,
                    sortable: true,
                },
                {
                    name: "Kategori",
                    selector: row => row.kategori_unit,
                    sortable: true,
                },
                {
                    name: "Tanggal",
                    selector: row => row.created_at,
                    sortable: true,
                }
            ],
            data: [],
            data_auth: localStorage.getItem("user-cozyproject"),
            loading: true,
            navigation: false,
            search: "",
        };

        this.getRincianUnit = this.getRincianUnit.bind(this);
        this.handleClickRow = this.handleClickRow.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    getRincianUnit() {
        RincianUnitSystem.getRincianUnit('all', this.state.data_auth).then((result: any) => {
            console.log(result.data.data.rincian_unit);
            let no = 1;
            result.data.data.rincian_unit.map(el => {
                el['no'] = no++;
                el['nama_unit_2'] = <Link to={`/detail_unit/${el.id_rincian_unit}`}>{el['nama_unit']}</Link>
                el['project_2'] = <Link to={`/detail_projek/${el.id_project}`}>{el['project']}</Link>
                el['created_at'] = moment(el.created_at, "YYYY-MM-DD").format("DD-MM-YYYY");
            });

            this.setState({
                data: result.data.data.rincian_unit,
                loading: false
            })
        }).catch((reject) => {
            console.log(reject)
        })
    }

    componentDidMount(): void {
        this.getRincianUnit();
    }

    handleClickRow(e) {
        console.log(e);
        this.setState({
            navigation: <Navigate to={`/detail_unit/${e.id_rincian_unit}`} />
        })
    }

    handleSearch(e) {
        this.setState({
            search: e.target.value
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="List Rincian Per Unit" />
                {this.state.navigation}
                <Sidebar />
                <Navbar title="List Rincian Per Unit" />
                <div className="main">
                    <div className="main-content project">
                        <div className="box ">
                            <div className="box-header  pt-0">
                                <div className="me-auto">
                                    <h4 className="card-title mb-0 fs-22">Rincian Per Unit</h4>
                                </div>
                                <div className='me-3'>
                                    <input type="text" onChange={this.handleSearch} className='form-control' placeholder='Cari Nama Unit' />
                                </div>
                                <div className=''>
                                    <Link to={"/add_rincian_unit"} className='btn btn-primary btn-sm'>Tambah Unit Baru</Link>
                                </div>
                            </div>
                            <div className="box-body pb-0 table-responsive activity mt-18">
                                <DataTable columns={this.state.columns} data={this.state.data.filter((data) => {
                                    console.log(data)
                                    if (this.state.search === "") {
                                        return data;
                                    } else if (data.nama_unit.toLowerCase().includes(this.state.search.toLowerCase())) {
                                        return data;
                                    }
                                })} pagination progressPending={this.state.loading} onRowClicked={this.handleClickRow} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}