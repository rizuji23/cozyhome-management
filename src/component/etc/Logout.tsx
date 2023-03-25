import React from "react";
import Auth from "../../module/Auth";
import { Navigate } from "react-router-dom";

class Logout extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            data_auth: localStorage.getItem("user-cozyproject"),
            navigation: false,
        }

        this.logout = this.logout.bind(this);
    }

    logout() {
        localStorage.setItem("user-cozyproject", JSON.stringify({ "refresh": "", "access": "", "name": "", "role": 123123, "username": "", "id_user": 123123 }))
        Auth.logout(this.state.data_auth).then((result) => {
            console.log(result);
            this.setState({
                navigation: <Navigate to={`/`} />
            });

        }).catch((rejects) => {
            console.log(rejects);
            this.setState({
                navigation: <Navigate to={`/`} />
            });
        })
    }

    componentDidMount(): void {
        this.logout();
    }

    render(): React.ReactNode {
        return (
            <>
                {this.state.navigation}
            </>
        )
    }
}

export default Logout;