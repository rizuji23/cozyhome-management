import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { URL_DEV } from "../module/axios";
import RincianUnitSystem from "../module/RincianUnit";
import { toast } from "react-toastify";
import LoadingButton from "./etc/LoadingButton";
import ModalEditImage from "./modal/ModalEditImage";

export const ImageBox = (props: any) => {
    const [isOpen, setOpen] = useState<boolean>(false);

    const closeModal = () => {
        setOpen(false);
    }

    return (
        <>
            <div className="position-relative">
                <img className="img-fluid" src={`${props.url}`} />
                <div className="position-absolute bottom-0 end-0 p-3" style={{ zIndex: 3 }}>
                    <div className="d-flex gap-2">
                        {
                            props.option !== false ? <>
                                <div className="">
                                    <button className="btn btn-danger btn-sm" onClick={() => {
                                        if (window.confirm("Apakah ingin dihapus?")) {
                                            props.delete(props.id);
                                        }
                                    }} disabled={props.loading}>{props.loading ? <LoadingButton show={props.loading} /> : <i className='bx bx-trash' ></i>}</button>
                                </div>
                                <div className="">
                                    <button className="btn btn-success btn-sm" onClick={() => setOpen(true)} disabled={props.loading}>{props.loading ? <LoadingButton show={props.loading} /> : <i className='bx bx-pencil' ></i>}</button>
                                </div>
                            </>
                                :
                                <></>
                        }

                    </div>
                </div>
            </div>

            <ModalEditImage isOpen={isOpen} closeModal={closeModal} image={props.url} id={props.id} id_parent={props.id_parent} getAPI={props.getAPI} />
        </>
    )
}

export default class ImageGallery extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
            data_auth: localStorage.getItem("user-cozyproject"),
            disabled: true,
        }

        this.delete = this.delete.bind(this);
    }

    delete(id: string) {
        this.setState({
            loading: true,
        });
        console.log({ id: id, id_rincian_unit: this.props.id })
        RincianUnitSystem.deleteImage({ id: id, id_rincian_unit: this.props.id }, this.state.data_auth).then((result) => {
            this.setState({
                loading: false,
            });

            this.props.getAPI();
            toast.success("Foto berhasil dihapus");
        }).catch((err) => {
            console.log(err);
            this.setState({
                loading: false,
            });

            toast.error("Foto gagal dihapus");
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <Carousel>
                    {
                        this.props.data.length !== 0 ? this.props.data.map((el: any) => {
                            console.log(el.url)
                            return (
                                <Carousel.Item>
                                    <ImageBox url={el.url} id={el.id} id_parent={this.props.id} delete={this.delete} loading={this.state.loading} getAPI={() => this.props.getAPI()} />
                                </Carousel.Item>
                            )
                        })
                            :
                            <Carousel.Item>
                                <ImageBox url={"/images/no_image.png"} id={""} option={false} />
                            </Carousel.Item>
                    }
                </Carousel>

            </>
        )
    }
}