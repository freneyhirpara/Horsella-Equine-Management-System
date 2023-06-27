import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer id="footer" className="pb-3">
      <div className="footer-top px-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12 footer-contact text-left">
              <h3>Gateway Group</h3>
              <div>
                <a href="/contact-us">
                  B/81, Corporate House,
                  <br /> Judges Bunglow Rd, Bodakdev,
                  <br /> Ahmedabad, Gujarat 380054
                  <br /> India
                </a>
                <div className="mt-2">
                  <strong>Ph:</strong> <a href="tel:079 2685 2554" className="pl-2">079 2685 2554</a>
                </div>
                <div>
                  <strong>Email:</strong> <a href="mailto:gatewaygroupcorp@gmail.com" className="pl-2">gatewaygroupcorp@gmail.com</a>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-6 footer-links text-left">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <i className="fas fa-chevron-right pr-3"></i>
                  <a href="/about-us">About us</a>
                </li>
                <li>
                  <i className="fas fa-chevron-right pr-3"></i>
                  <a href="/contact-us">Contact Us</a>
                </li>
                <li>
                  <i className="fas fa-chevron-right pr-3"></i>
                  <a href="/login">Login</a>
                </li>
                <li>
                  <i className="fas fa-chevron-right pr-3"></i>
                  <a href="/about-us">Our Team</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-6 footer-links text-left">
              <h4>Our Services</h4>
              <ul>
                <li>
                  <i className="fas fa-chevron-right pr-3"></i>
                  <a href="/training">Horse Training</a>
                </li>
                <li>
                  <i className="fas fa-chevron-right pr-3"></i>
                  <a href="/breeding">Horse Breeding</a>
                </li>
                <li>
                  <i className="fas fa-chevron-right pr-3"></i>
                  <a href="/trotting">Horse Trotting</a>
                </li>
                <li>
                  <i className="fas fa-chevron-right pr-3"></i>
                  <a href="/ownership">Ownership</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container d-md-flex py-3">
        <div className="m-md-auto text-center text-md-center">
          <div className="copyright">
            &copy;&nbsp; Copyright Horsella. &nbsp;All Rights Reserved
          </div>
          <div className="credits">
            Designed by Team Horsella
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
