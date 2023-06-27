import { Route, NavLink } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import imageName from "../../../assets/img/logo_bg-min.png";
//import classes from './Header.module.css';
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./Header.css";

const Header = ({ token, role }) => {
  const userRole = sessionStorage.getItem("role");
  const [flg,setFlg] = useState(false)
    if(flg==true){
        $(".navbar-collapse").collapse('hide');
        setFlg(false);
    }


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
        <NavLink to="/" className="navbar-brand ml-4" id="ac">
          <img
            src={imageName}
            width="150px"
            height="50px"
            className="imgHeader"
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="collapsibleNavbar"
        >
          <ul className="navbar-nav d-flex align-items-center">
            <li className="nav-link nav-item">
              <NavLink
                to="/"
                className="Navlink"
                activeStyle={{
                  color: "#1bbd36",
                }}
                exact
                onClick={setFlg.bind(this, true)}
              >
                Home
              </NavLink>
            </li>

            <li className="nav-link nav-item">
              <NavLink
                to="/about-us"
                className="Navlink"
                activeStyle={{
                  color: "#1bbd36",
                }}
                exact
                onClick={setFlg.bind(this, true)}
              >
                About Us
              </NavLink>
            </li>
            <li className="nav-item nav-link">
              <NavLink
                to="/breeding"
                className="Navlink"
                activeStyle={{
                  color: "#1bbd36",
                }}
                exact
                onClick={setFlg.bind(this, true)}
              >
                Breeding
              </NavLink>
            </li>
            <li className="nav-item nav-link">
              <NavLink
                to="/trotting"
                className="Navlink"
                activeStyle={{
                  color: "#1bbd36",
                }}
                exact
                onClick={setFlg.bind(this, true)}
              >
                Trotting
              </NavLink>
            </li>
            <li className="nav-item nav-link">
              <NavLink
                to="/training"
                className="Navlink"
                activeStyle={{
                  color: "#1bbd36",
                }}
                exact
                onClick={setFlg.bind(this, true)}
              >
                Training
              </NavLink>
            </li>

            {!token ? (
              <li className="nav-item nav-link">
                <NavLink
                  to="/ownership"
                  className="Navlink"
                  activeStyle={{
                    color: "#1bbd36",
                  }}
                  exact
                  onClick={setFlg.bind(this, true)}
                >
                  Ownership
                </NavLink>
              </li>
            ) : (
              <li className="nav-item dropdown nav-link">
                <NavLink
                  to="#"
                  role="button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  data-toggle="dropdown"
                  id="navbarDropdownButton"
                  className="Navlink"
                  exact
                >
                  Horses <i className="fa fa-chevron-down ml-1 arrow"></i>
                </NavLink>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownButton"
                >
                  <NavLink
                    to="/ownership"
                    className="Navlink dropdown-item mt-2 mb-2 bg-transparent"
                    activeStyle={{
                      color: "#1bbd36",
                    }}
                    exact
                    onClick={setFlg.bind(this, true)}
                  >
                    Ownership
                  </NavLink>
                  <NavLink
                    to="/journal"
                    className="Navlink dropdown-item mt-2 mb-2 bg-transparent"
                    activeStyle={{
                      color: "#1bbd36",
                    }}
                    exact
                    onClick={setFlg.bind(this, true)}
                  >
                    Journal
                  </NavLink>
                  <NavLink
                    to="/myhorses"
                    className="Navlink dropdown-item mb-2 bg-transparent"
                    activeStyle={{
                      color: "#1bbd36",
                    }}
                    exact
                    onClick={setFlg.bind(this, true)}
                  >
                    My Horses
                  </NavLink>
                </div>
              </li>
            )}
            <li className="nav-item nav-link">
              <NavLink
                to="/contact-us"
                className="Navlink"
                activeStyle={{
                  color: "#1bbd36",
                }}
                exact
                onClick={setFlg.bind(this, true)}
              >
                Contact Us
              </NavLink>
            </li>
            {!token ? (
              <>
                <span className="mx-2 pipe">|</span>
                <li className="nav-item nav-link">
                  <NavLink
                    to="/login"
                    className="Navlink"
                    activeStyle={{
                      color: "#1bbd36",
                    }}
                    exact
                    onClick={setFlg.bind(this, true)}
                  >
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <span className="mx-3 pipe">|</span>
                {userRole == '"Admin"' ? (
                  <li className="nav-link nav-item">
                    <NavLink
                      to="/dashboard"
                      className="Navlink"
                      activeStyle={{
                        color: "#1bbd36",
                      }}
                      exact
                      onClick={setFlg.bind(this, true)}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                ) : null}
                <li className="nav-item dropdown nav-link">
                  <NavLink
                    to="#"
                    role="button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    data-toggle="dropdown"
                    id="navbarDropdownButton"
                    className="Navlink"
                    exact
                  >
                    Profile <i className="fa fa-chevron-down ml-1 arrow"></i>
                  </NavLink>
                  <div
                    className="dropdown-menu profile-menu"
                    aria-labelledby="navbarDropdownButton"
                  >
                    <NavLink
                      to="/changepassword"
                      className="Navlink dropdown-item mt-2 mb-2 bg-transparent"
                      activeStyle={{
                        color: "#1bbd36",
                      }}
                      exact
                      onClick={setFlg.bind(this, true)}
                    >
                      Change Password
                    </NavLink>
                    <NavLink
                      to="/logout"
                      className="Navlink dropdown-item mb-2 bg-transparent"
                      activeStyle={{
                        color: "#1bbd36",
                      }}
                      exact
                      onClick={setFlg.bind(this, true)}
                    >
                      Logout
                    </NavLink>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    role: state.user.role

  };
};

export default connect(mapStateToProps, null)(Header);
