import React from "react";
import { withRouter } from "../etc/withRouter";
import Stok from "../../module/Stok";
import System from "../../module/System";
import moment from "moment";
import LoadingFull from "../etc/LoadingFull";
import ProjectModule from "../../module/ProjectModule";
import 'moment-timezone';

class StokPrint extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data_rincian: [],
            data_detail: [],
            data_auth: localStorage.getItem("user-cozyproject"),
            total_out: 0,
            total_asset: 0,
            data_project: [],
            print_date: moment().tz("Asia/Jakarta").format("DD-MM-YYYY HH:mm:ss")
        }
        this.getStokOut = this.getStokOut.bind(this);
    }

    getStokOut() {
        this.setState({
            loading: true,
        })
        const id_project = this.props.params.id;

        Stok.getList({ id_project: id_project }, this.state.data_auth).then((result) => {
            ProjectModule.getDetail({ id_project: id_project }, this.state.data_auth).then((result_2) => {

                let no = 1;
                let no_2 = 1;
                let total_asset = 0;
                let total_out = 0;
                result.data.data.stok_out.map(el => {
                    el['created_at_2'] = moment(el.created_at, "YYYY-MM-DD").format("DD-MM-YYYY");
                    el['created_at'] = moment(el.created_at).format("DD-MM-YYYY HH:mm:ss");
                    el['total_all'] = el.stok_out * el.harga;
                    el['harga'] = System.convertRupiah(el.harga);
                    el['no'] = no_2++;
                    total_out += el.stok_out
                    total_asset += el.total_all
                });

                const data = []

                result.data.data.stok_out.reduce((res, val) => {
                    if (!res[val.id_material_2]) {
                        res[val.id_material_2] = { id_material_2: val.id_material_2, nama_material: val.nama_material, kategori_material: val.kategori_material, harga: System.convertInt(val.harga), stok_out: 0, total_all: 0, created_at: val.created_at, created_at_2: val.created_at_2 };
                        data.push(res[val.id_material_2]);
                    }

                    res[val.id_material_2].stok_out += val.stok_out;
                    res[val.id_material_2].total_all += val.stok_out * System.convertInt(val.harga);
                    return res
                }, {});

                data.map((el) => {
                    el['no'] = no++;
                });


                this.setState({
                    data_project: result_2.data.data.project,
                    loading: false,
                    data_rincian: data,
                    data_detail: result.data.data.stok_out,
                    total_asset: total_asset,
                    total_out: total_out
                });
            }).catch((rejects) => {
                console.log(rejects);
            })

        }).catch((rejects) => {
            console.log(rejects);
        })
    }

    componentDidMount(): void {
        this.getStokOut();
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
                                <h2>Laporan Stok</h2>
                                <p className="text-black mb-0">Nama Project: <b>{this.state.data_project.nama_project}</b> <br />ID Project: <b>#{this.state.data_project.id_project}</b></p>
                                <p className="text-black">Tanggal Print: <b>{this.state.print_date}</b></p>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>

                <div className="container mt-3">
                    <div className="info-box">
                        <div className="row">
                            <div className="col">
                                <div className="card border-enable">
                                    <div className="card-header">
                                        Total Stok Keluar
                                    </div>
                                    <div className="card-body text-center">
                                        <h2>{this.state.total_out} Pcs</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card border-enable">
                                    <div className="card-header">
                                        Total Asset Keluar
                                    </div>
                                    <div className="card-body text-center">
                                        <h2>Rp. {System.convertRupiah(this.state.total_asset)}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

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
                                    this.state.data_rincian.map(el => {
                                        return <tr key={el.no}>
                                            <th scope="row">{el.no}</th>
                                            <td>{el.nama_material}</td>
                                            <td>{el.kategori_material}</td>
                                            <td>{el.stok_out}</td>
                                            <td>{System.convertRupiah(el.total_all)}</td>
                                            <td>{el.created_at_2}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div style={{ breakAfter: "page" }}></div>
                    <div className="table-detail mt-5 ">
                        <h3 className="mb-4">Detail Kebutuhan Material.</h3>
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
                                    this.state.data_detail.map(el => {
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
                </div>
            </>
        )
    }
}

export default withRouter(StokPrint);