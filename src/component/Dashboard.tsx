import React from 'react';
import HelmetTitle from './etc/HelmetTitle';
import Sidebar from './etc/Sidebar';
import Navbar from './etc/Navbar';
import InfoProject from './etc/InfoProject';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';

class Dashboard extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            line_chart: {
                series: [{
                    name: 'Selesai',
                    data: [31, 40, 28, 51, 42, 109, 100],
                    color: "#3c21f7"
                }, {
                    name: 'On Progress',
                    data: [11, 32, 45, 32, 34, 52, 41],
                    color: '#ffca1f',
                }],
                options: {
                    chart: {
                        height: 350,
                        type: 'area'
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'smooth'
                    },
                    xaxis: {
                        type: 'datetime',
                        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
                    },
                    tooltip: {
                        x: {
                            format: 'dd/MM/yy HH:mm'
                        },
                    },
                },
            },

            pie_chart: {
                series: [44, 55],
                options: {
                    chart: {
                        width: 380,
                        type: 'pie',
                    },
                    labels: ['Residential', 'Komersial'],
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                }
            },
            bar_chart: {
                series: [{
                    name: 'Cost Material',
                    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
                }, {
                    name: 'Cost Produksi',
                    data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
                }, {
                    name: 'Cost Design',
                    data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
                }, {
                    name: 'Cost Operasional',
                    data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
                }, {
                    name: 'Total Keseluruhan Cost',
                    data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
                }],
                options: {
                    chart: {
                        type: 'bar',
                        height: 350
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '55%',
                            endingShape: 'rounded'
                        },
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        show: true,
                        width: 2,
                        colors: ['transparent']
                    },
                    xaxis: {
                        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                    },
                    yaxis: {
                        title: {
                            text: '$ (thousands)'
                        }
                    },
                    fill: {
                        opacity: 1
                    },
                    tooltip: {
                        y: {
                            formatter: function (val) {
                                return "$ " + val + " thousands"
                            }
                        }
                    }
                }
            }


        };
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

                        <div className='box mt-3'>
                            <div className='box-body'>
                                <div className='d-flex flex-row-reverse'>
                                    <div className='text-end ms-2'>
                                        <Link to={"/tambah_customer"} className='btn btn-info'>Tambah Customer Baru</Link>
                                    </div>
                                    <div className='text-end'>
                                        <Link to={"/tambah_projek"} className='btn btn-primary'>Tambah Projek Baru</Link>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className='box mt-3'>
                            <div className="box-header">
                                <h3 className="mt-9 fs-22">Cash Flow</h3>
                            </div>

                            <div className='box-body'>
                                <div id="chart">
                                    <ReactApexChart options={this.state.bar_chart.options} series={this.state.bar_chart.series} type="bar" height={350} />
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <div className="box f-height">
                                    <div className="box-header d-flex justify-content-between">
                                        <h3 className="mt-9 fs-22">Projek Statistik</h3>
                                        <ul className="card-list mb-0">
                                            <li className="custom-label"><span></span>Selesai</li>
                                            <li className="custom-label"><span></span>On Progress</li>
                                        </ul>
                                    </div>
                                    <div className="box-body pt-20">
                                        <div id="customer-chart">
                                            <ReactApexChart options={this.state.line_chart.options} series={this.state.line_chart.series} type="area" height={350} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="box h-100">
                                    <div className="box-header">
                                        <div className="me-auto">
                                            <h4 className="card-title fs-22">Kategori Projek</h4>
                                            <p>Statistik banyaknya projek berdasarkan kategori</p>
                                        </div>
                                    </div>
                                    <div className="box-body pt-0">
                                        <div className="row">
                                            <div className="col-6 col-xl-12 col-md-6 col-sm-12 w-sm-100 mb-0">
                                                <div className='mt-5'>
                                                    <ReactApexChart options={this.state.pie_chart.options} series={this.state.pie_chart.series} type="pie" width={380} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* <div className="col mt-3">
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
                                                <div className="task-img bg-primary-transparent"> <img src="./images/icon/residential.png" width={40} alt="img" className="" /> </div>
                                            </div>
                                            <Link to={'/detail_projek'} className='w-100'>
                                                <div className="mt-4 mt-md-0 pl-13">
                                                    <p className="fs-16 font-w500 ms-auto mb-13 text-dark">Kitchen Set</p>
                                                    <div className="progress progress-sm w-100">
                                                        <div className="progress-bar bg-green-1 w-90"></div>
                                                    </div>
                                                    <div className="d-flex mt-2">
                                                        <div className="deadline fs-14 font-w500 d-flex align-items-center"><i className='bx bxs-user fs-20 mr-9'></i>Customer: Aye Shabira</div>
                                                        <div className="deadline fs-14 ms-3 font-w500 d-flex align-items-center"><i className='bx bxs-time-five fs-20 mr-9'></i>Waktu Pengerjaan : 3 Hari</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="project-progress-content mt-0 mb-26">
                                        <div className="list-group-item d-sm-flex  align-items-center border-0 pd-0">
                                            <div className="d-flex">
                                                <div className="task-img bg-primary-transparent"> <img src="./images/icon/residential.png" width={40} alt="img" className="" /> </div>

                                            </div>
                                            <Link to={'/detail_projek'} className='w-100'>

                                                <div className="mt-4 mt-md-0 pl-13">
                                                    <p className="fs-16 font-w500 ms-auto mb-13 text-dark">Living Room Set</p>
                                                    <div className="progress progress-sm w-100">
                                                        <div className="progress-bar bg-primary-1 w-90"></div>
                                                    </div>
                                                    <div className="d-flex mt-2">
                                                        <div className="deadline fs-14 font-w500 d-flex align-items-center"><i className='bx bxs-user fs-20 mr-9'></i>Customer: Aye Shabira</div>
                                                        <div className="deadline fs-14 ms-3 font-w500 d-flex align-items-center"><i className='bx bxs-time-five fs-20 mr-9'></i>Waktu Pengerjaan : 3 Hari</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="project-progress-content mt-0">
                                        <div className="list-group-item d-sm-flex  align-items-center border-0 pd-0">
                                            <div className="d-flex">
                                                <div className="task-img bg-primary-transparent"> <img src="./images/icon/commercial.png" width={40} alt="img" className="" /> </div>

                                            </div>
                                            <Link to={'/detail_projek'} className='w-100'>

                                                <div className="mt-4 mt-md-0 pl-13">
                                                    <p className="fs-16 font-w500 ms-auto mb-13 text-dark">Ice Skating</p>
                                                    <div className="progress progress-sm w-100">
                                                        <div className="progress-bar bg-danger w-90"></div>
                                                    </div>
                                                    <div className="d-flex mt-2">
                                                        <div className="deadline fs-14 font-w500 d-flex align-items-center"><i className='bx bxs-user fs-20 mr-9'></i>Customer: Aye Shabira</div>
                                                        <div className="deadline fs-14 ms-3 font-w500 d-flex align-items-center"><i className='bx bxs-time-five fs-20 mr-9'></i>Waktu Pengerjaan : 3 Hari</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </>
        )
    }
}

export default Dashboard;