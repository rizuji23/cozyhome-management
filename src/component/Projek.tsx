import React from 'react';
import HelmetTitle from './etc/HelmetTitle';
import Sidebar from './etc/Sidebar';
import Navbar from './etc/Navbar';
import DataTable, { createTheme } from 'react-data-table-component';
import { Link } from 'react-router-dom';
import ProjectModule from '../module/ProjectModule';
import moment from 'moment';
import System from '../module/System';


class Projek extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    name: "No",
                    selector: row => row.no,
                },
                {
                    name: "Nama Projek",
                    selector: row => row.nama_project,
                },
                {
                    name: "Customer",
                    selector: row => row.nama_customer
                },
                {
                    name: "Jumlah Volumn",
                    selector: row => row.jumlah_volumn,
                },
                {
                    name: "Total Cost",
                    selector: row => row.total_cost,
                },
                {
                    name: "Status",
                    selector: row => row.status
                },
                {
                    name: "Tanggal",
                    selector: row => row.created_at
                }
            ],
            data: [

            ],
            data_auth: localStorage.getItem("user-cozyproject"),
            loading: true,
        };

        this.getProject = this.getProject.bind(this);
    }

    getProject() {
        ProjectModule.get(this.state.data_auth).then((result: any) => {
            console.log(result.data.data.project);
            let no = 1;
            result.data.data.project.map(el => {
                el['no'] = no++;
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
        console.log(e)
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="List Projek" />

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
                                    <input type="text" className='form-control' placeholder='Cari Projek' />
                                </div>
                                <div className="card-options pr-3">
                                    <div className="dropdown"> <a href="#" className="btn ripple btn-outline-primary dropdown-toggle fs-14" data-bs-toggle="dropdown" aria-expanded="false"> See All <i className="feather feather-chevron-down"></i> </a>
                                        <ul className="dropdown-menu dropdown-menu-end" role="menu">
                                            <li><a href="#">Monthly</a></li>
                                            <li><a href="#">Yearly</a></li>
                                            <li><a href="#">Weekly</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='ms-3'>
                                    <Link to={"/tambah_projek"} className='btn btn-primary btn-sm'>Tambah Projek Baru</Link>
                                </div>
                            </div>
                            <div className="box-body pb-0 table-responsive activity mt-18">
                                <DataTable columns={this.state.columns} data={this.state.data} pagination progressPending={this.state.loading} onRowClicked={this.handleClickRow} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Projek;