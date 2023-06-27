import React from "react";
import { Route, NavLink } from "react-router-dom";

import "./HeaderDashboard.css";

function HeaderDashboard() {
  return (
    <ul
      className="navbar-nav sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <div className="navbar-container">

        <a href="/dashboard" className="sidebar-brand d-flex align-items-center justify-content-center">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-horse-head"></i>
          </div>
          <div className="sidebar-brand-text mx-3">Horsella</div>
        </a>

        <hr className="sidebar-divider my-0" />

        

        <hr className="sidebar-divider my-0" />

        <li className="nav-item">
          <NavLink activeStyle={{ color: '#fff' }} to="/dashboard/users" className="nav-link Navlink" exact>
          <i className="fab fa-wpforms fontawesome"></i>
            <span className="names">Users</span>
          </NavLink>
        </li>

        <hr className="sidebar-divider my-0" />

        

        <hr className="sidebar-divider my-0" />

        <li className="nav-item">
          <NavLink activeStyle={{ color: '#fff' }} to="/dashboard/training" className="nav-link Navlink" exact>
            <i className="fas fa-fw fa-tachometer-alt fontawesome"></i>
            <span className="names">Training</span>
          </NavLink>
        </li>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item">
          <NavLink activeStyle={{ color: '#fff' }} to="/dashboard/breeding" className="nav-link Navlink" exact>
          <i className="fas fa-warehouse fontawesome"></i>
            <span className="names">Breeding</span>
          </NavLink>
        </li>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item">
          <NavLink activeStyle={{ color: '#fff' }} to="/dashboard/races" className="nav-link Navlink" exact>
          <i className="fas fa-flag-checkered fontawesome"></i>
            <span className="names">Races</span>
          </NavLink>
        </li>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item">
          <NavLink activeStyle={{ color: '#fff' }} to="/dashboard/queries" className="nav-link Navlink" exact>
            <i className="fas fa-envelope fontawesome"></i>
            <span className="names">Queries</span>
          </NavLink>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />

        <div className="text-center d-none d-md-inline">
          <button className="fas fa-circle-left border-0" id="sidebarToggle"></button>
        </div>
      </div>
    </ul>
  );
}

export default HeaderDashboard;
