import React from 'react';
import Helmet from 'react-helmet';
import HelmetTitle from './etc/HelmetTitle';
import LoadingButton from './etc/LoadingButton';
import AlertBottom from './etc/AlertBottom';
import System from '../module/System';
import Auth from '../module/Auth';
import { Navigate } from 'react-router-dom';


class Login extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            login: {
                username: "",
                password: "",
            },
            loading: false,
            disabled: true,
            msg_username: "",
            msg_password: "",
            navigation: false
        }

        this.handlePassword = this.handlePassword.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.clearState = this.clearState.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    validated() {
        setTimeout(() => {
            if (System.isObjectEmpty(this.state.login)) {
                this.setState({ disabled: false });
            } else {
                this.setState({ disabled: true });
            }
        }, 1000)
    }

    handleUsername(e) {
        this.setState(prevState => ({
            login: {
                ...prevState.login,
                username: e.target.value,
            }
        }));
        this.validated();

        if (e.target.value.length === 0) {
            this.setState({
                msg_username: <AlertBottom show={true} msg="Username tidak boleh kosong." />,
            })
        } else {
            this.setState({
                msg_username: "",
            })
        }
    }

    handlePassword(e) {
        this.setState(prevState => ({
            login: {
                ...prevState.login,
                password: e.target.value,
            }
        }));
        this.validated();
        if (e.target.value.length === 0) {
            this.setState({
                msg_password: <AlertBottom show={true} msg="Password tidak boleh kosong." />,
            })
        } else {
            this.setState({
                msg_password: "",
            })
        }
    }

    clearState() {
        this.setState(prevState => ({
            login: {
                username: "",
                password: "",
            }
        }));
        this.validated();
    }

    handleLogin() {
        const data = {
            username: this.state.login.username,
            password: this.state.login.password,
        }

        this.setState({
            disabled: true,
            loading: true,
        });

        Auth.login(data).then((result: any) => {
            console.log(result);
            this.setState({
                disabled: false,
                loading: false,
            });
            this.setState({
                isLogged: <Navigate to="/dashboard" replace={true} />
            })
            localStorage.setItem("user-cozyproject", JSON.stringify(result.data));
            localStorage.setItem("logged-cozyproject", JSON.stringify(true));
        }).catch((reject) => {
            this.setState({
                msg_password: <AlertBottom show={true} msg="Username atau Password salah." />,
                loading: false,
            })
        })
    }

    render(): React.ReactNode {
        return (
            <>
                {this.state.isLogged}

                <HelmetTitle title="Login" />
                <div className='container mt-5'>
                    <section className="login">
                        <div className="row">
                            <div className="col-12">
                                <div className="box">
                                    <div className="box-header d-flex justify-content-between">
                                        <a href="index.html">
                                            <img src="/images/logo.png" width={100} alt="" />
                                        </a>

                                        <div className="action-reg">
                                            <h4 className="fs-30">Project Management</h4>
                                        </div>

                                    </div>
                                    <div className="line"></div>
                                    <div className="box-body">
                                        <div className="auth-content my-auto">
                                            <div className="action-reg text-center">
                                                <h4 className="fs-30 mb-4">Login</h4>
                                            </div>
                                            <div className="mb-24">
                                                <label className="form-label mb-14">Username</label>
                                                <input type="text" className="form-control" onChange={this.handleUsername} id="username" placeholder="Masukan Username" />
                                                {this.state.msg_username}

                                            </div>
                                            <div className="mb-16">
                                                <div className="d-flex align-items-start">
                                                    <div className="flex-grow-1">
                                                        <label className="form-label mb-14">Password</label>
                                                    </div>
                                                    {/* <div className="flex-shrink-0">
                                                            <div className="">
                                                                <a href="#" className="text-muted">Forgot password?</a>
                                                            </div>
                                                        </div> */}
                                                </div>

                                                <div className="input-group auth-pass-inputgroup">
                                                    <input type="password" className="form-control" onChange={this.handlePassword} placeholder="Masukan Password" aria-label="Password" aria-describedby="password-addon" />
                                                    <button className="btn shadow-none ms-0" type="button" id="password-addon"><i className="far fa-eye-slash"></i></button>
                                                </div>
                                                {this.state.msg_password}

                                            </div>
                                            <div className="row mb-29">
                                                {/* <div className="col">
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" id="remember-check" />
                                                            <label className="form-check-label fs-14" >
                                                                Remember me
                                                            </label>
                                                        </div>
                                                    </div> */}
                                            </div>
                                            <div className="mb-3">
                                                <button onClick={this.handleLogin} className="btn bg-primary color-white w-100 waves-effect waves-light fs-18 font-w500" disabled={this.state.disabled} >Login <LoadingButton show={this.state.loading} /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </>
        )
    }
}

export default Login;