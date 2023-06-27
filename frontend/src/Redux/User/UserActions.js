import {
  CLIENT_SET,
  CLIENT_UNSET,
  SET_TOKEN,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
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

export function setClient(res) {
  return {
    type: CLIENT_SET,
    token: res.token,
    role: res.role,
    email: res.email,
  };
}

export function unsetClient() {
  return {
    type: CLIENT_UNSET,
  };
}

export function setToken(token, role, email) {
  return {
    type: SET_TOKEN,
    token,
    role,
    email,
    
  };
}

export const userRegisterRequest = () => {
  return {
    type: USER_REGISTER_REQUEST,
  };
};

export const userRegisterSuccess = () => {
  return {
    type: USER_REGISTER_SUCCESS,
  };
};

export const userRegisterFailure = (error) => {
  return {
    type: USER_REGISTER_FAILURE,
    error: error,
  };
};


export const getUserById = data => {
  return {
    type: GET_USER_BY_ID,
    payload: data
  };
};


export const getHorse = (data) => {
  return {
      type:GET_HORSE,
      payload: data
  }
}


export const setPageFlag = () => {
  // sessionStorage.setItem("pageFlag",1);
  return {
    type: SET_PAGEFLAG,
    flag: 1
  };
};


export const unsetPageFlag = () => {
  sessionStorage.setItem("pageFlag",0);
  return {
    
      type:UNSET_PAGEFLAG,
      flag: 0
  }
}


//------------------------------
export const getUserRequest = () => {
  return {
    type: GET_USER_REQUEST
  };
};

export const getUserSuccess = data => {
  return {
    type: GET_USER_SUCCESS,
    payload: data
  };
};

export const getUserFailure = error => {
  return {
    type: GET_USER_FAILURE,
    payload: error
  };
};

export const getUserRequestById = () => {
  return {
    type: GET_USER_REQUEST_BY_ID
  };
};

export const getUserSuccessById = data => {
  return {
    type: GET_USER_SUCCESS_BY_ID,
    payload: data
  };
};

export const getUserFailureById = error => {
  return {
    type: GET_USER_FAILURE_BY_ID,
    payload: error
  };
};

export const deleteUserRequest = () => {
  return {
    type: DELETE_USER_REQUEST
  };
};

export const deleteUserSuccess = data => {
  return {
    type: DELETE_USER_SUCCESS,
    payload: data
  };
};

export const deleteUserFailure = error => {
  return {
    type: DELETE_USER_FAILURE,
    payload: error
  };
};

export const updateUserRequest = () => {
  return {
    type: UPDATE_USER_REQUEST
  };
};

export const updateUserSuccess = data => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: data
  };
};

export const updateUserFailure = error => {
  return {
    type: UPDATE_USER_FAILURE,
    payload: error
  };
};