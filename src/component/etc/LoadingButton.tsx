import React from "react";
type buttonType = {
    show: boolean
}


class LoadingButton extends React.Component<buttonType, any> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                {this.props.show === true ? <span className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span> : <></>}
            </>
        )
    }
}

export default LoadingButton;