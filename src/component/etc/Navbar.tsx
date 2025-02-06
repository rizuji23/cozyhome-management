import React from "react";
import Auth from "../../module/Auth";
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { sidebar } from "../../js/main";

class Navbar extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            name: JSON.parse(localStorage.getItem("user-cozyproject")).name,
            role: JSON.parse(localStorage.getItem("user-cozyproject")).role,
            img: "/img_user/profile.png",
            show: false,
        }
    }

    getUserDetail() {
        const data_auth = localStorage.getItem("user-cozyproject");
        Auth.check(data_auth).then((result: any) => {
            console.log(result);
            if (result.response === true) {
                this.setState({
                    name: result.data.data.user.first_name + " " + result.data.data.user.last_name,
                    img: result.data.data.detail_user.img
                })
            }
        })
    }



    componentDidMount(): void {
        this.getUserDetail();
        sidebar();
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps.change !== this.props.change) {
            this.getUserDetail();
        }
    }

    handleClose() {
        this.setState({
            show: false,
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <div className="main-header">
                    <div className="d-flex">
                        <div className="mobile-toggle" onClick={() => {
                            this.setState({
                                show: true,
                            })
                        }}>
                            <i className='bx bx-menu'></i>
                        </div>
                        <div className="main-title">
                            {this.props.title}
                        </div>
                    </div>

                    <div className="d-flex align-items-center">
                        <div className="dropdown d-inline-block mt-12">
                            <button type="button" onClick={() => document.location.href = '/pengaturan'} className="btn header-item waves-effect" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img className="rounded-circle header-profile-user" width={60} src={`https://apicozy.rlstudio.my.id${this.state.img}`}
                                    alt="Header Avatar" />
                                <span className="pulse-css"></span>
                                <span className="info d-xl-inline-block  color-span">
                                    <span className="d-block fs-20 font-w600">{this.state.name}</span>
                                    <span className="d-block mt-7" >{this.state.role}</span>
                                </span>
                            </button>

                        </div>
                    </div>
                </div>

                <Offcanvas show={this.state.show} onHide={() => this.handleClose()}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title className="p-3">
                            <Link to="/dashboard">
                                <img src="/images/logo.png" width={100} alt="Protend logo" />
                            </Link>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className="simlebar-sc">
                            <ul className="sidebar-menu tf  p-2">
                                <li>
                                    <Link to="/dashboard">
                                        <i className='bx bxs-home' ></i>
                                        <span>Dashboard</span>
                                    </Link>
                                </li>
                                <li className="">
                                    <Link to="/projek" className="">
                                        <i className='bx bxs-bolt'></i>
                                        <span>Projek</span>
                                    </Link>
                                </li>

                                <li className="">
                                    <Link to="/customer" className="">
                                        <i className='bx bxs-user'></i>
                                        <span>Customer</span>
                                    </Link>
                                </li>

                                <li className="">
                                    <Link to="/rincian_unit" className="">
                                        <i className='bx bxs-pyramid'></i>
                                        <span>Rincian per unit</span>

                                    </Link>
                                </li>

                                <li className="">
                                    <Link to="/kategori_unit" className="">
                                        <i className='bx bxs-archive-in'></i>
                                        <span>Kategori Unit</span>

                                    </Link>
                                </li>

                                <li>
                                    <Link to="/stok_gudang">
                                        <i className='bx bxs-box'></i>
                                        <span>Stok Gudang</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/pengaturan">
                                        <i className='bx bxs-cog'></i>
                                        <span>Pengaturan</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/logout">
                                        <i className='bx bxs-log-out-circle' ></i>
                                        <span>Logout</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        )
    }
}

export default Navbar;