import React, { useEffect } from "react";
import "./AboutUs.css";
import content from "../../Content";
import imageName from "../../assets/img/horse2-min.jpg";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="ab">
      <main id="main" className="mb-5">
        <section id="about-us" className="about-us">
          <div className="img-container">
            <div className="about-vignette"></div>
            <img src={imageName} className="imageAboutUs" />
            <div className="about-heading">About Us</div>
          </div>
          <div className="about-container w-75 m-auto pt-5">
            <div className="row content">
              <div className="row">
                <div className="col-lg-12 pt-4 pt-lg-0 text-left">
                  <p>{content.ABOUT_US_PARA_1}</p>
                  <ul>
                    <li>
                      <i className="fa fa-check-double"></i>
                      {content.ABOUT_US_POINT_1}
                    </li>
                    <li>
                      <i className="fas fa-check-double"></i>
                      {content.ABOUT_US_POINT_2}
                    </li>
                    <li>
                      <i className="fas fa-check-double"></i>{" "}
                      {content.ABOUT_US_POINT_3}
                    </li>
                  </ul>
                  <p>{content.ABOUT_US_PARA_2}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
export default AboutUs;
