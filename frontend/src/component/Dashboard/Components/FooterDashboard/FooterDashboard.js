import React from "react";

import "./FooterDashboard.css";

function FooterDashboard() {
  return (
    <footer className="sticky-footer bg-white">
      <div className="container d-md-flex">
        <div className="m-md-auto text-center text-md-center">
          <div className="copyright">
            &copy; Copyright &nbsp;
            <strong>
              <span>Horsella</span>
            </strong>
            . All Rights Reserved
          </div>
          <div className="credits">
            Designed by <a>Team Horsella</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterDashboard;
