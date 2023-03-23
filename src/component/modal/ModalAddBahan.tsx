import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'
import Stok from '../../module/Stok';
import { rejects } from 'assert';
import System from '../../module/System';

class ModalAddBahan extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data_auth: localStorage.getItem("user-cozyproject"),
            harga: 0,
            qty: 0,
            total_all: 0,
            disabled: true,
            id_material: "",
            id_stok_gudang: "",
        }

        this.getStok = this.getStok.bind(this);
        this.handleBahan = this.handleBahan.bind(this);
        this.handleQty = this.handleQty.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    clearState() {
        this.setState({
            harga: 0,
            qty: 0,
            total_all: 0,
            disabled: true,
            id_material: "",
            id_stok_gudang: "",
        })
    }

    getStok() {
        Stok.get(this.state.data_auth).then((result) => {
            console.log(result);
            const data = result.data.data.stok.map(el => {
                return {
                    name: `${el.nama_material} (${el.stok} pcs)`,
                    value: JSON.stringify({ id_material: el.id_material_2, id_stok_gudang: el.id_stok_gudang, id_project: this.props.id_project })
                }
            });
            console.log(data);
            this.setState({
                data: data
            })
        }).catch((rejects) => {
            console.log(rejects);
        })
    }

    componentDidMount(): void {
        this.getStok();
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps.isOpen !== this.props.isOpen) {
            this.getStok();
            this.clearState();
        }
    }

    handleBahan(e) {
        const data = JSON.parse(e);
        console.log(data);
        Stok.getMaterial(data.id_material, this.state.data_auth).then((result) => {
            console.log(result);
            this.setState({
                harga: result.data.data.material.harga,
                id_material: result.data.data.material.id_material,
                id_stok_gudang: data.id_stok_gudang
            }, () => {
                this.handleQty({ target: { value: this.state.qty } });
            });

        }).catch((rejects) => {
            console.log(rejects);
        })
    }

    handleQty(e) {
        console.log(e.target.value)
        const total_all = parseInt(this.state.harga) * parseInt(e.target.value);
        console.log(total_all)
        this.setState({
            qty: parseInt(e.target.value),
            total_all: total_all,
        });

        if (e.target.value.length === 0 || e.target.value === "0") {
            this.setState({
                disabled: true,
            })
        } else {
            this.setState({
                disabled: false,
            })
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
                                <SelectSearch options={this.state.data} onChange={this.handleBahan} search />
                            </div>
                        </div>

                        <div className='form-group mt-3'>
                            <label htmlFor="">Qty</label>
                            <input type="number" onChange={this.handleQty} className='form-control' />
                        </div>
                        <div className='mt-3'>
                            <small>Harga Satuan</small>
                            <h5>Rp. {System.convertRupiah(this.state.harga)}</h5>
                        </div>
                        <div>
                            <small>Total Harga</small>
                            <h5>Rp. {System.convertRupiah(this.state.total_all)}</h5>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.closeModal}>
                            Batal
                        </Button>
                        <Button variant="primary" disabled={this.state.disabled} onClick={() => this.props.handleTambahBahan({ id_material: this.state.id_material, id_stok_gudang: this.state.id_stok_gudang, qty: this.state.qty })}>
                            Simpan
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ModalAddBahan;