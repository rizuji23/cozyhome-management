import React from "react";

class InfoProject extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                <div className="row">
                    <div className="">
                        <div className="box card-box">
                            <div className="icon-box bg-color-6 d-block">
                                <div className="content text-center color-6">
                                    <h5 className="title-box fs-17 font-w500">Total Projek</h5>
                                    <div className="themesflat-counter fs-18 font-wb">
                                        <span className="number" data-from="0" data-to="309" data-speed="2500" data-inviewport="yes">1225 +</span>
                                    </div>
                                </div>
                            </div>
                            <div className="icon-box bg-color-7 d-block">
                                <div className="content text-center color-7">
                                    <h5 className="title-box fs-17 font-w500">Pending Projek</h5>
                                    <div className="themesflat-counter fs-18 font-wb">
                                        <span className="number" data-from="0" data-to="309" data-speed="2500" data-inviewport="yes">75 +</span>
                                    </div>
                                </div>
                            </div>
                            <div className="icon-box bg-color-8 d-block">
                                <div className="content text-center color-8">
                                    <h5 className="title-box fs-17 font-w500">On Progress Projek</h5>
                                    <div className="themesflat-counter fs-18 font-wb">
                                        <span className="number" data-from="0" data-to="309" data-speed="2500" data-inviewport="yes">1225 +</span>
                                    </div>
                                </div>
                            </div>
                            <div className="icon-box bg-color-9 d-block">
                                <div className="content text-center color-9">
                                    <h5 className="title-box fs-17 font-w500">Complete Projek</h5>
                                    <div className="themesflat-counter fs-18 font-wb">
                                        <span className="number" data-from="0" data-to="309" data-speed="2500" data-inviewport="yes">2536 +</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}

export default InfoProject;