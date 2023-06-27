import React, { useState, useEffect } from 'react'  
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./RaceDetails.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function RaceDetails({race}) {

  const [raceDetails, setRaceDetails] = useState(typeof race == 'string' ? {} : race);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (sessionStorage.getItem('raceDetails') != null) {
      let racingDetails = JSON.parse(sessionStorage.getItem('raceDetails'));
      setRaceDetails(racingDetails);
    } else {
      sessionStorage.setItem('raceDetails', JSON.stringify({
        race_name : raceDetails.race_name,
        race_course: raceDetails.race_course,
        race_date: raceDetails.race_date,
        race_length : raceDetails.race_length,
        racehorse_age_criteria: raceDetails.racehorse_age_criteria,
        racehorse_weight_criteria: raceDetails.racehorse_weight_criteria,
      }));
    }
  }, []);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem('raceDetails');
    };
  }, []);

    return (
      <div className="container w-75 details-container mb-lg-5 mb-xl-0">
        <div className="row">
          <h2 className="w-100 text-center mt-5">
            Race Details
          </h2>
        </div>
        <hr className="w-75"/>
        <div className="row mt-5">
          <div className="col-md-6 col-12 row">
            <div className="d-flex justify-content-end align-items-center col-6 py-3">
              Race Name:
            </div>
            <div className="d-flex justify-content-start align-items-center col-6 py-3">
              {raceDetails.race_name}
            </div>
            <div className="d-flex justify-content-end align-items-center col-6 py-3">
              Race Course:
            </div>
            <div className="d-flex justify-content-start align-items-center col-6 py-3">
              {raceDetails.race_course}
            </div>
            <div className="d-flex justify-content-end align-items-center col-6 py-3 mb-3">
              Date of Race:
            </div>
            <div className="d-flex justify-content-start align-items-center col-6 py-3 mb-3">
              {raceDetails.race_date ? raceDetails.race_date.slice(0, 10) : null}
            </div>
          </div>
          <div className="col-md-6 col-12 row">
            <div className="d-flex justify-content-end align-items-center col-6 py-3">
              Racetrack Length:
            </div>
            <div className="d-flex justify-content-start align-items-center col-6 py-3">
              {raceDetails.race_length} <span className="ml-2">m</span>
            </div>
            <div className="d-flex justify-content-end align-items-center col-6 py-3">
              Minimum Age:
            </div>
            <div className="d-flex justify-content-start align-items-center col-6 py-3">
              {raceDetails.racehorse_age_criteria} <span className="ml-2">years</span>
            </div>
            <div className="d-flex justify-content-end align-items-center col-6 py-3 mb-3">
              Minimum Weight:
            </div>
            <div className="d-flex justify-content-start align-items-center col-6 py-3 mb-3">
              {raceDetails.racehorse_weight_criteria} <span className="ml-2">Kg</span>
            </div>
          </div>
        </div>
      </div>
    )
}

const mapStateToProps = (state) => {
    return {
      token: state.user.token,
      race: state.racereducer.data
    };
  };
  
export default withRouter(connect(mapStateToProps, null)(RaceDetails));
