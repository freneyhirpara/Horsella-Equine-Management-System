import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { setClient, unsetClient, setToken } from "../../Redux/Index";
import FooterDashboard from "./Components/FooterDashboard/FooterDashboard";
import HeaderDashboard from "./Components/HeaderDashboard/HeaderDashboard";
import Main from "./Components/Main/Main";
import { setPageFlag, unsetPageFlag } from "../../Redux/User/UserActions";
import "./css/Dashboard.css";
import "./js/sb-admin-2.js";

function Dashboard({ setToken, token ,setPageFlag, unsetPageFlag, history}) {
  
  let userRole;

  useEffect(() => {
    const previousToken = sessionStorage.getItem("token");
    userRole = sessionStorage.getItem("role");
    const userEmail = sessionStorage.getItem("email");
    const userPageFlag = parseInt(sessionStorage.getItem("pageFlag"));
    if (previousToken) {
      setToken(previousToken, userRole, userEmail, userPageFlag);
    }

    if(token){
      setPageFlag();
    }
  }, [token]);

  useEffect(() => {
    setPageFlag();
  }, []);

  useEffect(() => {
    return (unsetPageFlag);
  }, []);

  useEffect(() => {
    (function ($) {
      "use strict"; // Start of use strict

      // Toggle the side navigation
      $("#sidebarToggle, #sidebarToggleTop").on("click", function (e) {
        $("body").toggleClass("sidebar-toggled");
        $(".sidebar").toggleClass("toggled");
        if ($(".sidebar").hasClass("toggled")) {
          $(".sidebar").collapse("hide");
        }
      });

      // Close any open menu accordions when window is resized below 768px
      $(window).resize(function () {
        if ($(window).width() < 768 && !$(".sidebar").hasClass("toggled")) {
          $("body").addClass("sidebar-toggled");
          $(".sidebar").addClass("toggled");
          $(".sidebar .collapse").collapse("hide");
        }

        // Toggle the side navigation when window is resized below 480px
        if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
          $("body").addClass("sidebar-toggled");
          $(".sidebar").addClass("toggled");
          $(".sidebar .collapse").collapse("hide");
        }
      });

      // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
      $("body.fixed-nav .sidebar").on(
        "mousewheel DOMMouseScroll wheel",
        function (e) {
          if ($(window).width() > 768) {
            var e0 = e.originalEvent,
              delta = e0.wheelDelta || -e0.detail;
            this.scrollTop += (delta < 0 ? 1 : -1) * 30;
            e.preventDefault();
          }
        }
      );

      // Scroll to top button appear

      // Smooth scrolling using jQuery easing
      $(document).on("click", "a.scroll-to-top", function (e) {
        var $anchor = $(this);
        $("html, body")
          .stop()
          .animate(
            {
              scrollTop: $($anchor.attr("href")).offset().top,
            },
            1000,
            "easeInOutExpo"
          );
        e.preventDefault();
      });
    })(jQuery); // End of use strict
  }, []);

  /* return token ? ( */
  return  <div id="page-top">
      <div id="wrapper">
        <HeaderDashboard />
        <div id="content-wrapper" className="d-flex flex-column">
          <Main />
          <FooterDashboard />
        </div>
      </div>
    </div>
  /*)  : <Redirect to="/login" /> */
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    email: state.user.email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageFlag: () => dispatch(setPageFlag()),
    unsetPageFlag: () => dispatch(unsetPageFlag()),
    setToken: (token, role, email) => dispatch(setToken(token, role, email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
