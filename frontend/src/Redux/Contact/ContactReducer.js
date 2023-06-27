import { POST_CONTACT_REQUEST, POST_CONTACT_SUCCESS, POST_CONTACT_FAILURE, GET_CONTACT_SUCCESS, GET_CONTACT_FAILURE, GET_CONTACT_REQUEST,GET_CONTACT_SUCCESS_BY_ID, GET_CONTACT_FAILURE_BY_ID, GET_CONTACT_REQUEST_BY_ID, UPDATE_CONTACT_SUCCESS, UPDATE_CONTACT_FAILURE, UPDATE_CONTACT_REQUEST,DELETE_CONTACT_SUCCESS, DELETE_CONTACT_FAILURE, DELETE_CONTACT_REQUEST } from "./ContactActionTypes"

const initialState={
    loading:false,
    data:"",
    error: ""
}


const contactreducer = (state=initialState,action) => {
    switch(action.type){
        case POST_CONTACT_REQUEST: 
            return {
                ...state,
                loading:true,
          
            }
        case POST_CONTACT_SUCCESS:
            return {
                loading:false,
                data: action.payload.centerName,
                error: ''
            }
        case POST_CONTACT_FAILURE:
            return {
                loading:false,
                data: null,
                error: action.payload
            }


        case GET_CONTACT_REQUEST: 
            return {
                ...state,
                loading:true,
          
            }
        case GET_CONTACT_SUCCESS:
            return {
                loading:false,
                data: action.payload,
                error: ''
            }
        case GET_CONTACT_FAILURE:
            return {
                loading:false,
                data: null,
                error: action.payload.error
            }

        case GET_CONTACT_REQUEST_BY_ID: 
            return {
                ...state,
                loading:true,
          
            }
        case GET_CONTACT_SUCCESS_BY_ID:
            return {
                loading:false,
                data: action.payload,
                error: ''
            }
        case GET_CONTACT_FAILURE_BY_ID:
            return {
                loading:false,
                data: null,
                error: action.payload.error
            }
            
            
        case UPDATE_CONTACT_REQUEST: 
            return {
                ...state,
                loading:true,
          
            }
        case UPDATE_CONTACT_SUCCESS:
            return {
                loading:false,
                data: action.payload.data,
                error: ''
            }
        case UPDATE_CONTACT_FAILURE:
            return {
                loading:false,
                data: null,
                error: action.payload.error
            }

        case DELETE_CONTACT_REQUEST: 
            return {
                ...state,
                loading:true,
          
            }
        case DELETE_CONTACT_SUCCESS:
            return {
                loading:false,
                data: action.payload.data,
                error: ''
            }
        case DELETE_CONTACT_FAILURE:
            return {
                loading:false,
                data: null,
                error: action.payload.error
            }

        default:
            return state;
    }
  }



  export default contactreducer;