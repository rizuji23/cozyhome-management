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
                                    <span className="d-block fs-20 font-w600">Aye Shabira</span>
                                    <span className="d-block mt-7" >Admin</span>
                                </span>
                            </button>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Navbar;