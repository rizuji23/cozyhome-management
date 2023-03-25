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
                            {this.props.progress}
                        </div>
                    </Tab>

                </Tabs>
            </>
        )
    }
}

export default ListProgress;