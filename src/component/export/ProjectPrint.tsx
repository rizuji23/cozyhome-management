import React from "react";
import { withRouter } from "../etc/withRouter";
import Stok from "../../module/Stok";
import System from "../../module/System";
import moment from "moment";
import LoadingFull from "../etc/LoadingFull";
import ProjectModule from "../../module/ProjectModule";
import 'moment-timezone';
import PekerjaanLain from "../../module/PekerjaanLain";

class ProjectPrint extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data_lain: [],
            data_auth: localStorage.getItem("user-cozyproject"),
            cost: {
                material: 0,
                produksi: 0,
                design: 0,
                operasional: 0,
                pekerjaan_lain: 0,
            },
            data_project: [],
            data_stok: [],
            data_progress: [],
            print_date: moment().tz("Asia/Jakarta").format("DD-MM-YYYY HH:mm:ss")
        }
        this.getPrint = this.getPrint.bind(this);
    }

    getPrint() {
        this.setState({
            loading: true,
        })
        const id = this.props.params.id;

        ProjectModule.getPrint({ id: id }, this.state.data_auth).then((result) => {
            console.log(result);
            const cost = result.data.data.cost_project;

            // start stok out
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
            });

            // end stok out

            // start pekerjaan lain
            let no_pekerjaan = 1;
            result.data.data.pekerjaan_lain.map(el => {
                el['no'] = no_pekerjaan++;
                el['created_at'] = moment(el.created_at).format("DD-MM-YYYY HH:mm:ss");
                el['harga'] = System.convertRupiah(el.harga)
            })
            // end pekerjaan lain


            // start progress
            let no_progress = 1;
            result.data.data.progress.map(el => {
                el['no'] = no_progress++;
                el['created_at'] = moment(el.created_at, "YYYY-MM-DD").format("DD-MM-YYYY");
            })
            //end progress

            this.setState(prevState => ({
                loading: false,
                data_project: result.data.data.project,
                cost: {
                    ...prevState.cost,
                    material: cost.cost_bahan,
                    produksi: cost.cost_produksi,
                    design: cost.cost_design,
                    operasional: cost.cost_operasional,
                    pekerjaan_lain: cost.cost_lain,
                },
                data_stok: data,
                data_lain: result.data.data.pekerjaan_lain,
                data_progress: result.data.data.progress
            }))
        }).catch((rejects) => {
            console.log(rejects)
        })
    }

    componentDidMount(): void {
        this.getPrint();
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevState.loading !== this.state.loading) {
            window.print();
        }
    }

    render(): React.ReactNode {
        return (
            <>
                <LoadingFull display={this.state.loading} />
                <div className="box-header mt-3">
                    <div className="container">
                        <div className="d-flex">
                            <div className="align-self-center">
                                <img src="/images/logo.png" alt="" />
                            </div>
                            <div className="ms-5">
                                <h2>Laporan Project</h2>
                                {/* <p className="text-black mb-0">Nama Project: <b>{this.state.data_project.nama_project}</b> <br />ID Project: <b>#{this.state.data_project.id_project}</b></p> */}
                                <p className="text-black">Tanggal Print: <b>{this.state.print_date}</b></p>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>

                <div className="container mt-3">
                    <div className="info-box">
                        <div className='box mb-3 border-enable'>
                            <div className='box-body'>
                                <div className='d-flex'>
                                    <div>
                                        <div>
                                            <small>Nama Projek</small>
                                            <h5>{this.state.data_project.nama_project}</h5>
                                        </div>
                                        <div>
                                            <small>Volume</small>
                                            <h5>{this.state.data_project.jumlah_volumn} m2</h5>
                                        </div>
                                        <div>
                                            <small>Nama Customer</small>
                                            <h5>{this.state.data_project.nama_customer}</h5>
                                        </div>
                                    </div>
                                    <div className='ms-5'>
                                        <small>Timeline Projek</small>
                                        <h5>{this.state.data_project.estimasi_pengerjaan} Hari</h5>

                                        <small>Kategori Projek</small>
                                        <h5>{this.state.data_project.kategori_project}</h5>

                                        <div>
                                            <small>Tanggal Mulai & Akhir Project</small>
                                            <h5>{this.state.data_project.start_date} ~ {this.state.data_project.end_date}</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className='mt-3'>
                                    <small>Deskripsi Projek</small>
                                    <p className='mt-1 text-black'>{this.state.data_project.desc}</p>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="card border-enable">
                                    <div className="card-header">
                                        Total Keseluruhan
                                    </div>
                                    <div className="card-body text-center">
                                        <h4>Rp. {this.state.data_project.total_cost !== undefined && System.convertRupiah(this.state.data_project.total_cost)}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card border-enable">
                                    <div className="card-header">
                                        Total Cost Material
                                    </div>
                                    <div className="card-body text-center">
                                        <h4>Rp. {System.convertRupiah(this.state.cost.material)}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card border-enable">
                                    <div className="card-header">
                                        Total Cost Produksi
                                    </div>
                                    <div className="card-body text-center">
                                        <h4>Rp. {System.convertRupiah(this.state.cost.produksi)}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <div className="card border-enable">
                                    <div className="card-header">
                                        Total Cost Design
                                    </div>
                                    <div className="card-body text-center">
                                        <h4>Rp. {System.convertRupiah(this.state.cost.design)}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card border-enable">
                                    <div className="card-header">
                                        Total Cost Operasional
                                    </div>
                                    <div className="card-body text-center">
                                        <h4>Rp. {System.convertRupiah(this.state.cost.operasional)}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card border-enable">
                                    <div className="card-header">
                                        Total Cost Pekerjaan Lain
                                    </div>
                                    <div className="card-body text-center">
                                        <h4>Rp. {System.convertRupiah(this.state.cost.pekerjaan_lain)}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ breakAfter: "page" }}></div>
                    <div className="table-rincian mt-5">
                        <h3 className="mb-4">Rincian Kebutuhan Material.</h3>
                        <table className="table table-light  border-enable">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Nama</th>
                                    <th scope="col">Jenis Material</th>
                                    <th scope="col">Qty</th>
                                    <th scope="col">Total All</th>
                                    <th scope="col">Tanggal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.data_stok.map(el => {
                                        return <tr key={el.no}>
                                            <th scope="row">{el.no}</th>
                                            <td>{el.nama_material}</td>
                                            <td>{el.kategori_material}</td>
                                            <td>{el.stok_out}</td>
                                            <td>{System.convertRupiah(el.total_all)}</td>
                                            <td>{el.created_at}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div style={{ breakAfter: "page" }}></div>
                    <div className="table-rincian mt-5">
                        <h3 className="mb-4">Rincian Pekerjaan Lain-Lain.</h3>
                        <table className="table table-light  border-enable">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Nama Pekerjaan</th>
                                    <th scope="col">Deskripsi</th>
                                    <th scope="col">Harga</th>
                                    <th scope="col">Tanggal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.data_lain.map(el => {
                                        return <tr key={el.no}>
                                            <th scope="row">{el.no}</th>
                                            <td>{el.nama_pekerjaan}</td>
                                            <td>{el.desc}</td>
                                            <td>{System.convertRupiah(el.harga)}</td>
                                            <td>{el.created_at}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div style={{ breakAfter: "page" }}></div>

                    <div className="table-rincian mt-5">
                        <h3 className="mb-4">Rincian Progress.</h3>
                        <table className="table table-light  border-enable">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Judul Progress</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Deskripsi</th>
                                    <th scope="col">Tanggal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.data_progress.map(el => {
                                        return <tr key={el.no}>
                                            <th scope="row">{el.no}</th>
                                            <td>{el.nama_progress}</td>
                                            <td>{el.status}</td>
                                            <td>{el.desc}</td>
                                            <td>{el.created_at}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(ProjectPrint);