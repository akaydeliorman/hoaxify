import React from "react";

export class UserSignupPage extends React.Component {
    state = {
        displayName: '',
        username: '',
        password: '',
        passwordVerify: '',
    }
    onChangeDisplayName = (event) => {
        const value = event.target.value
        this.setState({ displayName: value })
    }
    onChangeUserName = (event) => {
        const value = event.target.value
        this.setState({ username: value })
    }
    onChangePassword = (event) => {
        const value = event.target.value
        this.setState({ password: value })
    }
    onChangePasswordVerify = (event) => {
        const value = event.target.value
        this.setState({ passwordVerify: value })
    }

    onClickSignup = () => {
        const user = {
            username: this.state.username,
            displayName: this.state.displayName,
            password: this.state.password
        }
        this.props.actions.postSignup(user);
    }
    render() {
        return (
            <div className="container">
                <h1 className="text-center">Sign up</h1>
                <label>Display Name</label>
                <div className="col-12 mb-3">
                    <input
                        className="from-control"
                        placeholder="Display name"
                        value={this.state.displayName}
                        onChange={this.onChangeDisplayName}
                    />
                </div>
                <label>Username</label>
                <div className="col-12 mb-3">
                    <input
                        className="from-control"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.onChangeUserName}
                    />
                </div>
                <label>Password</label>
                <div className="col-12 mb-3">
                    <input
                        className="from-control"
                        placeholder="Password" type="password"
                        value={this.state.password}
                        onChange={this.onChangePassword} />
                </div>
                <label>Verify Your Password</label>
                <div className="col-12 mb-3">
                    <input
                        className="from-control"
                        placeholder="Verify your password" type="password"
                        value={this.state.passwordVerify}
                        onChange={this.onChangePasswordVerify} />
                </div>
                <div className="text-center">
                    <button className="btn btn-primary" onClick={this.onClickSignup}>Sign Up</button>
                </div>
            </div>
        )
    }
}
UserSignupPage.defaultProps = {
    actions: {
        postSignup: () => new Promise((resolve, reject) => {
            resolve({})
        })
    }
}

export default UserSignupPage;