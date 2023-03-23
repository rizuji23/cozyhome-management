import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'

class ModalAddBahan extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: "Triplek (Stok: 5 pcs)",
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
                        <Modal.Title>Tambah Estimasi Bahan</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='form-group'>
                            <label htmlFor="">Nama Bahan</label>
                            <div>
                                <SelectSearch options={this.state.data} search />
                            </div>
                        </div>

                        <div className='form-group mt-3'>
                            <label htmlFor="">Qty</label>
                            <input type="number" className='form-control' />
                        </div>
                        <div className='mt-3'>
                            <small>Harga Satuan</small>
                            <h5>Rp. 60.000</h5>
                        </div>
                        <div>
                            <small>Total Harga</small>
                            <h5>Rp. 60.000</h5>
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

export default ModalAddBahan;