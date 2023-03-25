import React from "react";
import { withRouter } from "../etc/withRouter";
import Stok from "../../module/Stok";
import System from "../../module/System";
import moment from "moment";
import LoadingFull from "../etc/LoadingFull";
import ProjectModule from "../../module/ProjectModule";
import 'moment-timezone';
import PekerjaanLain from "../../module/PekerjaanLain";

class PekerjaanLainPrint extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data_lain: [],
            data_auth: localStorage.getItem("user-cozyproject"),
            total_asset: 0,
            data_project: [],
            print_date: moment().tz("Asia/Jakarta").format("DD-MM-YYYY HH:mm:ss")
        }

        this.getPekerjaanLain = this.getPekerjaanLain.bind(this);
    }

    getPekerjaanLain() {
        this.setState({
            loading: true,
        })
        const id_project = this.props.params.id;

        PekerjaanLain.get({ id: id_project }, this.state.data_auth).then((result) => {
            console.log(result);
            ProjectModule.getDetail({ id_project: id_project }, this.state.data_auth).then((result_2) => {
                console.log(result_2);
                let no = 1;
                let total_asset = 0;
                result.data.data.pekerjaan_lain.map(el => {
                    el['no'] = no++;
                    el['created_at'] = moment(el.created_at).format("DD-MM-YYYY HH:mm:ss");
                    total_asset += el.harga;
                    el['harga'] = System.convertRupiah(el.harga);

                })

                this.setState({
                    data_project: result_2.data.data.project,
                    data_lain: result.data.data.pekerjaan_lain,
                    loading: false,
                    total_asset: total_asset
                })
            }).catch((rejects) => {
                console.log(rejects);
            })

        }).catch((rejects) => {
            console.log(rejects);
        })
    }

    componentDidMount(): void {
        this.getPekerjaanLain();
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
                                <h2>Laporan Pekerjaan Lain</h2>
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
                                        Total Harga Pekerjaan Lain
                                    </div>
                                    <div className="card-body text-center">
                                        <h2>Rp. {System.convertRupiah(this.state.total_asset)}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

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

                </div>
            </>
        )
    }
}

export default withRouter(PekerjaanLainPrint);