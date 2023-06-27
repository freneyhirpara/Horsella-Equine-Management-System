import React, { useState, useEffect } from "react";
import "../../css/table.css";
import "../../css/loader.css";
import { connect } from "react-redux";
import {
  getTrainer,
  getTrainerById,
  deleteTrainer,
} from "../../../../api/TrainingApi";
import {
  getTrainingRequest,
  getTrainingSuccess,
  getTrainingFailure,
  getTrainingFailureById,
  getTrainingSuccessById,
  getTrainingRequestById,
  deleteTrainingRequest,
  deleteTrainingSuccess,
} from "../../../../Redux/Admin/Training/TrainingActions";
import AddTrainingCenter from "./AddTrainingCenter";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.min.css';

  import { setClient, unsetClient, setToken } from "../../../../Redux/Index";

function Training({
  token,
  history,
  getTrainingFailure,
  getTrainingRequest,
  getTrainingSuccess,
  getTrainingFailureById,
  getTrainingSuccessById,
  getTrainingRequestById,
  deleteTrainingRequest,
  deleteTrainingSuccess,
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
    sessionStorage.removeItem('trainingCenterDetail');  
}, []);


  async function updateCenter(id, previousToken) {
    getTrainingRequestById();
    const res = await getTrainerById(id,previousToken);

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
      history.push("/dashboard/training");
    } else {
      getTrainingSuccessById(res.data);
      history.push("/dashboard/edittrainingcenter");
    }
  }

  async function deleteCenter(id, previousToken) {
    deleteTrainingRequest();
    const res = await deleteTrainer(id,previousToken);

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
      history.push("/dashboard/training");
    } else {
      const notify204 = () => toast.error("Deletion successful");
      notify204();
      deleteTrainingSuccess(true);
      history.push("/dashboard/deletetrainingcenter");
    }
  }

  async function getData(previousToken) {
    getTrainingRequest();
    const res = await getTrainer(previousToken);
    
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
      history.push("/dashboard/training")
    } else {
      getTrainingSuccess(res.data);
      setRecords({
        data: res.data.map((r, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index+1}</th>
              <td>{r.center_name}</td>
              <td>{r.owner_name}</td>
              <td><div className="desc">{r.description}</div></td>
              <td>{r.email}</td>
              <td className="last-col actions">
                <i
                  onClick={updateCenter.bind(this, r.id, previousToken)}
                  className="fas fa-edit fa-icon mr-3 form-edit"
                ></i>{" "}
                <i
                  onClick={deleteCenter.bind(this, r.id, previousToken)}
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
      <h2 className="mb-5 mt-4 text-center">Training Centers</h2>
      <div className="content">
        <div className="loader">
          Loading ...
        </div>

        <table id="myTable" className="table table-responsive table-hover pt-3">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Center Name</th>
              <th scope="col">Owner Name</th>
              <th scope="col">Description</th>
              <th scope="col">Email</th>
              <th scope="col last-col" className="actions">
                <i
                  onClick={() => {
                    history.push("/dashboard/addtrainingcenter");
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
    getTrainingRequest: () => dispatch(getTrainingRequest()),
    getTrainingSuccess: (data) => dispatch(getTrainingSuccess(data)),
    getTrainingFailure: (error) => dispatch(getTrainingFailure(error)),

    getTrainingRequestById: () => dispatch(getTrainingRequestById()),
    getTrainingSuccessById: (data) => dispatch(getTrainingSuccessById(data)),
    getTrainingFailureById: (error) => dispatch(getTrainingFailureById(error)),

    deleteTrainingRequest: () => dispatch(deleteTrainingRequest()),
    deleteTrainingSuccess: (data) => dispatch(deleteTrainingSuccess(data)),
    deleteTrainingFailure: (error) => dispatch(deleteTrainingFailure(error)),

    setToken: (token, role, email) => dispatch(setToken(token, role, email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Training);
