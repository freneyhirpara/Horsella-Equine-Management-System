import {
  POST_JOURNAL_REQUEST,
  POST_JOURNAL_SUCCESS,
  POST_JOURNAL_FAILURE,
  GET_JOURNAL_SUCCESS,
  GET_JOURNAL_FAILURE,
  GET_JOURNAL_REQUEST,
  GET_JOURNAL_SUCCESS_BY_ID,
  GET_JOURNAL_FAILURE_BY_ID,
  GET_JOURNAL_REQUEST_BY_ID,
  UPDATE_JOURNAL_SUCCESS,
  UPDATE_JOURNAL_FAILURE,
  UPDATE_JOURNAL_REQUEST,
  DELETE_JOURNAL_SUCCESS,
  DELETE_JOURNAL_FAILURE,
  DELETE_JOURNAL_REQUEST,
} from "./JournalActionTypes";

const initialState = {
  loading: false,
  data: "",
  error: "",
};

const journalreducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_JOURNAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_JOURNAL_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: '',
      };
    case GET_JOURNAL_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload.error,
      };

    case GET_JOURNAL_REQUEST_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case GET_JOURNAL_SUCCESS_BY_ID:
      return {
        loading: false,
        data: action.payload,
        error: '',
      };
    case GET_JOURNAL_FAILURE_BY_ID:
      return {
        loading: false,
        data: null,
        error: action.payload.error,
      };

    case UPDATE_JOURNAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_JOURNAL_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case UPDATE_JOURNAL_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload.error,
      };

    case DELETE_JOURNAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_JOURNAL_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case DELETE_JOURNAL_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default journalreducer;
