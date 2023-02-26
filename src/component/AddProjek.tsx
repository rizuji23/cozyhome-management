import React from 'react';
import HelmetTitle from './etc/HelmetTitle';
import Sidebar from './etc/Sidebar';
import Navbar from './etc/Navbar';

class AddProjek extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                <HelmetTitle title="Tambah Baru Projek" />

                <Sidebar />
                <Navbar title="Tambah Baru Projek" />
                <div className="main">
                    <div className="main-content project">
                        <div className="box">
                            <div className="box-body">
                                <div className="row">
                                    <div className="col-md-6 col-sm-12 mb-24">
                                        <div className="form-group">
                                            <label className="form-label">Customer</label>
                                            <input className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-24">
                                        <div className="form-group">
                                            <label className="form-label">Judul Projek</label>
                                            <input className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-sm-12 mb-24">
                                        <div className="form-group">
                                            <label className="form-label">Kategori</label>
                                            <select name="" className='form-control' id="">
                                                <option value="">Pilih Kategori Projek</option>
                                                <option value="Residential">Residential</option>
                                                <option value="Komersial">Komersial</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-24">
                                        <div className="form-group">
                                            <label className="form-label">Jumlah Volumn</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                                                <span className="input-group-text">m2</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-sm-12 mb-24">
                                        <div className="form-group">
                                            <label className="form-label">Tanggal Mulai</label>
                                            <input type='date' className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-24">
                                        <div className="form-group">
                                            <label className="form-label">Tanggal Berakhir</label>
                                            <input type='date' className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Description:</label>
                                    <textarea className="form-control" name="text" cols={30} rows={10}></textarea>
                                </div>

                                <div className="custom-controls-stacked d-lg-flex align-items-center">
                                    <label className="form-label mt-1 fs-18 font-w500 color-primary">Status Pekerjaan :</label>
                                    <label className="custom-control custom-radio success me-4">
                                        <input type="radio" className="custom-control-input me-2" name="example-radios1" value="option1" />
                                        <span className="custom-control-label">Completed</span>
                                    </label>
                                    <label className="custom-control custom-radio success me-4">
                                        <input type="radio" className="custom-control-input  me-2" name="example-radios1" value="option2" />
                                        <span className="custom-control-label">Pending</span>
                                    </label>
                                    <label className="custom-control custom-radio success me-4">
                                        <input type="radio" className="custom-control-input  me-2" name="example-radios1" value="option3" />
                                        <span className="custom-control-label">On Progress</span>
                                    </label>
                                </div>


                            </div>

                        </div>
                        <div className="gr-btn mt-4 text-end">
                            <a href="/projek" className="btn btn-danger btn-lg mr-15 fs-16">CLOSE</a>
                            <a href="#" className="btn btn-primary btn-lg fs-16" >SIMPAN</a>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AddProjek;