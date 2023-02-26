import React from "react";

class Navbar extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                <div className="main-header">
                    <div className="d-flex">
                        <div className="mobile-toggle" id="mobile-toggle">
                            <i className='bx bx-menu'></i>
                        </div>
                        <div className="main-title">
                            {this.props.title}
                        </div>
                    </div>

                    <div className="d-flex align-items-center">
                        <div className="dropdown d-inline-block mt-12">
                            <button type="button" className="btn header-item waves-effect" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img className="rounded-circle header-profile-user" src="/images/profile/profile.png"
                                    alt="Header Avatar" />
                                <span className="pulse-css"></span>
                                <span className="info d-xl-inline-block  color-span">
                                    <span className="d-block fs-20 font-w600">Randy Riley</span>
                                    <span className="d-block mt-7" >randy.riley@gmail.com</span>
                                </span>

                                <i className='bx bx-chevron-down'></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                                <a className="dropdown-item" href="#"><i className="bx bx-user font-size-16 align-middle me-1"></i> <span>Profile</span></a>
                                <a className="dropdown-item" href="#"><i className="bx bx-wallet font-size-16 align-middle me-1"></i> <span>My Wallet</span></a>
                                <a className="dropdown-item d-block" href="#"><span className="badge bg-success float-end">11</span><i className="bx bx-wrench font-size-16 align-middle me-1"></i> <span>Settings</span></a>
                                <a className="dropdown-item" href="#"><i className="bx bx-lock-open font-size-16 align-middle me-1"></i> <span>Lock screen</span></a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item text-danger" href="user-login.html"><i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i> <span>Logout</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Navbar;