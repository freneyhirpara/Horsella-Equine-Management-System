import React, { useState, useEffect } from "react";
import "../../css/table.css";
import "../../css/loader.css";
import { connect } from "react-redux";
import { getRace, getRaceById, deleteRace } from "../../../../api/RaceApi";
import {
  getRaceRequest,
  getRaceSuccess,
  getRaceFailure,
  getRaceFailureById,
  getRaceSuccessById,
  getRaceRequestById,
  deleteRaceRequest,
  deleteRaceSuccess,
} from "../../../../Redux/Admin/Trotting/RaceActions";
import AddRaces from "./AddRaces";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.min.css';

  import { setClient, unsetClient, setToken } from "../../../../Redux/Index";

function Races({token,
  history,
  getRaceFailure,
  getRaceRequest,
  getRaceSuccess,
  getRaceFailureById,
  getRaceSuccessById,
  getRaceRequestById,
  deleteRaceRequest,
  deleteRaceSuccess,
}) {
  const [records, setRecords] = useState({
    data: [],
  });
  useEffect(async() => {

    const previousToken = sessionStorage.getItem("token");
    const userRole = sessionStorage.getItem("role");
    const userEmail = sessionStorage.getItem("email");
    const userPageFlag = parseInt(sessionStorage.getItem("pageFlag"));
    if (previousToken) {
      await setToken(previousToken, userRole, userEmail, userPageFlag);
    }

    window.scrollTo(0, 0);
    await getData(previousToken);
    $(document).ready( function () {
        $('#myTable').DataTable();
        $('#myTable_wrapper').addClass('container');
    } );
    $('.loader').addClass('invisible');
    
}, []);

  async function updateCenter(id, previousToken) {
    getRaceRequestById();
    const res = await getRaceById(id,previousToken);
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
      getRaceFailureById(res.data);
      history.push("/dashboard/races");
    } else {
      getRaceSuccessById(res.data);
      history.push("/dashboard/editrace");
    }
  }

  async function deleteCenter(id, previousToken) {
    deleteRaceRequest();
    const res = await deleteRace(id,previousToken);

    if(res.status != 204){
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
      history.push("/dashboard/races");
      deleteRaceFailure(res.data);
    } else {
      const notify204 = () => toast.error("Deletion Successful");
      notify204();
      deleteRaceSuccess(true);
      history.push('/dashboard/deleterace');
    }

  }

  async function getData(previousToken) {
    getRaceRequest();
    const res = await getRace(previousToken);

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
      history.push("/dashboard/races")
      getRaceFailure(res.data);
    } else {
      getRaceSuccess(res.data);
      setRecords({
        data: res.data.map((r,index) => {
          return (
            <tr key={index}>
              <th scope="row">{index+1}</th>
              <td>{r.race_name}</td>
              <td>{r.race_course}</td>
              <td className="date-col">{r.race_date.slice(0,10)}</td>
              <td>{r.race_length}</td>
              <td>{r.racehorse_age_criteria}</td>
              <td>{r.racehorse_weight_criteria}</td>
              
              <td className="last-col actions">
                <i
                  onClick={updateCenter.bind(this, r.id, previousToken)}
                  className="fas fa-edit fa-icon mr-3 form-edit"
                ></i>{" "}
                <i
                  onClick={deleteCenter.bind(this, r.id ,previousToken)}
                  className="fas fa-trash-alt fa-icon mr-3 form-delete"
                ></i>
              </td>
            </tr>
          );
        }),
      });
    }
  }
  
  return (
    <>
    <h2 className="mb-5 mt-4 text-center">Races</h2>
    <div className="content">
      <div className="loader">
        Loading ...
      </div>

      <table id="myTable" className="table table-max-content table-responsive table-hover pt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Race Name</th>
            <th scope="col">Race Course</th>
            <th scope="col date-col">Date</th>
            <th scope="col">Length</th>
            <th scope="col">Age Criteria</th>
            <th scope="col">Weight Criteria</th>
            <th scope="col last-col" className="actions">
              <i
                onClick={() => {
                  history.push("/dashboard/addraces");
                }}
                className="fas fa-plus fa-icon form-add"
              ></i>
            </th>
          </tr>
        </thead>

        <tbody>{records.data}</tbody>
      </table>
    </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return{
  token: state.user.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRaceRequest: () => dispatch(getRaceRequest()),
    getRaceSuccess: (data) => dispatch(getRaceSuccess(data)),
    getRaceFailure: (error) => dispatch(getRaceFailure(error)),

    getRaceRequestById: () => dispatch(getRaceRequestById()),
    getRaceSuccessById: (data) => dispatch(getRaceSuccessById(data)),
    getRaceFailureById: (error) => dispatch(getRaceFailureById(error)),

    deleteRaceRequest: () => dispatch(deleteRaceRequest()),
    deleteRaceSuccess: (data) => dispatch(deleteRaceSuccess(data)),
    deleteRaceFailure: (error) => dispatch(deleteRaceFailure(error)),

    setToken: (token, role, email) => dispatch(setToken(token, role, email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Races);
