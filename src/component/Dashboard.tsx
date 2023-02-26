import React from 'react';
import HelmetTitle from './etc/HelmetTitle';
import Sidebar from './etc/Sidebar';
import Navbar from './etc/Navbar';
import InfoProject from './etc/InfoProject';

class Dashboard extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Dashboard" />

                <Sidebar />
                <Navbar title="Dashboard" />
                <div className="main">
                    <div className="main-content project">
                        <InfoProject />

                        <div className="row mt-3">
                            <div className="col">
                                <div className="box f-height">
                                    <div className="box-header d-flex justify-content-between">
                                        <h3 className="mt-9 fs-22">Projek Statistik</h3>
                                        <ul className="card-list mb-0">
                                            <li className="custom-label"><span></span>Complete</li>
                                            <li className="custom-label"><span></span>Doing</li>
                                        </ul>
                                    </div>
                                    <div className="box-body pt-20">
                                        <div id="customer-chart"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="box">
                                    <div className="box-header">
                                        <div className="me-auto">
                                            <h4 className="card-title fs-22">Employee Category</h4>
                                            <p className="fs-14 mt-4">Lorem ipsum dolor sit amet</p>
                                        </div>
                                    </div>
                                    <div className="box-body pt-0">
                                        <div className="row">
                                            <div className="col-6 col-xl-12 col-md-6 col-sm-12 w-sm-100 mb-0">
                                                <ul className="box-list mt-25 pr-60">
                                                    <li><span className="bg-blue square"></span>Web Design<span>25%</span></li>
                                                    <li><span className="bg-success square"></span>UX/UI Design<span>18%</span></li>
                                                    <li><span className="bg-warning square"></span>Graphics Design<span>17%</span></li>
                                                    <li><span className="bg-blue square"></span>Motion Design<span>12.50%</span></li>
                                                    <li><span className="bg-success square"></span>Brand Identity<span>12.50%</span></li>
                                                    <li><span className="bg-warning square"></span>Others<span>12.50%</span></li>
                                                </ul>
                                            </div>
                                            <div className="col-6 col-xl-12 col-md-6 col-sm-12 w-sm-100 mb-0">
                                                <div className="canvas-container">
                                                    <canvas id="chartjs-4" className="chartjs" width="100" height="100"></canvas>
                                                    <div className="chart-data">
                                                        <div data-percent="25" data-color="#3C21F7" data-label="Web Design"></div>
                                                        <div data-percent="18" data-color="#00BC8B" data-label="UX/UI Design"></div>
                                                        <div data-percent="17" data-color="#FFB800" data-label="Graphics Design"></div>
                                                        <div data-percent="12.5" data-color="#00ECCC" data-label="Motion Design"></div>
                                                        <div data-percent="12.5" data-color="#EF7F5A" data-label="Brand Identity"></div>
                                                        <div data-percent="12.5" data-color="#5D45FB" data-label="Others"></div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col mt-3">
                            <div className="box">
                                <div className="box-header  pt-0">
                                    <div className="me-auto">
                                        <h4 className="card-title mb-0 fs-22">Projek Yang Sedang Berlangsung</h4>
                                    </div>
                                    <div className="card-options pr-3">
                                        <div className="dropdown"> <a href="#" className="btn ripple btn-outline-light dropdown-toggle fs-12" data-bs-toggle="dropdown" aria-expanded="false"> See All <i className="feather feather-chevron-down"></i> </a>
                                            <ul className="dropdown-menu dropdown-menu-end" role="menu">
                                                <li><a href="#">Monthly</a></li>
                                                <li><a href="#">Yearly</a></li>
                                                <li><a href="#">Weekly</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-body pb-0">
                                    <div className="project-progress-content mt-21 mb-26">
                                        <div className="list-group-item d-sm-flex  align-items-center border-0 pd-0">
                                            <div className="d-flex">
                                                <div className="task-img bg-primary-transparent"> <img src="./images/icon/html-2.png" alt="img" className="" /> </div>
                                            </div>
                                            <div className="w-90 mt-4 mt-md-0 pl-13">
                                                <p className="fs-16 font-w500 ms-auto mb-13">Software Architecture Design</p>
                                                <div className="progress progress-sm w-100">
                                                    <div className="progress-bar bg-green-1 w-90"></div>
                                                </div>
                                                <div className="d-flex justify-content-between mt-17">
                                                    <div className="deadline fs-14 font-w500 me-auto d-flex align-items-center"><i className='bx bxs-time-five fs-20 mr-9'></i>Deadline : in 3 days</div>
                                                    <ul className="user-list mb-0">
                                                        <li><img src="./images/avatar/user-1.png" alt="user" /></li>
                                                        <li><img src="./images/avatar/user-2.png" alt="user" /></li>
                                                        <li><img src="./images/avatar/user-3.png" alt="user" /></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="project-progress-content mt-0 mb-26">
                                        <div className="list-group-item d-sm-flex  align-items-center border-0 pd-0">
                                            <div className="d-flex">
                                                <div className="task-img bg-primary-transparent"> <img src="./images/icon/html-2.png" alt="img" className="" /> </div>

                                            </div>
                                            <div className="w-90 mt-4 mt-md-0 pl-13">
                                                <p className="fs-16 font-w500 ms-auto mb-13">Web Development</p>
                                                <div className="progress progress-sm w-100">
                                                    <div className="progress-bar bg-primary-1 w-90"></div>
                                                </div>
                                                <div className="d-flex justify-content-between mt-17">
                                                    <div className="deadline fs-14 font-w500 me-auto d-flex align-items-center"><i className='bx bxs-time-five fs-20 mr-9'></i>Deadline : in 3 days</div>
                                                    <ul className="user-list mb-0">
                                                        <li><img src="./images/avatar/user-1.png" alt="user" /></li>
                                                        <li><img src="./images/avatar/user-2.png" alt="user" /></li>
                                                        <li><img src="./images/avatar/user-3.png" alt="user" /></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="project-progress-content mt-0">
                                        <div className="list-group-item d-sm-flex  align-items-center border-0 pd-0">
                                            <div className="d-flex">
                                                <div className="task-img bg-primary-transparent"> <img src="./images/icon/html-2.png" alt="img" className="" /> </div>

                                            </div>
                                            <div className="w-90 mt-4 mt-md-0 pl-13">
                                                <p className="fs-16 font-w500 ms-auto mb-13">Mobile App Development</p>
                                                <div className="progress progress-sm w-100">
                                                    <div className="progress-bar bg-danger w-90"></div>
                                                </div>
                                                <div className="d-flex justify-content-between mt-17">
                                                    <div className="deadline fs-14 font-w500 me-auto d-flex align-items-center"><i className='bx bxs-time-five fs-20 mr-9'></i>Deadline : in 3 days</div>
                                                    <ul className="user-list mb-0">
                                                        <li><img src="./images/avatar/user-1.png" alt="user" /></li>
                                                        <li><img src="./images/avatar/user-2.png" alt="user" /></li>
                                                        <li><img src="./images/avatar/user-3.png" alt="user" /></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
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

export default Dashboard;