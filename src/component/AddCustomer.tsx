import React from 'react';
import HelmetTitle from './etc/HelmetTitle';
import Sidebar from './etc/Sidebar';
import Navbar from './etc/Navbar';

class AddCustomer extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Tambah Customer" />

                <Sidebar />
                <Navbar title="Tambah Customer" />
                <div className="main">
                    <div className="main-content project">
                        <div className="box">
                            <div className="box-body">
                                <div className="row">
                                    <div className="col-md-6 col-sm-12 mb-24">
                                        <div className="form-group">
                                            <label className="form-label">Nama Customer</label>
                                            <input className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-24">
                                        <div className="form-group">
                                            <label className="form-label">No Telp</label>
                                            <input className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 col-sm-12 mb-24">
                                        <div className="form-group">
                                            <label className="form-label">Email</label>
                                            <input className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-24">
                                        <div className="form-group">
                                            <label className="form-label">Nama Perusahaan</label>
                                            <input className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Alamat:</label>
                                    <textarea className="form-control" name="text" cols={30} rows={5}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="gr-btn mt-4 text-end">
                            <a href="/customer" className="btn btn-danger btn-lg mr-15 fs-16">CLOSE</a>
                            <a href="#" className="btn btn-primary btn-lg fs-16" >SIMPAN</a>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AddCustomer;