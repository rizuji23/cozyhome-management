import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'react-select-search/style.css'

class ModalAddProgress extends React.Component<any, any> {
    constructor(props) {
        super(props);

    }

    render(): React.ReactNode {
        return (
            <>
                <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah Progress Progress</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='form-group'>
                            <label htmlFor="">Judul Progress</label>
                            <input type="text" className="form-control" />
                        </div>

                        <div className='form-group mt-3'>
                            <label htmlFor="">Status Progress</label>
                            <select name="" className='form-control' id="">
                                <option value="">Pilih Status</option>
                                <option value="P25">On Progress 25%</option>
                                <option value="P50">On Progress 50%</option>
                                <option value="P100">On Progress 100%</option>
                                <option value="ASB">Perakitan Projek Di Lokasi</option>
                                <option value="DONE">Projek Selesai</option>
                            </select>
                        </div>

                        <div className='form-group mt-3'>
                            <label htmlFor="">Deskripsi</label>
                            <textarea cols={30} rows={4} className="form-control"></textarea>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.closeModal}>
                            Batal
                        </Button>
                        <Button variant="primary">
                            Simpan
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ModalAddProgress;