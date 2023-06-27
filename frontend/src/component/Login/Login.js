import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setClient, unsetClient } from "../../Redux/Index";
import { useLocation, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


import "./Login.css";
import imageName from "../../assets/img/logo_bg-min.png";
import { loginUser } from "../../api/UserApi";
import { setPageFlag } from "../../Redux/User/UserActions";

const Login = ({ setToken, setClient, token, history, email, role ,setPageFlag, location}) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    document.getElementById('submit-button').setAttribute('disabled', 'disabled');
    document.getElementById('submit-button').innerHTML = 'Loading ...'
    const res = await loginUser({
      email: username,
      password: password
    });
    document.getElementById('submit-button').removeAttribute('disabled');
    document.getElementById('submit-button').innerHTML = 'Sign in'
    if(res.status != 200){
      const notify400 = () => toast.error(res.data.error.message);
      const notify401 = () => toast.info(res.data.error.message);
      const notify500 = () => toast.error(res.data.error.message);
      const notify999 = () => toast.error("Sorry but we are unable to process your request. Please contact our Administrator.");
      res.status == 401 ? notify401() : null;
      res.status == 500 ? notify500() : null;
      res.status == 999 ? notify999() : null;
      res.status == 400 ? notify400() : null;
      document.querySelector('#email').focus();
    } else {
      if(res.data.pass_changed === false){
        sessionStorage.setItem("tempToken", JSON.stringify(res.data.token));
        history.push(`/changepassword`);
      } else {
        setClient(res.data);
        if (!location || location.search.length == 0) {
          if(res.data.role=="Admin"){
            history.push('/dashboard');
          } else {
            history.goBack();
          }
        } else if (location.search.split('=')[0] == '?redirect') {
          if (location.search.split("=")[1] === "home"){
            if(res.data.role == "Admin"){
              history.push('/dashboard');
            } else {
              history.push("/");
            }
          } else {
            history.push(`/${location.search.split("=")[1]}`);
          }
        } else {
          history.push('/');
        }
      }
    }
}

useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return (
    <div>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form
              className="login100-form validate-form p-4"
              onSubmit={handleSubmit}
            >
              <div className="logo-container m-b-32">
                <img className="logo" src={imageName} />
              </div>
              <div
                className="wrap-input100 validate-input m-b-16 mx-auto"
                data-validate="Please enter username"
              >
                <input
                  className="input100 w-100"
                  id="email"
                  type="email"
                  required
                  // name="username"
                  onChange={e => setUserName(e.target.value)}
                  placeholder="Username"
                  // autocomplete="off"
                />
                <span className="focus-input100"></span>
              </div>
              <div
                className="wrap-input100 validate-input m-b-40 mx-auto"
                data-validate="Please enter password"
              >
                <input
                  className="input100 w-100"
                  type="password"
                  id="password"
                  // name="pass"
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  minLength="8"
                  autoComplete="off"
                />
                <span className="focus-input100"></span>
                <i id="show-password" className="far fa-eye-slash show-password" onClick={(e) => {
                  const icon = document.querySelector('#show-password');
                  const input = document.querySelector('#password');
                  if (input.value != "") {
                    icon.classList.toggle('fa-eye-slash');
                    icon.classList.toggle('fa-eye');
                    if(icon.classList.contains('fa-eye')) {
                      input.setAttribute('type', 'text');
                    } else {
                      input.setAttribute('type', 'password');
                    }
                  }
                }}
                ></i>
              </div>
              <div className="container-login100-form-btn w-100">
                <button
                  type="submit"
                  // onClick={handleSubmit}
                  className="login100-form-btn"
                  id="submit-button"
                >
                  Sign in
                </button>
              </div>
            </form>
            <div className="mt-2 forgot-pass-container">
              <NavLink to={`/applyreset`} className="forgot-pass small">Forgot Password?</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    token: state.user.token,
    email: state.user.email,
    role: state.user.role
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setClient: token => dispatch(setClient(token)),
    setPageFlag: () => dispatch(setPageFlag())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
