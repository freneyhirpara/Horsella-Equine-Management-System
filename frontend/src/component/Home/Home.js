import React, { useEffect } from "react";
import welcomeImage from "../../assets/img/breeding_2-min.png";
import news1 from "../../assets/img/news1-min.jpg";
import news2 from "../../assets/img/news2-min.jpg";
import news3 from "../../assets/img/news3-min.jpg";
import welfare from "../../assets/img/animal-min.png";
import training from "../../assets/img/equestrian-min.png";
import trotting from "../../assets/img/trotting-icon-min.png";
import breeding from "../../assets/img/horse-icon-min.png";
import ownership from "../../assets/img/veterinarian-min.png";
import racing from "../../assets/img/race-horse-min.png";

import content from "../../Content";

import "./Home.css";

function Home() {

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 600,
    });
  }, []);
  
  return (
    <div id="home" className="own">
      <section id="hero">
        <div
          id="heroCarousel"
          className="carousel slide carousel-fade"
          data-ride="carousel"
        >
          <div className="carousel-inner" role="listbox">
            <div className="carousel-item item1 active">
              <div className="carousel-container">
                <div className="carousel-content animate__animated animate__fadeInUp">
                  <h2>
                    Welcome to <span>Horsella</span>
                  </h2>
                  <p className="carousel-para">{content.WELCOME_HOME}</p>
                  <div className="text-center">
                    <a href="/about-us" className="btn-get-started">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="carousel-item item2">
              <div className="carousel-container">
                <div className="carousel-content animate__animated animate__fadeInUp">
                  <h2>Horse Training</h2>
                  <p className="carousel-para">{content.WELCOME_TRAINING}</p>
                  <div className="text-center">
                    <a href="/training" className="btn-get-started">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="carousel-item item3">
              <div className="carousel-container ">
                <div className="carousel-content animate__animated animate__fadeInUp ">
                  <h2>Horse Breeding</h2>
                  <p className="carousel-para">{content.WELCOME_BREEDING}</p>
                  <div className="text-center">
                    <a href="/breeding" className="btn-get-started">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a
            className="carousel-control-prev"
            href="#heroCarousel"
            role="button"
            data-slide="prev"
          >
            <div className="carousel-control-prev-icon">
              <i className="fas fa-chevron-left"></i>
            </div>
            <span className="sr-only">Previous</span>
          </a>

          <a
            className="carousel-control-next"
            href="#heroCarousel"
            role="button"
            data-slide="next"
          >
            <div className="carousel-control-next-icon">
              <i className="fas fa-chevron-right"></i>
            </div>
            <span className="sr-only">Next</span>
          </a>

          <ol
            className="carousel-indicators"
            id="hero-carousel-indicators"
          ></ol>
        </div>
      </section>

      <main id="main">
        <section id="about-us" className="about-us p-5">
          <div className="container" data-aos="fade-up">
            <div className="section-title mt-3 mb-4">
              <h1>
                <strong>About Us</strong>
              </h1>
            </div>

            <div className="row content">
              <div className="col-lg-6" data-aos="fade-right">
                <h2>We Are Horsella</h2>
                <h3 className="px-5 lh-1">
                  Providing horse management solutions for you
                </h3>
              </div>
              <div
                className="col-lg-6 pt-4 pt-lg-0 text-left"
                data-aos="fade-left"
              >
                <p>{content.ABOUT_US_PARA_1}</p>
                <ul>
                  <li>
                    <i className="fa fa-check-double"></i>
                    {content.ABOUT_US_POINT_1}
                  </li>
                  <li>
                    <i className="fa fa-check-double"></i>{' '}
                    {content.ABOUT_US_POINT_2}
                  </li>
                  <li>
                    <i className="fa fa-check-double"></i>
                    {content.ABOUT_US_POINT_3}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="news" data-aos="fade-up" className="p-5">
          <div className="row d-flex justify-content-center align-items-center section-title">
            <h1>
              <strong>News</strong>
            </h1>
          </div>

          <div className="container row d-flex justify-content-center">
            <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center p-3">
              <div
                className="card news-card"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <img
                  className="card-img-top"
                  src={news1}
                  alt="Card image cap"
                />
                <div className="card-body d-flex flex-column justify-content-around ">
                  <h5 className="card-title">
                    Don’t Forget Your Mask and Social Distancing at the Barn
                  </h5>
                  <p className="card-text">
                    As a traditionally outdoor sport, horseback riding might
                    seem like one situation where you wouldn’t need to wear a
                    mask or stress over social distancing to prevent the spread
                    of COVID-19.
                  </p>
                  <div className="d-flex justify-content-end align-items-center">
                    <a
                      target="__blank"
                      rel="noopener noreferrer"
                      href="https://thehorse.com/197299/dont-forget-your-mask-and-social-distancing-at-the-barn/"
                      className="btn btn-primary"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center p-3">
              <div
                className="card news-card"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <img
                  className="card-img-top"
                  src={news2}
                  alt="Card image cap"
                />
                <div className="card-body d-flex flex-column justify-content-around ">
                  <h5 className="card-title">
                    Thoracolumbar Pain in Horses: It’s Complicated
                  </h5>
                  <p className="card-text">
                    Back and Spine, Diagnosing Lameness, Diagnostics and
                    Technology, Horse Care, Lameness, Sports Medicine Learn to
                    recognize the signs of equine back pain and what therapies
                    are available.
                  </p>
                  <div className="d-flex justify-content-end align-items-center">
                    <a
                      target="__blank"
                      rel="noopener noreferrer"
                      href="https://thehorse.com/185297/thoracolumbar-pain-in-horses-its-complicated/"
                      className="btn btn-primary"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center p-3">
              <div
                className="card news-card"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <img
                  className="card-img-top"
                  src={news3}
                  alt="Card image cap"
                />
                <div className="card-body d-flex flex-column justify-content-around ">
                  <h5 className="card-title">
                    A Grumpy Horse in the Stall Is Probably Grumpy When Ridden
                  </h5>
                  <p className="card-text">
                    “Our study has shown that there’s a relationship between
                    poor welfare in a stall and the expression of behaviors,
                    postures, and particular way of moving when the horses are
                    being ridden”
                  </p>
                  <div className="d-flex justify-content-end align-items-center">
                    <a
                      target="__blank"
                      rel="noopener noreferrer"
                      href="https://thehorse.com/197128/a-grumpy-horse-in-the-stall-is-probably-grumpy-when-ridden/"
                      className="btn btn-primary"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="services section-bg p-5">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h1>
                <strong>Services</strong>
              </h1>
              <p>
                Horsella helps you in managing your horse and stable
                efficiently.
              </p>
            </div>
            <div className="row px-4">
              <div className="col-lg-4 col-md-6 p-3">
                <div
                  className="service-card"
                  data-aos="zoom-in"
                  data-aos-delay="100"
                >
                  <a href="/training">
                    <div className="icon-box iconbox-blue">
                      <div className="icon">
                        <img src={training} width="80" height="80" />
                      </div>
                      <h4>
                        <span>Training</span>
                      </h4>
                      <p>
                        Horse training refers to a variety of practices that
                        teach horses to perform certain behaviors when commanded
                        to do so by humans
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 p-3">
                <div
                  className="service-card"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                >
                  <a href="/breeding">
                    <div className="icon-box iconbox-orange ">
                      <div className="icon">
                        <img src={breeding} width="80" height="80" />
                      </div>
                      <h4>
                        <span>Breeding</span>
                      </h4>
                      <p>
                        Modern breeding management and technologies increase the
                        rate of conception, a healthy pregnancy, and successful
                        foaling.
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 p-3">
                <div
                  className="service-card"
                  data-aos="zoom-in"
                  data-aos-delay="300"
                >
                  <a href="/trotting">
                    <div className="icon-box iconbox-pink">
                      <div className="icon">
                        <img src={trotting} width="95" height="75" />
                      </div>
                      <h4>
                        <span>Trotting</span>
                      </h4>
                      <p>
                        The trot is a very stable gait and does not require the
                        horse to make major balancing motions with its head and
                        neck.
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 p-3">
                <div
                  className="service-card"
                  data-aos="zoom-in"
                  data-aos-delay="100"
                >
                  <a href="/ownership">
                    <div className="icon-box iconbox-yellow">
                      <div className="icon">
                        <img src={ownership} width="80" height="80" />
                      </div>
                      <h4>
                        <span>Ownership</span>
                      </h4>
                      <p>
                        Responses to a horse-ownership survey from the
                        University of Maine found that the average annual cost
                        of horse ownership is $3,876 per horse
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 p-3">
                <div
                  className="service-card"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                >
                  <a href="/ownership">
                    <div className="icon-box iconbox-red">
                      <div className="icon">
                        <img src={welfare} width="80" height="80" />
                      </div>
                      <h4>
                        <span>Welfare</span>
                      </h4>
                      <p>
                        Equine welfare helps describe the acceptable conditions
                        of life and use for domesticated horses
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 p-3">
                <div
                  className="service-card"
                  data-aos="zoom-in"
                  data-aos-delay="300"
                >
                  <a href="/trotting">
                    <div className="icon-box iconbox-teal">
                      <div className="icon">
                        <img src={racing} width="80" height="80" />
                      </div>
                      <h4>
                        <span>Racing</span>
                      </h4>
                      <p>
                        Horse racing is an equestrian performance sport,
                        typically involving two or more horses ridden by jockeys
                        over a set distance, for competition.
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
