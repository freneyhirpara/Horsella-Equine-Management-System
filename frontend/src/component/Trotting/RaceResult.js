import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./Calender.css";
import "./RaceResult.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { withRouter } from 'react-router-dom';


function RaceResult({ data }) {
  
  const [riders, setRider] = useState(typeof data != 'string' ? data : null);
  useEffect(() => {
    window.scrollTo(0, 0);

    if (sessionStorage.getItem('raceResults') != null) {
      let raceResults = JSON.parse(sessionStorage.getItem('raceResults'));
      setRider(raceResults.riders);
    } else {
      sessionStorage.setItem('raceResults', JSON.stringify({
        riders: data,
      }));
    }
  }, []);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem('raceResults');
    };
  }, []);

  return (
    <div className="trainingStatic">
      <h2 className="w-100 text-center mt-5 mb-3">Results</h2>
      <div className="container w-75 mt-3 px-4 pb-5">
        <div className="row">
          <h4 className="col-6 py-2">Participants</h4>
          <h4 className="col-6 py-2">Position</h4>
        </div>
        <hr />
        <div className="row">
          { !riders || riders.length == 0 ? <div className="col-12">No Participants</div> : 
          <>
            <div className="col-6">
              <div>
                {riders.map((p, index) => {
                  return <><div key={index} className="py-1">{p.rider_name.trim()}</div><hr /></>;
                })}
              </div>
            </div>
            <div className="col-6">
              <div>
                {riders.map((p, index) => {
                  return <><div key={index} className="py-1">{index+1}</div><hr /></>;
                })}
              </div>
            </div>
          </> }
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    data: state.racereducer.participates
  };
};

export default withRouter(connect(mapStateToProps, null)(RaceResult));
