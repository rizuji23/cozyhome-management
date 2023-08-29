import React from "react";
import { Button, Modal } from "react-bootstrap";
import RincianUnitSystem from "../../module/RincianUnit";
import { toast } from "react-toastify";
import LoadingButton from "../etc/LoadingButton";

class ModalEditKategoriUnit extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            nama_kategori: this.props.nama_kategori,
            disabled: true,
            data_auth: localStorage.getItem("user-cozyproject"),
            loading: false,
        }
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevState.nama_kategori !== this.state.nama_kategori) {
            if (this.state.nama_kategori.length !== 0) {
                this.setState({
                    disabled: false
                });
            } else {
                this.setState({
                    disabled: true
                });
            }
        }

        if (prevProps.nama_kategori !== this.props.nama_kategori) {
            this.setState({
                nama_kategori: this.props.nama_kategori
            })
        }
    }

    send() {
        this.setState({
            loading: true,
            disabled: true,
        });
        RincianUnitSystem.editKategoriUnit({ id: this.props.id, nama_kategori: this.state.nama_kategori }, this.state.data_auth).then((result: any) => {
            toast.success("Kategori Unit Berhasil diedit");
            this.setState({
                loading: false,
                disabled: true,
                nama_kategori: "",
            });
            this.props.getKategoriUnit();
            this.props.closeModal();
        }).catch((err) => {
            this.setState({
                loading: false,
                disabled: true,
            });
            toast.error("Kategori Unit Gagal diedit");
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Kategori Unit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='form-group'>
                            <label htmlFor="">Nama Kategori</label>
                            <input type="text" className="form-control" value={this.state.nama_kategori} onChange={(e) => {
                                this.setState({
                                    nama_kategori: e.target.value,
                                })
                            }} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.closeModal}>
                            Batal
                        </Button>
                        <Button variant="primary" onClick={() => this.send()} disabled={this.state.disabled}>
                            Edit {this.state.loading && <LoadingButton show={this.state.loading} />}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ModalEditKategoriUnit;