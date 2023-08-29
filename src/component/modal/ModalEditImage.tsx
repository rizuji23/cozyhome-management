import React from "react";
import { Button, Modal } from "react-bootstrap";
import RincianUnitSystem from "../../module/RincianUnit";
import { toast } from "react-toastify";
import LoadingButton from "../etc/LoadingButton";

class ModalEditImage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            foto: null,
            foto_preview: this.props.image,
            disabled: true,
            loading: false,
            data_auth: localStorage.getItem("user-cozyproject"),
        }
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevState.foto !== this.state.foto) {
            console.log(this.state.foto);
            if (this.state.foto) {
                const urls = URL.createObjectURL(this.state.foto);
                console.log(urls);
                this.setState({
                    foto_preview: urls,
                    disabled: false
                })
            } else {
                this.setState({
                    foto_preview: this.props.image,
                    disabled: true
                })
            }
        }

        if (prevProps.isOpen !== this.props.isOpen) {
            this.setState({
                disabled: true,
                foto_preview: this.props.image,
                foto: null
            });
        }
    }

    send() {
        this.setState({
            loading: true,
            disabled: true,
        });
        const formData = new FormData();
        formData.append("image", this.state.foto);
        formData.append("id", this.props.id);
        formData.append("id_rincian_unit", this.props.id_parent);

        toast.info("Foto sedang diupload, mohon ditunggu...");
        RincianUnitSystem.editImage(formData, this.state.data_auth).then((result) => {
            this.setState({
                loading: false,
            });
            toast.success("Foto berhasil diupload");
            this.props.closeModal();
            this.props.getAPI();
        }).catch((err) => {
            this.setState({
                loading: false,
            });
            toast.error("Foto gagal diupload");
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Foto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <img src={this.state.foto_preview} className="img-fluid rounded-4" alt="" />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">Foto</label>
                            <input type="file" accept="image/*" onChange={(e: any) => {
                                this.setState({
                                    foto: e.target?.files[0]
                                });
                            }} className="form-control" />
                            <small className="text-muted"><span className="text-danger">*</span> Klik lagi input <b>Foto</b> jika ingin mengganti foto.</small>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.closeModal}>
                            Batal
                        </Button>
                        <Button variant="primary" disabled={this.state.disabled} onClick={() => this.send()}>
                            Simpan
                            <LoadingButton show={this.state.loading} />
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ModalEditImage;