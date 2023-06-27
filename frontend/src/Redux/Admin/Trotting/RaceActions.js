import {
  POST_RACE_REQUEST,
  POST_RACE_SUCCESS,
  POST_RACE_FAILURE,
  GET_RACE_FAILURE,
  GET_RACE_REQUEST,
  GET_RACE_SUCCESS,
  GET_RACE_FAILURE_BY_ID,
  GET_RACE_REQUEST_BY_ID,
  GET_RACE_SUCCESS_BY_ID,
  UPDATE_RACE_FAILURE,
  UPDATE_RACE_REQUEST,
  UPDATE_RACE_SUCCESS,
  DELETE_RACE_FAILURE,
  DELETE_RACE_REQUEST,
  DELETE_RACE_SUCCESS,
  POST_PARTICIPATE_REQUEST,
  POST_PARTICIPATE_SUCCESS,
  POST_PARTICIPATE_FAILURE,
  GET_PARTICIPATE_FAILURE,
  GET_PARTICIPATE_SUCCESS,
  GET_PARTICIPATE_REQUEST
} from "./RaceActionTypes";

export const postRaceRequest = () => {
  return {
    type: POST_RACE_REQUEST
  };
};

export const postRaceSuccess = data => {
  return {
    type: POST_RACE_SUCCESS,
    payload: data
  };
};

export const postRaceFailure = error => {
  return {
    type: POST_RACE_FAILURE,
    payload: error
  };
};

export const getRaceRequest = () => {
  return {
    type: GET_RACE_REQUEST
  };
};

export const getRaceSuccess = data => {
  return {
    type: GET_RACE_SUCCESS,
    payload: data
  };
};

export const getRaceFailure = error => {
  return {
    type: GET_RACE_FAILURE,
    payload: error
  };
};

export const getRaceRequestById = () => {
  return {
    type: GET_RACE_REQUEST_BY_ID
  };
};

export const getRaceSuccessById = data => {
  return {
    type: GET_RACE_SUCCESS_BY_ID,
    payload: data
  };
};

export const getRaceFailureById = error => {
  return {
    type: GET_RACE_FAILURE_BY_ID,
    payload: error
  };
};

export const updateRaceRequest = () => {
  return {
    type: UPDATE_RACE_REQUEST
  };
};

export const updateRaceSuccess = data => {
  return {
    type: UPDATE_RACE_SUCCESS,
    payload: data
  };
};

export const updateRaceFailure = error => {
  return {
    type: UPDATE_RACE_FAILURE,
    payload: error
  };
};

export const deleteRaceRequest = () => {
  return {
    type: DELETE_RACE_REQUEST
  };
};

export const deleteRaceSuccess = data => {
  return {
    type: DELETE_RACE_SUCCESS,
    payload: data
  };
};

export const deleteRaceFailure = error => {
  return {
    type: DELETE_RACE_FAILURE,
    payload: error
  };
};

export const postParticipateRequest = () => {
  return {
    type: POST_PARTICIPATE_REQUEST
  };
};

export const postParticipateSuccess = data => {
  return {
    type: POST_PARTICIPATE_SUCCESS,
    payload: data
  };
};

export const postParticipateFailure = error => {
  return {
    type: POST_PARTICIPATE_FAILURE,
    payload: error
  };
};

export const getParticipateRequest = () => {
  return {
    type: GET_PARTICIPATE_REQUEST
  };
};

export const getParticipateSuccess = data => {
  return {
    type: GET_PARTICIPATE_SUCCESS,
    participants: data
  };
};

export const getParticipateFailure = error => {
  return {
    type: GET_PARTICIPATE_FAILURE,
    payload: error
  };
};
