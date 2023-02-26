import React from 'react';
import Helmet from 'react-helmet';
import HelmetTitle from './etc/HelmetTitle';


class Login extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Login" />
                <div className='container mt-5'>
                    <section className="login">
                        <div className="row">
                            <div className="col-12">
                                <div className="box">
                                    <div className="box-header d-flex justify-content-between">
                                        <a href="index.html">
                                            <img src="/images/logo.png" alt="" />
                                        </a>

                                        <div className="action-reg">
                                            <h4 className="fs-30">Login</h4>
                                        </div>

                                    </div>
                                    <div className="line"></div>
                                    <div className="box-body">
                                        <div className="auth-content my-auto">

                                            <form className="mt-5 pt-2">
                                                <div className="mb-24">
                                                    <label className="form-label mb-14">Username</label>
                                                    <input type="text" className="form-control" id="username" placeholder="Your text" />
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
                                                        <input type="password" className="form-control" placeholder="Enter password" aria-label="Password" aria-describedby="password-addon" />
                                                        <button className="btn shadow-none ms-0" type="button" id="password-addon"><i className="far fa-eye-slash"></i></button>
                                                    </div>
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
                                                    <button className="btn bg-primary color-white w-100 waves-effect waves-light fs-18 font-w500" type="submit">Sign in</button>
                                                </div>
                                            </form>
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