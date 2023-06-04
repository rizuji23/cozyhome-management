import React from "react";
import Auth from "../../module/Auth";

class Navbar extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            name: JSON.parse(localStorage.getItem("user-cozyproject")).name,
            role: JSON.parse(localStorage.getItem("user-cozyproject")).role,
            img: "/img_user/profile.png",
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
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps.change !== this.props.change) {
            this.getUserDetail();
        }
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
                            <button type="button" onClick={() => document.location.href = '/pengaturan'} className="btn header-item waves-effect" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img className="rounded-circle header-profile-user" width={60} src={`http://localhost:8000${this.state.img}`}
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
            </>
        )
    }
}

export default Navbar;