import React from "react";
import ProjectModule from "../../module/ProjectModule";
import Cost from "../../module/Cost";
import System from "../../module/System";

class InfoUang extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            data_sum: [],
            data_auth: localStorage.getItem("user-cozyproject"),
        }

        this.getCount = this.getCount.bind(this);
    }

    componentDidMount(): void {
        this.getCount();
    }

    getCount() {
        Cost.getSum(this.state.data_auth).then((result) => {
            console.log(result);
            this.setState({
                data_sum: result.data.data.sum
            })
        }).catch((rejects) => {
            console.log(rejects);
        });
    }

    render(): React.ReactNode {
        return (
            <>
                <div className="row mt-3">
                    <div className="">
                        <div className="box card-box">
                            <div className="icon-box bg-color-6 d-block">
                                <div className="content text-center color-6">
                                    <h5 className="title-box fs-17 font-w500">Total Keseluruhan</h5>
                                    <div className="themesflat-counter fs-18 font-wb">
                                        <span className="number" data-from="0" data-to="309" data-speed="2500" data-inviewport="yes">Rp. {this.state.data_sum.length !== 0 && System.convertRupiah(this.state.data_sum.total_all)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="icon-box bg-color-8 d-block">
                                <div className="content text-center color-8">
                                    <h5 className="title-box fs-17 font-w500">Total Material</h5>
                                    <div className="themesflat-counter fs-18 font-wb">
                                        <span className="number" data-from="0" data-to="309" data-speed="2500" data-inviewport="yes">Rp. {this.state.data_sum.length !== 0 && System.convertRupiah(this.state.data_sum.total_bahan)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="icon-box bg-color-8 d-block">
                                <div className="content text-center color-8">
                                    <h5 className="title-box fs-17 font-w500">Total Produksi</h5>
                                    <div className="themesflat-counter fs-18 font-wb">
                                        <span className="number" data-from="0" data-to="309" data-speed="2500" data-inviewport="yes">Rp. {this.state.data_sum.length !== 0 && System.convertRupiah(this.state.data_sum.total_produksi)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="icon-box bg-color-8 d-block">
                                <div className="content text-center color-8">
                                    <h5 className="title-box fs-17 font-w500">Total Design</h5>
                                    <div className="themesflat-counter fs-18 font-wb">
                                        <span className="number" data-from="0" data-to="309" data-speed="2500" data-inviewport="yes">Rp. {this.state.data_sum.length !== 0 && System.convertRupiah(this.state.data_sum.total_design)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="icon-box bg-color-8 d-block">
                                <div className="content text-center color-8">
                                    <h5 className="title-box fs-17 font-w500">Total Operasional</h5>
                                    <div className="themesflat-counter fs-18 font-wb">
                                        <span className="number" data-from="0" data-to="309" data-speed="2500" data-inviewport="yes">Rp. {this.state.data_sum.length !== 0 && System.convertRupiah(this.state.data_sum.total_operasional)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="icon-box bg-color-8 d-block">
                                <div className="content text-center color-8">
                                    <h5 className="title-box fs-17 font-w500">Total Pekerjaan Lain-Lain</h5>
                                    <div className="themesflat-counter fs-18 font-wb">
                                        <span className="number" data-from="0" data-to="309" data-speed="2500" data-inviewport="yes">Rp. {this.state.data_sum.length !== 0 && System.convertRupiah(this.state.data_sum.total_lain)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default InfoUang;