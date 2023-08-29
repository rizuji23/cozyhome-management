import React from "react";
import { Button, Modal } from "react-bootstrap";
import System from "../../module/System";
import RincianUnitSystem from "../../module/RincianUnit";
import LoadingButton from "../etc/LoadingButton";
import { toast } from "react-toastify";

class ModalUnitOperasional extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            cost_operasional: this.props.cost,
            loading: false,
            disabled: true,
            data_auth: localStorage.getItem("user-cozyproject"),
        }
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps.isOpen !== this.props.isOpen) {
            this.setState({
                cost_operasional: this.props.cost,
            })
        }

    }

    send() {
        this.setState({
            loading: true,
        });

        RincianUnitSystem.editRincianUnit({ id: this.props.id, type_edit: 'cost_operasional', cost_operasional: this.state.cost_operasional }, this.state.data_auth).then((result: any) => {
            this.setState({
                loading: false,
            });
            this.props.getAPI();
            this.props.closeModal();
            toast.success("Cost Operasional berhasil diedit");
        }).catch((err) => {
            this.setState({
                loading: false,
            });
            toast.error("Cost Operasional gagal diedit");
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Cost Operasional</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='form-group'>
                            <label htmlFor="">Cost Operasional</label>
                            <input type="text" value={System.convertRupiah(this.state.cost_operasional)} onChange={(e) => {
                                this.setState({
                                    cost_operasional: System.convertInt(e.target.value)
                                })
                            }} className="form-control" />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.closeModal}>
                            Batal
                        </Button>
                        <Button variant="primary" disabled={this.state.loading} onClick={() => this.send()}>
                            Edit
                            <LoadingButton show={this.state.loading} />
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ModalUnitOperasional;