import React from "react";
import ListProgress from "./ListProgress";
import HelmetTitle from "./etc/HelmetTitle";
import { withRouter } from "./etc/withRouter";
import ProgressProject from "../module/ProgressProject";
import moment from 'moment';

class DetailProgress extends React.Component<any, any> {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            project: {},
            progress: [],
            status: {
                P25: false,
                P50: false,
                P100: false,
                STP: false,
                DONE: false,
            }
        }
        this.getProgress = this.getProgress.bind(this);
    }

    getProgress() {
        const id = this.props.params.id;

        ProgressProject.getDetail({ id: id }).then((result) => {
            console.log(result);
            result.data.data.progress.forEach(el => {
                const key = Object.keys(el)[0];
                if (key === "On Progress 25%") {
                    this.setState(prevState => ({
                        status: {
                            ...prevState.status,
                            P25: true,
                        }
                    }))
                } else if (key === "On Progress 50%") {
                    this.setState(prevState => ({
                        status: {
                            ...prevState.status,
                            P50: true,
                        }
                    }))
                } else if (key === "On Progress 100%") {
                    this.setState(prevState => ({
                        status: {
                            ...prevState.status,
                            P100: true,
                        }
                    }))
                } else if (key === "Perakitan Projek Di Lokasi") {
                    this.setState(prevState => ({
                        status: {
                            ...prevState.status,
                            STP: true,
                        }
                    }))
                } else if (key === "Projek Selesai") {
                    this.setState(prevState => ({
                        status: {
                            ...prevState.status,
                            DONE: true,
                        }
                    }))
                }
            });

            const data_progress = result.data.data.progress.map(el => {
                const keys = Object.keys(el)[0];

                return (
                    <div className="rincian-progress-item">
                        <div className="progress-item-head">
                            <span>{keys}</span>
                        </div>

                        <ul>
                            {
                                el[keys].map(el2 => {
                                    return (
                                        <>
                                            <li key={el2.id_progress_project}>
                                                <div className="row">
                                                    <div className="col-sm">
                                                        <div className="item-progress text-end">
                                                            <p>{moment(el2.created_at).format("DD-MM-YYYY HH:mm:ss")}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm">
                                                        <div className="item-progress">
                                                            <small>{el2.nama_progress}</small><br />
                                                            <img src={`http://localhost:8000/media/${el2.foto}`} className="img-fluid" alt="" />
                                                            <p>{el2.desc}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </>
                                    )
                                })
                            }



                        </ul>
                    </div>
                )
            });

            console.log(data_progress)

            this.setState({
                project: result.data.data.project,
                progress: data_progress
            })
        }).catch((rejects) => {
            console.log(rejects);
        })
    }

    componentDidMount(): void {
        this.getProgress();
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Detail Progress" />
                <div className="box-progress">
                    <div className="container">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex">
                                    <div className="flex-grow-1">
                                        <h6>Projek ID</h6>
                                        <h3>{this.state.project.nama_project} / <span className="text-primary">#{this.state.project.id_project}</span></h3>
                                    </div>
                                    <div>
                                        <h6>Estimasi Projek</h6>
                                        <h3>{this.state.project.estimasi_pengerjaan} Hari Kerja</h3>
                                    </div>
                                </div>
                                <div className="progress-tracking mt-5">
                                    <div className="row g-0 ">
                                        <div className="col">
                                            <div className="tracking-item">
                                                <div className={`tracking-circle ${this.state.status.P25 && `is-complete`}`}></div>
                                                <div className={`tracking-line ${this.state.status.P25 && `is-complete`} align-self-center`}></div>
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
                                                <div className={`tracking-circle ${this.state.status.P50 && `is-complete`}`}></div>
                                                <div className={`tracking-line ${this.state.status.P50 && `is-complete`} align-self-center`}></div>
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
                                                <div className={`tracking-circle ${this.state.status.P100 && `is-complete`}`}></div>
                                                <div className={`tracking-line ${this.state.status.P100 && `is-complete`} align-self-center`}></div>
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
                                                <div className={`tracking-circle ${this.state.status.STP && `is-complete`}`}></div>
                                                <div className={`tracking-line ${this.state.status.STP && `is-complete`} align-self-center`}></div>
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
                                                <div className={`tracking-circle ${this.state.status.DONE && `is-complete`}`}></div>
                                                <div className={`tracking-line ${this.state.status.DONE && `is-complete`} align-self-center`}></div>
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

                                <ListProgress progress={this.state.progress} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(DetailProgress);