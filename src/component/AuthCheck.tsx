import React from "react";
import Auth from "../module/Auth";
import { Navigate, Outlet } from "react-router-dom";

class AuthCheck extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            loading: false,
        }
    }

    componentDidMount(): void {
        this.setState({
            loading: true,
        });

        const data_auth = localStorage.getItem("user-cozyproject");

        Auth.check(data_auth).then((result: any) => {
            if (result.response === true) {
                this.setState({
                    isLogged: <Outlet />,
                    loading: false,
                });
                console.log("IN 1")
            } else {
                this.setState({
                    isLogged: <Navigate to={"/"} replace={true} />,
                    loading: false,
                })
            }
        })
    }

    render(): React.ReactNode {
        return (
            <>
            </>
        )
    }
}

export default AuthCheck;