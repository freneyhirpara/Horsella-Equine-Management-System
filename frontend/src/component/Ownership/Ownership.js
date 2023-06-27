import React, { useEffect } from "react";
import {connect} from "react-redux";
import imageName from "../../assets/img/ownership_small-min.png";
import "./Ownership.css";
import content from "../../Content";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.min.css';
  
const Ownership = ({ token }) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      <main id="main" className="mb-5">
        <section id="ownershipStatic" className="ownershipStatic">
          <div className="img-container">
            <div className="ownership-vignette"></div>
            <img src={imageName} className="imageOwnership" />
            <div className="ownership-heading">Ownership</div>
          </div>
          <div className="container  w-75 mx-auto mt-5">
              <div className="row">
                <div className="col-lg-12 text-left">
                  <h3 className="text-center">How to find the horse </h3>
                  <p>
                    {content.OWNERSHIP_PARA_1}
                  </p>
                  <h3 className="text-center mt-5">Advisor recommended</h3>
                  <p>
                    {content.OWNERSHIP_PARA_2}
                  </p>
                </div>
              </div>
              {!token ? <p className="text-left mt-4">To manage your horses <a href="/login" className="login font-weight-bold">log in</a> to our website.</p> : null}
          </div>
        </section>
      </main>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    token: state.user.token,
  }
}
export default connect(mapStateToProps,null)(Ownership);
