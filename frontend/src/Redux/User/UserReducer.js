import { userRegisterRequest, userRegisterSuccess } from "./UserActions";
import {
  CLIENT_SET,
  CLIENT_UNSET,
  SET_TOKEN,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  GET_USER_BY_ID,
  GET_HORSE,
  UNSET_PAGEFLAG,
  SET_PAGEFLAG,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER_REQUEST,
  GET_USER_FAILURE_BY_ID,
  GET_USER_SUCCESS_BY_ID,
  GET_USER_REQUEST_BY_ID,
} from "./UserActionTypes";

const initialSate = {
  // id: null,
  email: null,
  token: null,
  role: null,
  loading: false,
  error: "",
  horses: "",
  pageFlag: 0,
  loading: false,
  data: "",
  error: "",
};

const reducer = function clientReducer(state = initialSate, action) {
  switch (action.type) {
    case CLIENT_SET:
      sessionStorage.setItem("token", JSON.stringify(action.token));
      sessionStorage.setItem("role", JSON.stringify(action.role));
      sessionStorage.setItem("email", JSON.stringify(action.email));
      //sessionStorage.setItem("pageFlag", JSON.stringify(state.pageFlag));

      return {
        // id: action.token.userId,
        ...state,
        token: action.token,
        email: action.email,
        role: action.role,
        pageFlag: state.pageFlag,
      };

    case CLIENT_UNSET:
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("pageFlag");

      return {
        // id: null,
        ...state,
        email: null,
        token: null,
        role: null,
        pageFlag: 0,
      };

    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
        role: action.role,
        email: action.email,
      };

    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };

    case USER_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case GET_USER_BY_ID:
      return {
        loading: false,
        data: action.payload,
        error: "",
      };

    case GET_HORSE:
      return {
        ...state,
        horses: action.payload,
        // email: action.payload.email,
        error: "",
      };

    case SET_PAGEFLAG:
      sessionStorage.setItem("pageFlag", JSON.stringify(1));
      return {
        ...state,
        pageFlag: action.flag,
        // email: action.payload.email,
      };

    case UNSET_PAGEFLAG:
      return {
        ...state,
        pageFlag: action.flag,
        // email: action.payload.email,
      };
//-------------------------------
    case GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload.error,
      };

    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: "",
      };
    case UPDATE_USER_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload.error,
      };

    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: "",
      };
    case DELETE_USER_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload.error,
      };

      case GET_USER_REQUEST_BY_ID:
        return {
          ...state,
          loading: true
        };
      case GET_USER_SUCCESS_BY_ID:
        return {
          loading: false,
          data: action.payload,
          error: ""
        };
      case GET_USER_FAILURE_BY_ID:
        return {
          loading: false,
          data: null,
          error: action.payload.error
        };

    default:
      return state;
  }
};

export default reducer;
