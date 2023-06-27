import {
  POST_JOURNAL_REQUEST,
  POST_JOURNAL_SUCCESS,
  POST_JOURNAL_FAILURE,
  GET_JOURNAL_FAILURE,
  GET_JOURNAL_REQUEST,
  GET_JOURNAL_SUCCESS,
  GET_JOURNAL_FAILURE_BY_ID,
  GET_JOURNAL_REQUEST_BY_ID,
  GET_JOURNAL_SUCCESS_BY_ID,
  UPDATE_JOURNAL_FAILURE,
  UPDATE_JOURNAL_REQUEST,
  UPDATE_JOURNAL_SUCCESS,
  DELETE_JOURNAL_FAILURE,
  DELETE_JOURNAL_REQUEST,
  DELETE_JOURNAL_SUCCESS,
} from './JournalActionTypes';

export const postJournalRequest = () => {
  return {
    type: POST_JOURNAL_REQUEST,
  };
};

export const postJournalSuccess = (data) => {
  return {
    type: POST_JOURNAL_SUCCESS,
    payload: data,
  };
};

export const postJournalFailure = (error) => {
  return {
    type: POST_JOURNAL_FAILURE,
    payload: error,
  };
};

export const getJournalRequest = () => {
  return {
    type: GET_JOURNAL_REQUEST,
  };
};

export const getJournalSuccess = (data) => {
  return {
    type: GET_JOURNAL_SUCCESS,
    payload: data,
  };
};

export const getJournalFailure = (error) => {
  return {
    type: GET_JOURNAL_FAILURE,
    payload: error,
  };
};

export const getJournalRequestById = () => {
  return {
    type: GET_JOURNAL_REQUEST_BY_ID,
  };
};

export const getJournalSuccessById = (data) => {
  return {
    type: GET_JOURNAL_SUCCESS_BY_ID,
    payload: data,
  };
};

export const getJournalFailureById = (error) => {
  return {
    type: GET_JOURNAL_FAILURE_BY_ID,
    payload: error,
  };
};

export const updateJournalRequest = () => {
  return {
    type: UPDATE_JOURNAL_REQUEST,
  };
};

export const updateJournalSuccess = (data) => {
  return {
    type: UPDATE_JOURNAL_SUCCESS,
    payload: data,
  };
};

export const updateJournalFailure = (error) => {
  return {
    type: UPDATE_JOURNAL_FAILURE,
    payload: error,
  };
};

export const deleteJournalRequest = () => {
  return {
    type: DELETE_JOURNAL_REQUEST,
  };
};

export const deleteJournalSuccess = (data) => {
  return {
    type: DELETE_JOURNAL_SUCCESS,
    payload: data,
  };
};

export const deleteJournalFailure = (error) => {
  return {
    type: DELETE_JOURNAL_FAILURE,
    payload: error,
  };
};
