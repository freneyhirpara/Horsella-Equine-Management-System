import { POST_TRAINING_REQUEST, POST_TRAINING_SUCCESS, POST_TRAINING_FAILURE, GET_TRAINING_SUCCESS, GET_TRAINING_FAILURE, GET_TRAINING_REQUEST,GET_TRAINING_SUCCESS_BY_ID, GET_TRAINING_FAILURE_BY_ID, GET_TRAINING_REQUEST_BY_ID, UPDATE_TRAINING_SUCCESS, UPDATE_TRAINING_FAILURE, UPDATE_TRAINING_REQUEST,DELETE_TRAINING_SUCCESS, DELETE_TRAINING_FAILURE, DELETE_TRAINING_REQUEST } from "./TrainingActionTypes"

const initialState={
    loading:false,
    data:"",
    error: ""
}


const trainingreducer = (state=initialState,action) => {
    switch(action.type){
        case POST_TRAINING_REQUEST: 
            return {
                ...state,
                loading:true,
          
            }
        case POST_TRAINING_SUCCESS:
            return {
                loading:false,
                data: action.payload.centerName,
                error: ''
            }
        case POST_TRAINING_FAILURE:
            return {
                loading:false,
                data: null,
                error: action.payload
            }


        case GET_TRAINING_REQUEST: 
            return {
                ...state,
                loading:true,
          
            }
        case GET_TRAINING_SUCCESS:
            return {
                loading:false,
                data: action.payload,
                error: ''
            }
        case GET_TRAINING_FAILURE:
            return {
                loading:false,
                data: null,
                error: action.payload.error
            }

        case GET_TRAINING_REQUEST_BY_ID: 
            return {
                ...state,
                loading:true,
          
            }
        case GET_TRAINING_SUCCESS_BY_ID:
            return {
                loading:false,
                data: action.payload,
                error: ''
            }
        case GET_TRAINING_FAILURE_BY_ID:
            return {
                loading:false,
                data: null,
                error: action.payload.error
            }
            
            
        case UPDATE_TRAINING_REQUEST: 
            return {
                ...state,
                loading:true,
          
            }
        case UPDATE_TRAINING_SUCCESS:
            return {
                loading:false,
                data: action.payload.data,
                error: ''
            }
        case UPDATE_TRAINING_FAILURE:
            return {
                loading:false,
                data: null,
                error: action.payload.error
            }

        case DELETE_TRAINING_REQUEST: 
            return {
                ...state,
                loading:true,
          
            }
        case DELETE_TRAINING_SUCCESS:
            return {
                loading:false,
                data: action.payload.data,
                error: ''
            }
        case DELETE_TRAINING_FAILURE:
            return {
                loading:false,
                data: null,
                error: action.payload.error
            }

        default:
            return state;
    }
  }



  export default trainingreducer;