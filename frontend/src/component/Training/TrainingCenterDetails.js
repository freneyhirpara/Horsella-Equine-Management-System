import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./Training.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { withRouter } from 'react-router-dom';


function TrainingCenterDetails({ trainingCenter }) {

  const [refreshedTrainingCenter, setRefreshedTrainingCenter] = useState(typeof trainingCenter == "string" ? {} : trainingCenter);

  useEffect(() => {
    window.scrollTo(0, 0);
    if(typeof trainingCenter != 'string'){
      sessionStorage.removeItem('trainingDetail');
    }
    if (sessionStorage.getItem('trainingDetail') != null) {
      let trainingCenterDetail = JSON.parse(sessionStorage.getItem('trainingDetail'));
      setRefreshedTrainingCenter(trainingCenterDetail);
    } else {
      sessionStorage.setItem('trainingDetail', JSON.stringify(refreshedTrainingCenter));
    }
  }, []);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem('trainingDetail');
    };
  }, []);

  return (
    <div className="container w-75 trainingStatic">
      <h2 className="w-100 text-center mb-3 pt-5">Training Center Details</h2>
      <hr />
      <div className="row">
        <div className="col-md-6 col-12 row h-max-content mt-3">
          <div className="col-lg-6 col-6 py-2 text-right">Center Name :</div>
          <div className="col-lg-6 col-6 py-2 text-left">{refreshedTrainingCenter ? refreshedTrainingCenter.center_name : null}</div>
          <div className="col-lg-6 col-6 py-2 text-right">Owner Name :</div>
          <div className="col-lg-6 col-6 py-2 text-left">{refreshedTrainingCenter ? refreshedTrainingCenter.owner_name : null}</div>
          <div className="col-lg-6 col-6 py-2 text-right">Experience :</div>
          <div className="col-lg-6 col-6 py-2 text-left">{refreshedTrainingCenter ? refreshedTrainingCenter.experience : null}</div>
          <div className="col-lg-6 col-6 py-2 text-right">Working Hrs :</div>
          <div className="col-lg-6 col-6 py-2 text-left">{refreshedTrainingCenter ? refreshedTrainingCenter.working_hours : null}</div>
        </div>
        <div className="col-md-6 col-12 row mt-3 text-left">
          <p className="p-2">
            <span>Description: &nbsp;</span>
            <span className="pl-3 text-left desc">{refreshedTrainingCenter ? refreshedTrainingCenter.description : null}</span>
          </p>
        </div>
        <div className="col-12 row mb-5 mt-4 text-md-center text-left center-social">
          <a href="#" className="col-lg-3 col-6 p-2">
            <span><i className="fa fa-phone mr-3"></i></span>
            <span>{refreshedTrainingCenter ? refreshedTrainingCenter.contact : null}</span>
          </a>
          <a href="#" className="col-lg-3 col-6 p-2">
            <span><i className="fas fa-envelope mr-3"></i></span>
            <span className="text-break-all">{refreshedTrainingCenter ? refreshedTrainingCenter.email : null}</span>
          </a>
          <a href="#" className="col-lg-3 col-6 p-2">
            <span><i className="fas fa-map-marker-alt mr-3"></i></span>
            <span>
              {refreshedTrainingCenter ? refreshedTrainingCenter.address : null}
            </span>
          </a>
          <a href="#" className="col-lg-3 col-6 p-2">
            <span><i className="fas fa-external-link-alt mr-3"></i></span>
            <span>{refreshedTrainingCenter ? refreshedTrainingCenter.website : null}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    trainingCenter: state.trainingreducer.data,
  };
};

export default withRouter(connect(mapStateToProps, null)(TrainingCenterDetails));
