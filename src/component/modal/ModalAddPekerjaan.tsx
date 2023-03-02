import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'react-select-search/style.css'

class ModalAddPekerjaan extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah Pekerjaan Lain-Lain</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='form-group'>
                            <label htmlFor="">Judul Pekerjaan</label>
                            <input type="text" className="form-control" />
                        </div>

                        <div className='form-group mt-3'>
                            <label htmlFor="">Harga</label>
                            <input type="text" className="form-control" />
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

export default ModalAddPekerjaan;