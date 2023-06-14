import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import System from '../../module/System';

class ModalEditCost extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            cost: 0,
        }

        this.setCost = this.setCost.bind(this);
        this.checkCost = this.checkCost.bind(this);
        this.handleCost = this.handleCost.bind(this);
    }

    checkCost(data) {
        console.log(" this.props.cost_data.id_cost_project", this.props.cost_data.id_cost_project)
        if (data === "Cost Produksi") {
            this.setState({
                cost: {
                    id: this.props.cost_data.id_cost_project,
                    title: data,
                    cost: this.props.cost_data.cost_produksi
                },
            });
        } else if (data === "Cost Design") {
            this.setState({
                cost: {
                    id: this.props.cost_data.id_cost_project,
                    title: data,
                    cost: this.props.cost_data.cost_design
                },
            });
        } else if (data === "Cost Oprasional") {

            this.setState({
                cost: {
                    id: this.props.cost_data.id_cost_project,
                    title: data,
                    cost: this.props.cost_data.cost_operasional
                },
            });
        }
    }

    setCost() {
        this.checkCost(this.props.title);
    }

    componentDidMount(): void {
        this.setCost();
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps.isOpen !== this.props.isOpen) {
            this.setCost();
        }
    }

    handleCost(e) {
        this.setState(prevState => ({
            cost: {
                ...prevState.cost,
                cost: System.convertInt(e.target.value),
            }
        }));
    }

    render(): React.ReactNode {
        return (
            <>
                <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit {this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='form-group'>
                            <label htmlFor="">{this.props.title}</label>
                            <input type="text" onChange={this.handleCost} value={this.state.cost.cost !== undefined && System.convertRupiah(this.state.cost.cost)} className="form-control" />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.closeModal}>
                            Batal
                        </Button>
                        <Button variant="primary" onClick={() => this.props.handleEditCost(this.state.cost)}>
                            Edit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ModalEditCost;