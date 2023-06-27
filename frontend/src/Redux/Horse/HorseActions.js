import {
  POST_HORSE_REQUEST,
  POST_HORSE_SUCCESS,
  POST_HORSE_FAILURE,
  GET_HORSE_FAILURE,
  GET_HORSE_REQUEST,
  GET_HORSE_SUCCESS,
  GET_HORSE_FAILURE_BY_ID,
  GET_HORSE_REQUEST_BY_ID,
  GET_HORSE_SUCCESS_BY_ID,
  UPDATE_HORSE_FAILURE,
  UPDATE_HORSE_REQUEST,
  UPDATE_HORSE_SUCCESS,
  DELETE_HORSE_FAILURE,
  DELETE_HORSE_REQUEST,
  DELETE_HORSE_SUCCESS,
  GET_HORSE_DISCIPLINES,
  GET_HORSE_COLOR,
  GET_HORSE_GENDER,
  GET_HORSE_BREED,
} from "./HorseActionTypes";

export const postHorseRequest = () => {
  return {
    type: POST_HORSE_REQUEST,
  };
};

export const postHorseSuccess = (data) => {
  return {
    type: POST_HORSE_SUCCESS,
    payload: data,
  };
};

export const postHorseFailure = (error) => {
  return {
    type: POST_HORSE_FAILURE,
    payload: error,
  };
};

export const getHorseRequest = () => {
  return {
    type: GET_HORSE_REQUEST,
  };
};

export const getHorseSuccess = (data) => {
  return {
    type: GET_HORSE_SUCCESS,
    payload: data,
  };
};

export const getHorseFailure = (error) => {
  return {
    type: GET_HORSE_FAILURE,
    payload: error,
  };
};

export const getHorseRequestById = () => {
  return {
    type: GET_HORSE_REQUEST_BY_ID,
  };
};

export const getHorseSuccessById = (data) => {
  return {
    type: GET_HORSE_SUCCESS_BY_ID,
    payload: data,
  };
};

export const getHorseFailureById = (error) => {
  return {
    type: GET_HORSE_FAILURE_BY_ID,
    payload: error,
  };
};

export const updateHorseRequest = () => {
  return {
    type: UPDATE_HORSE_REQUEST,
  };
};

export const updateHorseSuccess = (data) => {
  return {
    type: UPDATE_HORSE_SUCCESS,
    payload: data,
  };
};

export const updateHorseFailure = (error) => {
  return {
    type: UPDATE_HORSE_FAILURE,
    payload: error,
  };
};

export const deleteHorseRequest = () => {
  return {
    type: DELETE_HORSE_REQUEST,
  };
};

export const deleteHorseSuccess = (data) => {
  return {
    type: DELETE_HORSE_SUCCESS,
    payload: data,
  };
};

export const deleteHorseFailure = (error) => {
  return {
    type: DELETE_HORSE_FAILURE,
    payload: error,
  };
};

export const getHorseGender = (data) => {
  return {
    type: GET_HORSE_GENDER,
    payload: data,
  };
};

export const getHorseColor = (data) => {
  return {
    type: GET_HORSE_COLOR,
    payload: data,
  };
};

export const getHorsedisciplines = (data) => {
  return {
    type: GET_HORSE_DISCIPLINES,
    payload: data,
  };
};

export const getHorseBreed = (data) => {
  return {
    type: GET_HORSE_BREED,
    payload: data,
  };
};
