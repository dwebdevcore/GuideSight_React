import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Input from "../../components/uielements/input";
import Checkbox from "../../components/uielements/checkbox";
import Button from "../../components/uielements/button";
import authAction from "../../redux/auth/actions";
import appAction from "../../redux/app/actions";
import IntlMessages from "../../components/utility/intlMessages";
import SignInStyleWrapper from "./signin.style";
import axios from "axios"

const { login } = authAction;
const { clearMenu } = appAction;

class SignIn extends Component {
  state = {
    redirectToReferrer: false,
    username: '',
    password: '',
    isError: false
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  handleLogin = () => {
    const { login, clearMenu } = this.props;
    login();

    let userName = this.state.username;
    let password = this.state.password;

    login(userName, password);
    let self = this;

    this.setState({ isError: false });

    axios.post('https://dev.guardsight.no:8443/api/token/', { username: this.state.username, password: this.state.password })
      .then(function (response) {
        localStorage.setItem("token", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        self.props.history.push("/dashboard");
      }).catch(() => {
        debugger;
        this.setState({ isError: true });
      });

  };
  render() {
    const from = { pathname: "/dashboard" };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                GUARDSIGHT
              </Link>
            </div>

            <div className="isoSignInForm">
              <div className="isoInputWrapper">
                <Input value={this.state.username} onChange={(event) => { this.setState({ username: event.target.value }) }} size="large" placeholder="Username" />
              </div>

              <div className="isoInputWrapper">
                <Input value={this.state.password} onChange={(event) => { this.setState({ password: event.target.value }) }} size="large" type="password" placeholder="Password" />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>
                  <IntlMessages id="page.signInRememberMe" />
                </Checkbox>
                <Button type="primary" onClick={this.handleLogin}>
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>
              {this.state.isError
                &&
                <div style={{ color: 'red' }}>User name or password is not correct.</div>
              }
              <p className="isoHelperText">
                <IntlMessages id="page.signInPreview" />
              </p>

            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null ? true : false
  }),
  { login, clearMenu }
)(SignIn);
