import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'

class ModalAddProgress extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: "Triplek",
                    value: "Triplek"
                }
            ]
        }
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
                            <label htmlFor="">Nama Progress</label>
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

export default ModalAddProgress;