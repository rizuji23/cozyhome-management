import React from "react";
import { Button, Modal } from "react-bootstrap";

class ModalAddUser extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='form-group'>
                            <label htmlFor="">Nama User</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className='form-group mt-3'>
                            <label htmlFor="">Username</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className='form-group mt-3'>
                            <label htmlFor="">Password</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className='form-group mt-3'>
                            <label htmlFor="">Bagian</label>
                            <select name="" className="form-control" id="">
                                <option value="">Pilih Bagian</option>
                                <option value="0">Admin</option>
                                <option value="1">Project Management</option>
                                <option value="2">Stok Management</option>
                            </select>
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

export default ModalAddUser;