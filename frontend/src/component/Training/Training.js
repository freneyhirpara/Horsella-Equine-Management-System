import React, { useState, useEffect } from "react";
import content from "../../Content";
import "./Training.css";
import imageName from "../../assets/img/jump_race_2_small-min.png";
import { connect } from "react-redux";
import {
  getTrainer,
  getTrainerById,
  deleteTrainer,
} from "../../api/TrainingApi";
import {
  getTrainingRequest,
  getTrainingSuccess,
  getTrainingFailure,
  getTrainingFailureById,
  getTrainingSuccessById,
  getTrainingRequestById,
  deleteTrainingRequest,
  deleteTrainingSuccess,
} from "../../Redux/Admin/Training/TrainingActions";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.min.css';

const Training = ({
  history,
  getTrainingFailure,
  getTrainingRequest,
  getTrainingSuccess,
  getTrainingFailureById,
  getTrainingSuccessById,
  getTrainingRequestById,
  deleteTrainingRequest,
  deleteTrainingSuccess,
  token
}) => {
  const [records, setRecords] = useState({
    data: [],
  });

  useEffect(async() => {
    window.scrollTo(0, 0);
    if(token){
      getData().then(() => {
        $(document).ready( function () {
          $('#trainingTable').DataTable();
        });
        $('.loader').addClass('invisible');
      });
    }
    sessionStorage.removeItem('trainingDetail');
  }, [token]);

  async function GetTrainingCenterById(id) {
    getTrainingRequestById();
    const res = await getTrainerById(id, token);

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
      history.push("/training")
    } else {
      getTrainingSuccessById(res.data);
      history.push("/training/" + id);
    }
  }

  async function getData() {
    getTrainingRequest();
    const res = await getTrainer(token);

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
      history.push("/training");
    } else {
      getTrainingSuccess(res.data);
      setRecords({
        data:res.data.map((r,index)=>{
          return (
          <tr key={index}>
            <th  scope="row">{index+1}</th>
            <td>{r.center_name}</td>
            <td>{r.owner_name}</td>
            <td><div className="desc">{r.description}</div></td>
            <td>{r.email}</td>
            <td className="actions">
              <i className="fas fa-info-circle symbol" title="Details" onClick={GetTrainingCenterById.bind(this, r.id)}></i>
            </td>
          </tr>
          )
        })
      });
    }
  }

  return (
    <div>
      <main id="main" className="mb-5">
        <section id="trainingStatic" className="trainingStatic">
          <div className="img-container">
            <div className="training-vignette"></div>
            <img src={imageName} className="imageTraining" />
            <div className="training-heading">Training</div>
          </div>
          <div className="container  w-75 mx-auto mt-5">
            <div className="row">
              <div className="col-lg-12 text-left">
                <p>
                  {content.TRAINING_PARA_1}
                </p>
                <p>
                  {content.TRAINING_PARA_2}
                </p>
                <p>
                  {content.TRAINING_PARA_3}
                </p>
              </div>
            </div>

            {!token ? <p className="text-left mt-4">For more information on training centers <a href="/login" className="login font-weight-bold">log in</a> to our website.</p> : null}

            {token?
            <div className="content row mt-5">
              <div className="loader">
                Loading ...
              </div>
              <h2 className="text-center w-100 mb-4">Training Centers</h2>
              <table id="trainingTable" className="table table-responsive table-hover m-auto pt-4">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Center Name</th>
                    <th scope="col">Owner Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Email</th>
                    <th scope="col" className="actions">Actions</th>
                  </tr>
                </thead>

                <tbody>{records.data}</tbody>
              </table>
            </div> : null}
          </div>
        </section>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTrainingRequest: () => dispatch(getTrainingRequest()),
    getTrainingSuccess: (data) => dispatch(getTrainingSuccess(data)),
    getTrainingFailure: (error) => dispatch(getTrainingFailure(error)),

    getTrainingRequestById: () => dispatch(getTrainingRequestById()),
    getTrainingSuccessById: (data) => dispatch(getTrainingSuccessById(data)),
    getTrainingFailureById: (error) => dispatch(getTrainingFailureById(error)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Training);
