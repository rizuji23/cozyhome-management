import React from 'react';
import HelmetTitle from './etc/HelmetTitle';
import Sidebar from './etc/Sidebar';
import Navbar from './etc/Navbar';
import DataTable, { createTheme } from 'react-data-table-component';
import { Link, Navigate } from 'react-router-dom';
import ProjectModule from '../module/ProjectModule';
import moment from 'moment';
import System from '../module/System';
import { Dropdown, DropdownButton } from 'react-bootstrap';


class Projek extends React.Component<any, any> {
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
                    name: "Nama Projek",
                    selector: row => row.nama_project,
                    sortable: true,
                },
                {
                    name: "Customer",
                    selector: row => row.nama_customer,
                    sortable: true,
                },
                {
                    name: "Jumlah Volumn",
                    selector: row => row.jumlah_volumn,
                    sortable: true,
                },
                {
                    name: "Total Cost",
                    selector: row => row.total_cost,
                    sortable: true,
                },
                {
                    name: "Status",
                    selector: row => row.status,
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

        this.getProject = this.getProject.bind(this);
        this.handleClickRow = this.handleClickRow.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    getProject() {
        ProjectModule.get(this.state.data_auth).then((result: any) => {
            console.log(result.data.data.project);
            let no = 1;
            result.data.data.project.map(el => {
                el['no'] = no++;
                el['nama_project_2'] = el.nama_project

                el['nama_project'] = <><Link to={`/detail_projek/${el.id_project}`}>{el.nama_project}</Link></>
                el['created_at'] = moment(el.created_at, "YYYY-MM-DD").format("DD-MM-YYYY");
                el['total_cost'] = System.convertRupiah(el.total_cost);
            });

            this.setState({
                data: result.data.data.project,
                loading: false
            })
        }).catch((reject) => {
            console.log(reject)
        })
    }

    componentDidMount(): void {
        this.getProject();
    }

    handleClickRow(e) {
        console.log(e);
        this.setState({
            navigation: <Navigate to={`/detail_projek/${e.id_project}`} />
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
                <HelmetTitle title="List Projek" />
                {this.state.navigation}
                <Sidebar />
                <Navbar title="List Projek" />
                <div className="main">
                    <div className="main-content project">
                        <div className="box ">
                            <div className="box-header  pt-0">
                                <div className="me-auto">
                                    <h4 className="card-title mb-0 fs-22">Projek</h4>
                                </div>
                                <div className='me-3'>
                                    <input type="text" onChange={this.handleSearch} className='form-control' placeholder='Cari Nama Projek' />
                                </div>
                                <div className=''>
                                    <Link to={"/tambah_projek"} className='btn btn-primary btn-sm'>Tambah Projek Baru</Link>
                                </div>
                            </div>
                            <div className="box-body pb-0 table-responsive activity mt-18">
                                <DataTable columns={this.state.columns} data={this.state.data.filter((data) => {
                                    console.log(data)
                                    if (this.state.search === "") {
                                        return data;
                                    } else if (data.nama_project_2.toLowerCase().includes(this.state.search.toLowerCase())) {
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

export default Projek;