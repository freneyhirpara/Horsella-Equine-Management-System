import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom"
import "./Breeding.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { withRouter } from 'react-router-dom';


function BreedingCenterDetails({ breedingCenter }) {
  const [breedingDetails, setBreedingDetails] = useState(typeof breedingCenter !='string' ? breedingCenter : null );
  useEffect(() => {

    window.scrollTo(0, 0);

    if (sessionStorage.getItem('breedingCenterDetails') != null) {
      let breedingCenterDetail = JSON.parse(sessionStorage.getItem('breedingCenterDetails'));
      setBreedingDetails(breedingCenterDetail);
    } else {
      sessionStorage.setItem('breedingCenterDetails', JSON.stringify(breedingDetails));
    }
  }, []);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem('breedingCenterDetails');
    };
  }, []);

  return (
    <div className="container w-75 breedingStatic">
      <h2 className="w-100 text-center mb-3 pt-5">Breeding Center Details</h2>
      <hr />
      <div className="row">
        <div className="col-md-6 col-12 row h-max-content mt-3">
          <div className="col-lg-6 col-6 py-2 text-right">Center Name :</div>
          <div className="col-lg-6 col-6 py-2 text-left">{breedingDetails ? breedingDetails.center_name : null}</div>
          <div className="col-lg-6 col-6 py-2 text-right">Owner Name :</div>
          <div className="col-lg-6 col-6 py-2 text-left">{breedingDetails ? breedingDetails.owner_name : null}</div>
          <div className="col-lg-6 col-6 py-2 text-right">Experience :</div>
          <div className="col-lg-6 col-6 py-2 text-left">{breedingDetails ? breedingDetails.experience : null}</div>
          <div className="col-lg-6 col-6 py-2 text-right">Working Hrs :</div>
          <div className="col-lg-6 col-6 py-2 text-left">{breedingDetails ? breedingDetails.working_hours : null}</div>
        </div>
        <div className="col-md-6 col-12 row mt-3 text-left">
          <p className="p-2">
            <span>Description: &nbsp;</span>
            <span className="pl-3 text-left desc">{breedingDetails ? breedingDetails.description : null}</span>
          </p>
        </div>
        <div className="col-12 row mb-5 mt-4 text-md-center text-left center-social">
          <a href="#" className="col-lg-3 col-6 p-2">
            <span><i className="fa fa-phone mr-3"></i></span>
            <span>{breedingDetails ? breedingDetails.contact : null}</span>
          </a>
          <a href="#" className="col-lg-3  col-6 p-2">
            <span><i className="fas fa-envelope mr-3"></i></span>
            <span className="text-break-all">{breedingDetails ? breedingDetails.email : null}</span>
          </a>
          <a href="#" className="col-lg-3 col-6 p-2">
            <span><i className="fas fa-map-marker-alt mr-3"></i></span>
            <span>
              {breedingDetails ? breedingDetails.address : null}
            </span>
          </a>
          <a href="#" className="col-lg-3 col-6 p-2">
            <span><i className="fas fa-external-link-alt mr-3"></i></span>
            <span>{breedingDetails ? breedingDetails.website : null}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    breedingCenter: state.breedingreducer.data,
  };
};

export default withRouter(connect(mapStateToProps, null)(BreedingCenterDetails));
