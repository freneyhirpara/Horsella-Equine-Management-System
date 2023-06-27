import {
  POST_HORSE_REQUEST,
  POST_HORSE_SUCCESS,
  POST_HORSE_FAILURE,
  GET_HORSE_SUCCESS,
  GET_HORSE_FAILURE,
  GET_HORSE_REQUEST,
  GET_HORSE_SUCCESS_BY_ID,
  GET_HORSE_FAILURE_BY_ID,
  GET_HORSE_REQUEST_BY_ID,
  UPDATE_HORSE_SUCCESS,
  UPDATE_HORSE_FAILURE,
  UPDATE_HORSE_REQUEST,
  DELETE_HORSE_SUCCESS,
  DELETE_HORSE_FAILURE,
  DELETE_HORSE_REQUEST,
  GET_HORSE_DISCIPLINES,
  GET_HORSE_COLOR,
  GET_HORSE_GENDER,
  GET_HORSE_BREED,
} from "./HorseActionTypes";

const initialState = {
  loading: false,
  data: "",
  error: "",
  color: "",
  gender: "",
  disciplines: "",
  breed: "",
};

const horsereducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_HORSE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_HORSE_SUCCESS:
      return {
        loading: false,
        data: action.payload.centerName,
        error: "",
      };
    case POST_HORSE_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };

    case GET_HORSE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_HORSE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: "",
      };
    case GET_HORSE_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload.error,
      };

    case GET_HORSE_REQUEST_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case GET_HORSE_SUCCESS_BY_ID:
      return {
        loading: false,
        data: action.payload,
        error: "",
      };
    case GET_HORSE_FAILURE_BY_ID:
      return {
        loading: false,
        data: null,
        error: action.payload.error,
      };

    case UPDATE_HORSE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_HORSE_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: "",
      };
    case UPDATE_HORSE_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload.error,
      };

    case DELETE_HORSE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_HORSE_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: "",
      };
    case DELETE_HORSE_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload.error,
      };
    case GET_HORSE_GENDER:
      return {
        ...state,
        gender: action.payload,
      };

    case GET_HORSE_COLOR:
      return {
        ...state,
        color: action.payload,
      };

    case GET_HORSE_DISCIPLINES:
      return {
        ...state,
        disciplines: action.payload,
      };
    case GET_HORSE_BREED:
      return {
        ...state,
        breed: action.payload,
      };

    default:
      return state;
  }
};

export default horsereducer;
