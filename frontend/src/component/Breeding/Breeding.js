import React, { useState, useEffect } from "react";

import "./Breeding.css";
import imageName from "../../assets/img/breeding_3_small-min.png";
import { connect } from "react-redux";
import content from "../../Content";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import {
  getBreeder,
  getBreederById,
  deleteBreeder,
} from "../../api/BreedingApi";
import {
  getBreedingRequest,
  getBreedingSuccess,
  getBreedingFailure,
  getBreedingFailureById,
  getBreedingSuccessById,
  getBreedingRequestById,
  deleteBreedingRequest,
  deleteBreedingSuccess,
} from "../../Redux/Admin/Breeding/BreedingActions";

const Breeding = ({
  history,
  getBreedingFailure,
  getBreedingRequest,
  getBreedingSuccess,
  getBreedingFailureById,
  getBreedingSuccessById,
  getBreedingRequestById,
  deleteBreedingRequest,
  deleteBreedingSuccess,
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
          $('#breedingTable').DataTable();
        });
        $('.loader').addClass('invisible');
      });
    }
  }, [token]);
 

  async function GetBreedingCenterById(id) {
    getBreedingRequestById();
    const res = await getBreederById(id, token);
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
      getBreedingSuccessById(res.data);
      history.push("/breeding/" + id);
    }
  }

  async function getData() {
    getBreedingRequest();
    const res = await getBreeder(token);
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
      getBreedingSuccess(res);
      setRecords({
        data:res.data.map((r,index)=>{
          return (
          <tr key={index}>
            <th  scope="row">{index+1}</th>
            <td>{r.center_name}</td>
            <td>{r.owner_name}</td>
            <td> <div className="desc">{r.description}</div></td>
            <td>{r.email}</td>
            <td className="actions">
              <i className="fas fa-info-circle symbol" title="Details" onClick={GetBreedingCenterById.bind(this, r.id)}></i>
            </td>
          </tr>
          )
        })
      })
    } 
  }

  return (
    <div id="bred">
      <main id="main" className="mb-5">
        <section id="breedingStatic" className="breedingStatic">
          <div className="img-container">
            <div className="breeding-vignette"></div>
            <img src={imageName} className="imageBreeding" />
            <div className="breeding-heading">Breeding</div>
          </div>
          <div className="container w-75 mx-auto mt-5">
            <div className="row">
              <div className="col-lg-12 text-left">
                <p>
                  {content.BREEDING_PARA_1}
                </p>
                <p>
                {content.BREEDING_PARA_2}
                </p>
              </div>
            </div>

            {!token ? <p className="text-left mt-4">For more information on breeding centers <a href="/login" className="login font-weight-bold">log in</a> to our website.</p> : null}
              
            {token?
            <div className="content row mt-5">
              <div className="loader">
                Loading ...
              </div>
              <h2 className="text-center w-100 mb-4">Breeding Centers</h2>
              <table id="breedingTable" className="table table-max-content table-responsive table-hover m-auto pt-4">
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
    getBreedingRequest: () => dispatch(getBreedingRequest()),
    getBreedingSuccess: (data) => dispatch(getBreedingSuccess(data)),
    getBreedingFailure: (error) => dispatch(getBreedingFailure(error)),

    getBreedingRequestById: () => dispatch(getBreedingRequestById()),
    getBreedingSuccessById: (data) => dispatch(getBreedingSuccessById(data)),
    getBreedingFailureById: (error) => dispatch(getBreedingFailureById(error)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Breeding);
