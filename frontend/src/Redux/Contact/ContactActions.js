import { POST_CONTACT_REQUEST,POST_CONTACT_SUCCESS,POST_CONTACT_FAILURE,GET_CONTACT_FAILURE,GET_CONTACT_REQUEST,GET_CONTACT_SUCCESS } from "./ContactActionTypes";


export const postContactRequest = () => {
    return {
      type: POST_CONTACT_REQUEST,
    };
  };

  export const postContactSuccess = (data) => {
      return {
          type:POST_CONTACT_SUCCESS,
          payload: data
      }
  }

  export const postContactFailure = (error) => {
    return {
      type: POST_CONTACT_FAILURE,
      payload: error,
    };
  };
  
  export const getContactRequest = () => {
    return {
      type: GET_CONTACT_REQUEST,
    };
  };

  export const getContactSuccess = (data) => {
      return {
          type:GET_CONTACT_SUCCESS,
          payload: data
      }
  }

  export const getContactFailure = (error) => {
    return {
      type: GET_CONTACT_FAILURE,
      payload: error,
    };
  };

  
  