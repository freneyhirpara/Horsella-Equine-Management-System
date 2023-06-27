import React, { useState, useEffect } from 'react';
import '../../Dashboard/css/loader.css';
import '../Ownership.css';
import { connect } from 'react-redux';
import {
  getAllEvents,
  deleteEvent,
  getEventById,
} from '../../../api/JournalApi';
import {
  getJournalRequest,
  getJournalSuccess,
  getJournalFailure,
  getJournalFailureById,
  getJournalSuccessById,
  getJournalRequestById,
  deleteJournalRequest,
  deleteJournalSuccess,
} from '../../../Redux/Journal/JournalActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
// import { setToken } from '../../../Redux/Index';
import { withRouter } from 'react-router-dom';

function Journal({
  token,
  history,
  getJournalFailure,
  getJournalRequest,
  getJournalSuccess,
  getJournalFailureById,
  getJournalSuccessById,
  getJournalRequestById,
  deleteJournalRequest,
  deleteJournalSuccess,
}) {
  const [record, setRecord] = useState({
    data: [],
  });

  useEffect(async () => {
    window.scrollTo(0, 0);
    if (token) {
      await getData();
      $(document).ready(function () {
        $('#journalTable').DataTable();
      });
      $('.loader').addClass('invisible');
    }
  }, [token]);

  async function updateEvent(id) {
    getJournalRequestById();
    const res = await getEventById(id, token);
    if (res.status != 200) {
      const notify400 = () =>
        toast.error(
          'There is some error in your request. Please try again, if error persists submit your query through our query form.'
        );
      const notify401 = () => toast.info(res.data.error.message);
      const notify500 = () => toast.error(res.data.error.message);
      res.status == 400
        ? notify400()
        : res.status == 401
        ? notify401()
        : notify500();
      history.push('/journal');
    } else {
      getJournalSuccessById(res.data);
      history.push('/editevent');
    }
  }

  async function getDetails(id) {
    getJournalRequestById();
    const res = await getEventById(id, token);
    if (res.status != 200) {
      const notify400 = () =>
        toast.error(
          'There is some error in your request. Please try again, if error persists submit your query through our query form.'
        );
      const notify401 = () => toast.info(res.data.error.message);
      const notify500 = () => toast.error(res.data.error.message);
      res.status == 400
        ? notify400()
        : res.status == 401
        ? notify401()
        : notify500();
      history.push('/journal');
    } else {
      getJournalSuccessById(res.data);
      history.push('/eventdetails');
    }
  }

  async function removeEvent(id) {
    deleteJournalRequest();
    const res = await deleteEvent(id, token);
    if (res.status != 204) {
      const notify400 = () =>
        toast.error(
          'There is some error in your request. Please try again, if error persists submit your query through our query form.'
        );
      const notify401 = () => toast.info(res.data.error.message);
      const notify500 = () => toast.error(res.data.error.message);
      res.status == 400
        ? notify400()
        : res.status == 401
        ? notify401()
        : notify500();
      history.push('/journal');
    } else {
      deleteJournalSuccess(true);
      const notify204 = () => toast.error('Journal deleted successfully.');
      notify204();
      history.push('/deleteevent');
    }
  }

  async function getData() {
    getJournalRequest();
    const res = await getAllEvents(token);
    if (res.status != 200) {
      const notify400 = () =>
        toast.error(
          'There is some error in your request. Please try again, if error persists submit your query through our query form.'
        );
      const notify401 = () => toast.info(res.data.error.message);
      const notify500 = () => toast.error(res.data.error.message);
      res.status == 400
        ? notify400()
        : res.status == 401
        ? notify401()
        : notify500();
      history.push('/journal');
    } else {
      getJournalSuccess(res.data);
      setRecord({
        data:
          res.data.length !== 0 ? (
            res.data.map((r, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{r.title}</td>
                  <td>{r.event_type}</td>
                  <td>{r.horse_name}</td>
                  <td>{r.start_date.slice(0, 10)}</td>
                  <td>{r.end_date.slice(0, 10)}</td>
                  <td className="symbol-col actions">
                    <i
                      onClick={getDetails.bind(this, r.id)}
                      className="fas fa-info-circle mr-2 symbol"
                    ></i>
                    <i
                      onClick={updateEvent.bind(this, r.id)}
                      className="fas fa-edit ml-2 mr-2 form-edit"
                    ></i>{' '}
                    <i
                      onClick={removeEvent.bind(this, r.id)}
                      className="fas fa-trash-alt mr-2 form-delete"
                    ></i>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7">There are no events to show</td>
            </tr>
          ),
      });
    }
  }

  return (
    <div className="content ownershipStatic container mb-5 px-4 pt-5">
      <div className="loader">Loading ...</div>
      <h2 className="w-100 text-center mt-4 mb-4">Journal</h2>
      <div className="table-container px-5">
        <table
          id="journalTable"
          className="table table-max-content table-responsive table-hover tableJournal m-auto pt-3"
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Activity</th>
              <th scope="col">Horse</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col symbol-col" className="actions">
                <i
                  onClick={() => {
                    history.push('/addevent');
                  }}
                  className="fas fa-plus form-add"
                ></i>
              </th>
            </tr>
          </thead>
          <tbody>{record.data}</tbody>
        </table>
      </div>
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
    getJournalRequest: () => dispatch(getJournalRequest()),
    getJournalSuccess: (data) => dispatch(getJournalSuccess(data)),
    getJournalFailure: (error) => dispatch(getJournalFailure(error)),

    getJournalRequestById: () => dispatch(getJournalRequestById()),
    getJournalSuccessById: (data) => dispatch(getJournalSuccessById(data)),
    getJournalFailureById: (error) => dispatch(getJournalFailureById(error)),

    deleteJournalRequest: () => dispatch(deleteJournalRequest()),
    deleteJournalSuccess: (data) => dispatch(deleteJournalSuccess(data)),
    deleteJournalFailure: (error) => dispatch(deleteJournalFailure(error)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Journal)
);
