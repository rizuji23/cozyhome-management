import React from "react";
import ListProgress from "./ListProgress";

class DetailProgress extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                <div className="box-progress">
                    <div className="container">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex">
                                    <div className="flex-grow-1">
                                        <h6>Projek ID</h6>
                                        <h3>Kitchen Set / <span className="text-primary">#889898</span></h3>
                                    </div>
                                    <div>
                                        <h6>Estimasi Projek</h6>
                                        <h3>20 Hari Kerja</h3>
                                    </div>
                                </div>
                                <div className="progress-tracking mt-5">
                                    <div className="row g-0 ">
                                        <div className="col">
                                            <div className="tracking-item">
                                                <div className="tracking-circle is-complete"></div>
                                                <div className="tracking-line is-complete align-self-center"></div>
                                            </div>

                                            <div className="progress-ket">
                                                <div className="d-flex">
                                                    <div>
                                                        <img src="/images/progress/p_25.png" alt="" />
                                                    </div>
                                                    <div className="align-self-center ms-3">
                                                        <p>On Progress <br /> 25%</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="tracking-item">
                                                <div className="tracking-circle is-complete"></div>
                                                <div className="tracking-line is-complete align-self-center"></div>
                                            </div>
                                            <div className="progress-ket">
                                                <div className="d-flex">
                                                    <div>
                                                        <img src="/images/progress/p_50.png" alt="" />
                                                    </div>
                                                    <div className="align-self-center ms-3">
                                                        <p>On Progress <br /> 50%</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="tracking-item">
                                                <div className="tracking-circle "></div>
                                                <div className="tracking-line  align-self-center"></div>
                                            </div>
                                            <div className="progress-ket">
                                                <div className="d-flex">
                                                    <div>
                                                        <img src="/images/progress/p_100.png" alt="" />
                                                    </div>
                                                    <div className="align-self-center ms-3">
                                                        <p>On Progress <br /> 100%</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="tracking-item">
                                                <div className="tracking-circle "></div>
                                                <div className="tracking-line  align-self-center"></div>
                                            </div>
                                            <div className="progress-ket">
                                                <div className="d-flex">
                                                    <div>
                                                        <img src="/images/progress/rakit.png" alt="" />
                                                    </div>
                                                    <div className="align-self-center ms-3">
                                                        <p>Sedang Tahap <br /> Perakitan</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="tracking-item no-flex">
                                                <div className="tracking-circle "></div>
                                                <div className="tracking-line align-self-center"></div>
                                            </div>

                                            <div className="progress-ket">
                                                <div className="d-flex">
                                                    <div>
                                                        <img src="/images/progress/finish.png" alt="" />
                                                    </div>
                                                    <div className="align-self-center ms-3">
                                                        <p>Projek <br /> Selesai</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <ListProgress />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default DetailProgress;