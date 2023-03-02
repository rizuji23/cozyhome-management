import React from "react";
import { Tab, Tabs } from "react-bootstrap";

class ListProgress extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3 mt-4 nav-custom"
                    activeKey={"home"}
                >
                    <Tab eventKey="home" title="Rincian Detail Progress">
                        <div className="rincian-progress">
                            <div className="rincian-progress-item">
                                <div className="progress-item-head">
                                    <span>On Progress 25%</span>
                                </div>

                                <ul>
                                    <li>
                                        <div className="row">
                                            <div className="col-sm">
                                                <div className="item-progress text-end">
                                                    <p>20-05-2023 10:00 AM</p>
                                                </div>
                                            </div>
                                            <div className="col-sm">
                                                <div className="item-progress">
                                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, laudantium porro. Alias eius nesciunt incidunt, amet repudiandae esse enim dolore sapiente voluptates? Facere alias blanditiis voluptatem natus ea doloremque totam?</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="row">
                                            <div className="col-sm">
                                                <div className="item-progress text-end">
                                                    <p>20-05-2023 06:00 PM</p>
                                                </div>
                                            </div>
                                            <div className="col-sm">
                                                <div className="item-progress">
                                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, laudantium porro. Alias eius nesciunt incidunt, amet repudiandae esse enim dolore sapiente voluptates? Facere alias blanditiis voluptatem natus ea doloremque totam?</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="rincian-progress-item">
                                <div className="progress-item-head">
                                    <span>On Progress 50%</span>
                                </div>

                                <ul>
                                    <li>
                                        <div className="row">
                                            <div className="col-sm">
                                                <div className="item-progress text-end">
                                                    <p>22-05-2023 08:00 AM</p>
                                                </div>
                                            </div>
                                            <div className="col-sm">
                                                <div className="item-progress">
                                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, laudantium porro. Alias eius nesciunt incidunt, amet repudiandae esse enim dolore sapiente voluptates? Facere alias blanditiis voluptatem natus ea doloremque totam?</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>


                                </ul>
                            </div>
                        </div>
                    </Tab>

                </Tabs>
            </>
        )
    }
}

export default ListProgress;