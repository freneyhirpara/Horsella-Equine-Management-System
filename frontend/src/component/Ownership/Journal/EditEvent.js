import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { withRouter } from 'react-router-dom';

import { setToken } from '../../../Redux/Index';
import { getHorses } from '../../../api/UserApi';
import { getHorse } from '../../../Redux/User/UserActions';
import { getEventType, updateEvent } from '../../../api/JournalApi';

function EditEvent({ setToken, horse, getHorse, history, token, data }) {
  useEffect(async () => {
    let previousToken = sessionStorage.getItem('token');
    const userRole = sessionStorage.getItem('role');
    const userEmail = sessionStorage.getItem('email');
    const userPageFlag = parseInt(sessionStorage.getItem('pageFlag'));
    if (previousToken) {
      await setToken(previousToken, userRole, userEmail, userPageFlag);
    }

    const horseRes = await getHorses(previousToken);
    getHorse(horseRes.data);
    setHorses(horseRes.data);

    const eventTypeRes = await getEventType(previousToken);
    setEvents(eventTypeRes.data);

    window.scrollTo(0, 0);
    $(document).ready(function (e) {
      $('.selectpicker').selectpicker();
    });
    $('.loader').addClass('invisible');

    if(sessionStorage.getItem('event')){
      let eventData = JSON.parse(sessionStorage.getItem('event'));
      setEventId(eventData.eventId);
      setTitle(eventData.title);
      setDescription(eventData.description);
      setEventTypeId(eventData.eventTypeId);
      setStartDate(eventData.startDate);
      setEndDate(eventData.endDate);
      setHorseId(eventData.horseId);
    } else {
      let eventData = {
        eventId,
        eventTypeId,
        horseId,
        title,
        description,
        startDate,
        endDate
      };
      sessionStorage.setItem('event', JSON.stringify(eventData));
    }

  }, []);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem('event');
    }
  }, [])

  const [horseId, setHorseId] = useState(data ? data.horse_id : null);
  const [eventTypeId, setEventTypeId] = useState(data ? data.event_id : null);
  const [eventId, setEventId] = useState(data ? data.id : null);
  const [title, setTitle] = useState(data ? data.title : null);
  const [description, setDescription] = useState(data ? data.description : null);
  const [startDate, setStartDate] = useState(data ? data.start_date : null);
  const [endDate, setEndDate] = useState(data ? data.end_date : null);

  const [horses, setHorses] = useState(horse ? horse : null);
  const [events, setEvents] = useState(null);

  const horseList = horses
    ? horses.map((h) => {
        return (
          <option key={h.id} value={h.id}>
            {h.horse_name}
          </option>
        );
      })
    : null;

  const eventList = events
    ? events.map((e) => {
        return (
          <option key={e.id} value={e.id}>
            {e.event_type}
          </option>
        );
      })
    : null;

  if (horseList == null) {
    return <div className="loader">Loading ...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(startDate) > new Date(endDate)) {
      toast.warning('Please enter a valid End Date');
      return;
    }

    document.getElementById('submit-button').innerHTML = 'Updating ...';
    document
      .getElementById('submit-button')
      .setAttribute('disabled', 'disabled');

    const res = await updateEvent(
      {
        horseId: horseId,
        eventId: eventTypeId,
        title: title,
        description: description,
        startDate: startDate,
        endDate: endDate,
      },
      eventId,
      token
    );

    document.getElementById('submit-button').innerHTML = 'Update';
    document.getElementById('submit-button').removeAttribute('disabled');

    if (res.status != 201) {
      const notify400 = () =>
        toast.error(
          'There is some error in your request. Please try again, if error persists submit your query through our query form.'
        );
      const notify401 = () => toast.info(res.data.error.message);
      const notify500 = () => toast.error(res.data.error.message);
      const notify999 = () =>
        toast.error(
          'Sorry but we are unable to process your request. Please contact our Administrator.'
        );
      res.status == 400 ? notify400() : null;
      res.status == 401 ? notify401() : null;
      res.status == 500 ? notify500() : null;
      res.status == 999 ? notify999() : null;
      if (res.status == 400) {
        toast.error(res.data.error.message);
      }
      history.push('/journal');
    } else {
      const notify201 = () => toast.success('Activity added successfully.');
      notify201();
      history.push('/journal');
    }
  };

  return (
    <div className="ownershipStatic mb-5 pt-5 px-4">
      <div className="loader">Loading ...</div>
      <h2 className="mb-4">Update Activity</h2>
      <form
        className="container w-75 px-3 m-auto row g-3"
        onSubmit={handleSubmit}
      >
        <div className="col-md-6 pt-3 px-lg-5 px-md-3 select">
          <label htmlFor="HorseList" className="form-label">
            Horse
          </label>
          <div>
            <select
              className="form-select selectpicker f w-100"
              id="HorseList"
              onChange={(e) => setHorseId(e.target.value)}
              defaultValue={horseId}
              value={horseId}
              min="1"
              required
            >
              <option
                value="-1"
                hidden
                disabled
                onClick={(e) => e.preventDefault()}
              >
                -- Select a Horse --
              </option>
              {horseList}
            </select>
          </div>
        </div>

        <div className="col-md-6 pt-3 px-lg-5 px-md-3 select">
          <label htmlFor="EventType" className="form-label">
            Activity Type
          </label>
          <div>
            <select
              className="form-select selectpicker f w-100"
              id="EventType"
              onChange={(e) => setEventTypeId(e.target.value)}
              defaultValue={eventTypeId}
              value={eventTypeId}
              min="1"
              required
            >
              <option
                value="-1"
                hidden
                disabled
                onClick={(e) => e.preventDefault()}
              >
                -- Select an Activity type --
              </option>
              {eventList}
            </select>
          </div>
        </div>

        <div className="col-lg-6 col-md-6 pt-3 px-lg-5 px-md-3">
          <label htmlFor="StartDate" className="form-label">
            Start Date
          </label>
          <input
            type="date"
            className="form-control datetimepicker"
            id="StartDate"
            value={startDate ? startDate.slice(0, 10) : null}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div className="col-lg-6 col-md-6 pt-3 px-lg-5 px-md-3">
          <label htmlFor="EndDate" className="form-label">
            End Date
          </label>
          <input
            type="date"
            className="form-control datetimepicker"
            id="EndDate"
            value={endDate ? endDate.slice(0, 10) : null}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <div className="col-lg-12 col-md-6 pt-3 px-lg-5 px-md-3">
          <label htmlFor="EventName" className="form-label">
            Activity Title
          </label>
          <input
            type="text"
            className="form-control"
            id="EventName"
            required
            value={title}
            placeholder="Activity Name"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="col-lg-12 pt-5 px-lg-5 px-md-3">
          <label htmlFor="Description" className="form-label">
            Activity Description
          </label>
          <textarea
            id="Description"
            className="form-control"
            name="message"
            rows="5"
            value={description}
            required
            minLength="20"
            placeholder="Message"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="col-12 pt-5">
          <button
            type="submit"
            id="submit-button"
            className="btn px-4 form-buttons"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    data: state.journalreducer.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token, role, email) => dispatch(setToken(token, role, email)),
    getHorse: (horses) => dispatch(getHorse(horses)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditEvent)
);
