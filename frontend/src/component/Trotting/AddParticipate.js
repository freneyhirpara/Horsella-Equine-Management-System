import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  POST_PARTICIPATE_SUCCESS,
  POST_PARTICIPATE_FAILURE,
  POST_PARTICIPATE_REQUEST
} from "../../Redux/Admin/Trotting/RaceActionTypes";
import { postParticipateFailure, postParticipateRequest, postParticipateSuccess } from "../../Redux/Admin/Trotting/RaceActions";
import { postParticipate } from "../../api/UserApi";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.min.css';
import { setClient, unsetClient, setToken } from "../../Redux/Index";
import { withRouter } from 'react-router-dom';

function AddParticipate({
  postParticipateRequest,
  postParticipateSuccess,
  postParticipateFailure,
  token,
  email,
  data,
  horse,
  match,
  history
}) {

  let previousToken;
  const [horseId, sethorseId] = useState();
  const [horses, setHorses] = useState(horse ? horse : null);
  const [riderName, setRiderName] = useState();
  const [raceId, setId] = useState(match.params.id ? match.params.id : null);
  const [raceName, setRaceName] = useState(data ? data.race_name : null);
  const [raceCourse, setRaceCourse] = useState(data ? data.race_course : null);
  const [raceDate, setRaceDate] = useState(data ? data.race_date : null);
  const [raceLength, setRaceLength] = useState(data ? data.race_length : null);
  const [raceAgeCriteria, setRaceAgeCriteria] = useState(data ? data.racehorse_age_criteria : null);
  const [raceWeightCriteria, setRaceWeightCriteria] = useState(data ? data.racehorse_weight_criteria : null);

  useEffect(async () => {

    let previousToken = sessionStorage.getItem("token");
    const userRole = sessionStorage.getItem("role");
    const userEmail = sessionStorage.getItem("email");
    const userPageFlag = parseInt(sessionStorage.getItem("pageFlag"));
    if (previousToken) {
      await setToken(previousToken, userRole, userEmail, userPageFlag);
    }

    window.scrollTo(0, 0);
    $(document).ready(function(e) {
      $('.selectpicker').selectpicker();
    })

    if (sessionStorage.getItem('participateDetails') != null) {
      let raceDetails = JSON.parse(sessionStorage.getItem('participateDetails'));
      setId(parseInt(raceDetails.id));
      setRaceName(raceDetails.raceName);
      setRaceCourse(raceDetails.raceCourse);
      setRaceDate(raceDetails.raceDate);
      setRaceAgeCriteria(raceDetails.raceHorseAgeCriteria);
      setRaceWeightCriteria(raceDetails.raceHorseWeightCriteria);
      setHorses(raceDetails.horses);
      setRaceLength(raceDetails.raceLength);
    } else {
      sessionStorage.setItem('participateDetails', JSON.stringify({
        id: match.params.id,
        raceName : raceName,
        raceCourse: raceCourse,
        raceDate: raceDate,
        raceLength : raceLength,
        raceHorseAgeCriteria: raceAgeCriteria,
        raceHorseWeightCriteria: raceWeightCriteria,
        horses: horses
      }));
    }
  
  }, []);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem('participateDetails');
    };
  }, []);

  const horseList = horses ? horses.map(h => {
    return <option key={h.id} value={h.id}>{h.horse_name}</option>;
  }) : null;

  const handleSubmit = async e => {
    e.preventDefault();
    const horseInput = document.querySelector('#HorseList');
    if (horseInput.value == -1) {
      toast.warning('Please select at least one Horse.');
    } else {
      document.getElementById('submit-button').innerHTML = 'Just a minute ...'
      document.getElementById('submit-button').setAttribute('disabled', 'disabled');  

      const res = await postParticipate({
        horseId: horseId,
        riderName: riderName,
      }, token || previousToken, raceId);

      document.getElementById('submit-button').innerHTML = 'Participate'
      document.getElementById('submit-button').removeAttribute('disabled');
    
      if(res.status != 201){
        // const notify400 = () => toast.error("There is some error in your request. Please try again, if error persists submit your query through our query form.");
        const notify401 = () => toast.info(res.data.error.message);
        const notify500 = () => toast.error(res.data.error.message);
        const notify999 = () => toast.error("Sorry but we are unable to process your request. Please contact our Administrator.");
        /* res.status == 400 ? notify400() :  */
        res.status == 401 ? notify401() : null;
        res.status == 500 ? notify500() : null;
        res.status == 999 ? notify999() : null;
        if(res.status == 400) {
          toast.error(res.data.error.message);
        }
        postParticipateFailure(res.data);
        history.push("/trotting");
      } else {
        const notify201 = () => toast.success("Registration successful");
        notify201();
        postParticipateSuccess(res.data);
        history.push('/trotting');
      }
    }
  };

  return (
    <div>
      <main id="main" className="mb-5">
        <section id="racingStatic" className="trainingStatic">
          <h2 className="text-center w-100 mt-5 pb-3">Participate in Race</h2>
          <div className="container w-75 m-auto px-4 pt-3">
              <div className="row">
                <div className="col-lg-12 pt-4 pt-lg-0">
                  <div>
                    <form className="row g-3" onSubmit={handleSubmit}>

                      <div className="col-lg-6 col-md-6 pt-3 px-lg-5 px-md-3">
                        <label htmlFor="MiddleName" className="form-label">
                          Race Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="MiddleName"
                          value={raceName}
                          onChange={e => setRaceName(e.target.value)}
                          disabled
                        />
                      </div>

                      <div className="col-lg-6 col-md-6 pt-3 px-lg-5 px-md-3">
                        <label htmlFor="FirstName" className="form-label">
                          Rider Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="FirstName"
                          value={riderName}
                          required
                          onChange={e => setRiderName(e.target.value)}
                        />
                      </div>

                      <div className="col-lg-6 col-md-6 pt-3 px-lg-5 px-md-3">
                        <label htmlFor="MiddleName" className="form-label">
                          Race Course
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="MiddleName"
                          value={raceCourse}
                          onChange={e => setRaceCourse(e.target.value)}
                          disabled
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 pt-3 px-lg-5 px-md-3">
                        <label htmlFor="FirstName" className="form-label">
                          Race Date
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="FirstName"
                          value={raceDate ? raceDate.slice(0, 10) : null}
                          onChange={e => setRaceDate(raceDate)}
                          disabled
                        />
                      </div>

                      <div className="col-lg-6 col-md-6 pt-3 px-lg-5 px-md-3">
                        <label htmlFor="MiddleName" className="form-label">
                          Race Length
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="MiddleName"
                          value={raceLength}
                          onChange={e => setRaceLength(e.target.value)}
                          disabled
                        />
                      </div>

                      <div className="col-lg-6 col-md-6 pt-3 px-lg-5 px-md-3">
                        <label htmlFor="FirstName" className="form-label">
                          Race Age Criteria
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="FirstName"
                          value={raceAgeCriteria}
                          onChange={e => setraceAgeCriteria(e.target.value)}
                          disabled
                        />
                      </div>

                      <div className="col-lg-6 col-md-6 pt-3 px-lg-5 px-md-3">
                        <label htmlFor="MiddleName" className="form-label">
                          Race Weight Criteria
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="MiddleName"
                          value={raceWeightCriteria}
                          onChange={e => setRaceWeightCriteria(e.target.value)}
                          disabled
                        />
                      </div>

                      <div className="col-md-6 pt-3 px-lg-5 px-md-3 select">
                        <label htmlFor="HorseList" className="form-label">
                          Horse Name
                        </label>
                        <div>
                          <select
                            className="form-select selectpicker f w-100"
                            id="HorseList"
                            onChange = {e => sethorseId(e.target.value)}
                            defaultValue="-1"
                            min="1"
                            required
                          >
                            <option value="-1" hidden disabled onClick={(e) => e.preventDefault()}>-- Select a Horse --</option>
                            {horseList}
                          </select>
                        </div>
                      </div>

                      <div className="col-12 mt-5">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            required
                            id="gridCheck"
                          />
                          <label className="form-check-label" htmlFor="gridCheck">
                            By clicking submit you agree to our Privacy Policy
                            and Terms and Conditions
                          </label>
                        </div>
                      </div>
                      <div className="col-12 mt-5">
                        <button type="submit" id="submit-button" className="btn btn-primary">
                          Participate
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    email: state.user.email,
    horse: state.user.horses,
    data: state.racereducer.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postParticipateRequest: () => dispatch(postParticipateRequest()),
    postParticipateSuccess: data => dispatch(postParticipateSuccess(data)),
    postParticipateFailure: error => dispatch(postParticipateFailure(error)),
    setToken: (token, role, email) => dispatch(setToken(token, role, email)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddParticipate));
