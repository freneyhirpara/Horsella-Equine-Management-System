import React,{useState, useEffect} from 'react'
import  './ContactUs.css';
import { connect } from "react-redux";
import {postContactRequest,postContactSuccess, postContactFailure} from "../../Redux/Contact/ContactActions"
import {postContact} from "../../api/ContactApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const ContactUs = ({postContactRequest,postContactSuccess, postContactFailure,history}) => {


    const [userName,setUserName] = useState();
    const [email,setEmail] = useState();
    const [subject,setSubject] = useState();
    const [message,setMessage] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        document.getElementById("submit-button").setAttribute("disabled", "disabled");
        document.getElementById("submit-button").innerHTML = "Sending ...";

        postContactRequest();
        const res = await postContact(
          {
            userName:userName,
            email:email,
            subject:subject,
            message:message
          }
        );
        if(res.status != 201){
          const notify400 = () => toast.error("There is some error in your request. Please try again, if error persists submit your query through our query form.");
          const notify401 = () => toast.info(res.data.error.message);
          const notify500 = () => toast.error(res.data.error.message);
          res.status == 400 ? notify400() : res.status == 401 ? notify401() : notify500();
          postContactFailure(res.data);
          history.push("/contact-us");
        } else {
          postContactSuccess(res.data);
          const notify201 = () => toast.success("Query submitted successfully");
          notify201();
          // history.push('/');
          document.getElementById('contact-form').reset();
        }
        document.getElementById("submit-button").removeAttribute("disabled");
        document.getElementById("submit-button").innerHTML = "Send Message";
        
      };

      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

  return (
    <div className="con">
      <main id="main" className="mb-5">
        <section id="breadcrumbs" className="breadcrumbs">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center"></div>
          </div>
        </section>
        <div className="map-section">
          <iframe
            className="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.597839130263!2d72.51057131496803!3d23.038533884945007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9cc0f98b79bb%3A0x93964e2d29f45f40!2sGateway%20Group%20-%20Software%20Engineering%20Services%20%26%20Solutions!5e0!3m2!1sen!2sin!4v1613033667464!5m2!1sen!2sin"
          ></iframe>
        </div>

        <section id="contact" className="contact mt-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="info-wrap">
                  <div className="row">
                    <a href="/contact-us" className="col-lg-4 info info-card">
                      <div className="d-flex justify-content-center align-items-center mb-3">
                        <i className="fa fa-map-marker-alt"></i>
                      </div>
                      <div>
                        <h4 className="w-100 text-center">Location:</h4>
                        <span className="w-100 text-left">
                            B/81, Corporate House,
                            <br /> Judges Bunglow Rd, Bodakdev,
                            <br /> Ahmedabad, Gujarat 380054
                        </span>
                      </div>
                    </a>

                    <a href="mailto:support@horsella.com" className="col-lg-4 info info-card mt-4 mt-lg-0">
                      <div className="d-flex justify-content-center align-items-center mb-3">
                        <i className="fa fa-envelope"></i>
                      </div>
                      <div>
                        <h4 className="w-100 text-center">Email:</h4>
                        <span className="w-100 text-center">support@horsella.com</span>
                      </div>
                    </a>

                    <a href="tel:+91 79 2685 2554" className="col-lg-4 info info-card mt-4 mt-lg-0">
                      <div className="d-flex justify-content-center align-items-center mb-3">
                        <i className="fa fa-phone"></i>
                      </div>
                      <div>
                        <h4 className="w-100 text-center">Call:</h4>
                        <span className="w-100 text-center">+91 79 2685 2554</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-5 justify-content-center">
              <div className="col-lg-10">
                <form className="php-email-form" id="contact-form" onSubmit={handleSubmit} >
                  <div className="form-row">
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                        required
                        minLength="3"
			onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Your Email"
                        required
			onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      id="subject"
                      placeholder="Subject"
                      required
                      minLength="10"
			onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      name="message"
                      rows="5"
                      required
                      minLength="20"
                      placeholder="Message"
			onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button type="submit" id="submit-button">Send Message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
    return {
      postContactRequest: () => dispatch(postContactRequest()),
      postContactSuccess: (data) => dispatch(postContactSuccess(data)),
      postContactFailure: (error) => dispatch(postContactFailure(error)),
  
     
    };
  };
  
  
  
  
  export default connect(null,mapDispatchToProps)(ContactUs)