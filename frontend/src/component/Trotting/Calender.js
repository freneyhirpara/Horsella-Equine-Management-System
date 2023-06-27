import "./Calender.css";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { getRace, getRaceById, deleteRace } from "../../api/RaceApi";
import {
  getRaceRequest,
  getRaceSuccess,
  getRaceFailure,
  getRaceFailureById,
  getRaceSuccessById,
  getRaceRequestById,
  deleteRaceRequest,
  deleteRaceSuccess,
  getParticipateFailure,
  getParticipateRequest,
  getParticipateSuccess
} from "../../Redux/Admin/Trotting/RaceActions";
import { getHorse } from "../../Redux/User/UserActions";
import { getHorses, getParticipates } from "../../api/UserApi";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.min.css';

function Calender(
  props
) {

  async function GetRaceById(id) {
    getRaceRequestById();
    const res = await getRaceById(id, props.token);

    if(res.status != 200){
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
      history.push("/breeding")
    } else {
      props.getRaceSuccessById(res.data);
      props.history.push("/race/" + id);
    }
  }

  async function getParticipate(id) {
    props.getParticipateRequest();
    const res = await getParticipates(props.token, id);
    
    if(res.status != 200){
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
      history.push("/breeding")
    } else {
      props.getParticipateSuccess(res.data);
      props.history.push("/race/result/" + id);
    }
  }

  async function ParticipateUser(id) {
    getRaceRequestById();
    const res = await getRaceById(id, props.token);
    if(res.status != 200){
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
      history.push("/breeding")
    } else {
      props.getRaceSuccessById(res.data);
      const horseRes = await getHorses(props.token);
      if(horseRes.status != 200){
        const notify400 = () => toast.error("There is some error in your request. Please try again, if error persists submit your query through our query form.");
        const notify401 = () => toast.info(res.data.error.message);
        const notify500 = () => toast.error(res.data.error.message);
        horseRes.status == 400 ? notify400() : horseRes.status == 401 ? notify401() : notify500();
        history.push("/trotting");
      } else {
        props.getHorse(horseRes.data);
        props.history.push("/participate/race/" + id);
      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  const races = props.races.length == 0 ? null : props.races.map((r, index) => {
    const resultDisabled = (new Date(r.race_date).getTime() + 86400000) > new Date().getTime() ? true : false;
    const participateDisabled = (new Date(r.race_date).getTime() - 86400000) > new Date().getTime() ? true : false;
    return (
      <tr key={index}>
        <th scope="row">{index+1}</th>
        <td>{r.race_name}</td>
        <td>{r.race_course}</td>
        <td className="d-flex justify-content-center align-items-center date-col">{r.race_date.slice(0, 10)}</td>
        <td>{r.race_length}</td>
        <td>{r.racehorse_age_criteria}</td>
        <td>{r.racehorse_weight_criteria}</td>
        <td className="d-flex justify-content-between align-items-center flex-wrap action-col actions">
          <i className="fas fa-info-circle symbol ml-3 mr-1" title="Details" onClick={GetRaceById.bind(this, r.id)}></i>
          <i className={ participateDisabled ? "fas fa-money-check symbol mx-2" : "fas fa-money-check disabled mx-2" }  title="Participate" onClick={ participateDisabled ? ParticipateUser.bind(this, r.id) : null}></i>
          <i className={ !resultDisabled ?  "fas fa-poll symbol ml-1 mr-3" : "fas fa-poll ml-1 mr-3 disabled" } title="Results" onClick={ !resultDisabled ? getParticipate.bind(this, r.id) : null} ></i>
        </td>
      </tr>
    );
  });
  
  return (
    <>
      {props.token?
        <div className="content mt-5">
          <div className="loader">
            Loading ...
          </div>
          <h2 className="text-center w-100 mb-5">Races</h2>
          <table id="raceTable" className="table table-responsive table-hover pt-3 pb-2">
            <thead>
              <tr>
                <th scope="col" rowSpan="2">#</th>
                <th scope="col" rowSpan="2">Race Name</th>
                <th scope="col" rowSpan="2">Race Course</th>
                <th scope="col" className="date-col" rowSpan="2">Date</th>
                <th scope="col" rowSpan="2">Race Length</th>
                <th scope="col" colSpan="2">Criteria</th>
                <th scope="col" className="action-col actions" rowSpan="2">Actions</th>
              </tr>
              <tr>
                <th scope="col">Horse Age</th>
                <th scope="col">Horse Weight</th>
              </tr>
            </thead>

            <tbody>{races}</tbody>
          </table>
        </div> 
       : null}
    </>
  );
}

const mapStateToProps = state => {
  return {
    token: state.user.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRaceRequest: () => dispatch(getRaceRequest()),
    getRaceSuccess: data => dispatch(getRaceSuccess(data)),
    getRaceFailure: error => dispatch(getRaceFailure(error)),

    getRaceRequestById: () => dispatch(getRaceRequestById()),
    getRaceSuccessById: data => dispatch(getRaceSuccessById(data)),
    getRaceFailureById: error => dispatch(getRaceFailureById(error)),

    getHorse: horses => dispatch(getHorse(horses)),

    getParticipateRequest :  () => dispatch(getParticipateRequest()),
    getParticipateSuccess : data => dispatch(getParticipateSuccess(data)),
    getParticipateFailure : error => dispatch(getParticipateFailure(error))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Calender)
);
