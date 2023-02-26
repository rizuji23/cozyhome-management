import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class ModalEditInformasi extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Informasi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='form-group'>
                            <label htmlFor="">Nama Projek</label>
                            <input type="text" className="form-control" />
                        </div>

                        <div className="form-group mt-3">
                            <label className="form-label">Jumlah Volumn</label>
                            <div className="input-group">
                                <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                                <span className="input-group-text">m2</span>
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <label className="form-label">Kategori</label>
                            <select name="" className='form-control' id="">
                                <option value="">Pilih Kategori Projek</option>
                                <option value="Residential">Residential</option>
                                <option value="Komersial">Komersial</option>
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

export default ModalEditInformasi;