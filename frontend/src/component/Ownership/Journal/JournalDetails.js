import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.min.css';
import { withRouter } from 'react-router-dom';
import './Journal.css';

function JournalDetails({ data }) {
  const [eventDetails, setEventDetails] = useState(
    typeof data != 'string' ? data : null
  );
  useEffect(() => {
    window.scrollTo(0, 0);

    if (sessionStorage.getItem('eventDetails') != null) {
      let tempEventDetail = JSON.parse(
        sessionStorage.getItem('eventDetails')
      );
      setEventDetails(tempEventDetail);
    } else {
      sessionStorage.setItem(
        'eventDetails',
        JSON.stringify(eventDetails)
      );
    }
  }, []);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem('eventDetails');
    };
  }, []);

  return (
    <div className="container w-75 breedingStatic pb-5 mb-3 px-3">
      <h2 className="w-100 text-center mb-3 pt-5">Activity Details</h2>
      <hr />
      <div className="row">
        <div className="col-md-6 col-12 row h-max-content mt-3">
          <div className="col-lg-6 col-6 py-2 text-right">Title :</div>
          <div className="col-lg-6 col-6 py-2 text-left">
            {eventDetails ? eventDetails.title : null}
          </div>
          <div className="col-lg-6 col-6 py-2 text-right">Activity type :</div>
          <div className="col-lg-6 col-6 py-2 text-left">
            {eventDetails ? eventDetails.event_type : null}
          </div>
          <div className="col-lg-6 col-6 py-2 text-right">Horse :</div>
          <div className="col-lg-6 col-6 py-2 text-left">
            {eventDetails ? eventDetails.horse_name : null}
          </div>
          <div className="col-lg-6 col-6 py-2 text-right">Start Date :</div>
          <div className="col-lg-6 col-6 py-2 text-left">
            {eventDetails ? eventDetails.start_date.slice(0, 10) : null}
          </div>
          <div className="col-lg-6 col-6 py-2 text-right">End Date :</div>
          <div className="col-lg-6 col-6 py-2 text-left">
            {eventDetails ? eventDetails.end_date.slice(0, 10) : null}
          </div>
        </div>
        <div className="col-md-6 col-12 row mt-3 text-left">
          <p className="p-2">
            <span>Description: &nbsp;</span>
            <span className="pl-3 text-left desc">
              {eventDetails ? eventDetails.description : null}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.journalreducer.data,
  };
};

export default withRouter(
  connect(mapStateToProps, null)(JournalDetails)
);
