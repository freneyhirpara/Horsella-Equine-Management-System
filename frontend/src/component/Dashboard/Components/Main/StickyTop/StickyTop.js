import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { NavLink} from "react-router-dom";
import { unsetPageFlag } from "../../../../../Redux/User/UserActions";

import "./StickyTop.css";

function StickyTop({ email, token, pageFlag, unsetPageFlag, history }) {
  function unsetFlag() {
    unsetPageFlag();
    // history.push("/");
    <Redirect to="/" />
  }

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
      >
        <i className="fas fa-bars"></i>
      </button>

      <ul className="navbar-nav ml-auto">
        {token ? (
          <li className="nav-item dropdown">
              <NavLink to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"className=" nav-link dropdown-toggleNavlink profile-link" exact>
                {email.replace(/"/g, "")}
                <span>
                  <i className="fa fa-chevron-down ml-3 arrow"></i>
                </span>
              </NavLink>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <NavLink to="/" className="Navlink dropdown-item my-2" onClick={unsetFlag.bind(this)} exact>
                Back to Site
              </NavLink>

              <NavLink to="/changepassword" className="Navlink dropdown-item my-2" onClick={unsetFlag.bind(this)} exact>
                Change Password
              </NavLink>

              <NavLink
                to="/logout"
                className="Navlink dropdown-item mb-1"
                exact
              >
                Logout
              </NavLink>
            </div>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    role: state.user.role,
    email: state.user.email,
    pageFlag: state.user.pageFlag
  };
};

const mapDispatchToProps = dispatch => {
  return {
    unsetPageFlag: () => dispatch(unsetPageFlag())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StickyTop);

// export default StickyTop;
