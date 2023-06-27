import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";


import imageName from '../../assets/img/trotting_3_small-min.png';
import './Trotting.css';
import content from "../../Content";
import Calender from './Calender';
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
} from "../../Redux/Admin/Trotting/RaceActions";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.min.css';

const Trotting  = ({
  getRaceFailure,
  getRaceRequest,
  getRaceSuccess,
  getRaceFailureById,
  getRaceSuccessById,
  getRaceRequestById,
  deleteRaceRequest,
  deleteRaceSuccess,
  token,
  history
}) =>{

  const [records, setRecords] = useState({
    data: [],
  });

  useEffect(async () => {
    window.scrollTo(0, 0);
    if(token){
      await getData();
      $(document).ready( function () {
        $('#raceTable').DataTable();
      } );
      $('.loader').addClass('invisible');
    }
  }, [token]);

  async function getData() {
    getRaceRequest();
    const res = await getRace(token);
    if(res.status != 200){
      const notify401 = () => toast.info(res.data.error.message);
      const notify500 = () => toast.error(res.data.error.message);
      const notify999 = () => toast.error("Sorry but we are unable to process your request. Please contact our Administrator.");
      res.status == 401 ? notify401() : null;
      res.status == 500 ? notify500() : null;
      res.status == 999 ? notify999() : null;
      if(res.status == 400) {
        toast.error(res.data.error.message);
      }
      history.push("/trotting");
    } else {
      getRaceSuccess(res.data);
      setRecords({
        data: res.data,
      });
    }
  }


    return(
        <div>
            <main id="main">
              <section id="trottingStatic" className="trottingStatic">
              <div className="img-container">
                <div className="trotting-vignette"></div>
                <img src={imageName} className="imageTrotting" />
                <div className="trotting-heading">Trotting</div>
              </div>
                <div className="container  w-75 mx-auto mt-5" >
                  <div className="row">
                    <div className="col-lg-12 text-left" >
                      <p>
                        {content.TROTTING_PARA_1}
                      </p>
                      <p>
                        {content.TROTTING_PARA_2}
                      </p>
                    </div>
                  </div>
                  {!token ? <p className="text-left mt-4">For more information on horse races <a href="/login" className="login font-weight-bold">log in</a> to our website.</p> : null}
                  <div className="container content p-2"> 
                   {token?<Calender races ={records.data} />: null}
                  </div>
                </div>
              </section>
            </main>
            <br/><br/>
        </div>
    );
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRaceRequest: () => dispatch(getRaceRequest()),
    getRaceSuccess: (data) => dispatch(getRaceSuccess(data)),
    getRaceFailure: (error) => dispatch(getRaceFailure(error)),

    getRaceRequestById: () => dispatch(getRaceRequestById()),
    getRaceSuccessById: (data) => dispatch(getRaceSuccessById(data)),
    getRaceFailureById: (error) => dispatch(getRaceFailureById(error)),

  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Trotting));
