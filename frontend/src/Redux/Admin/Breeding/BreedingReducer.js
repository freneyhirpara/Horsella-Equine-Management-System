import { POST_BREEDING_REQUEST, POST_BREEDING_SUCCESS, POST_BREEDING_FAILURE, GET_BREEDING_SUCCESS, GET_BREEDING_FAILURE, GET_BREEDING_REQUEST,GET_BREEDING_SUCCESS_BY_ID, GET_BREEDING_FAILURE_BY_ID, GET_BREEDING_REQUEST_BY_ID, UPDATE_BREEDING_SUCCESS, UPDATE_BREEDING_FAILURE, UPDATE_BREEDING_REQUEST,DELETE_BREEDING_SUCCESS, DELETE_BREEDING_FAILURE, DELETE_BREEDING_REQUEST } from "./BreedingActionTypes"

const initialState={
    loading:false,
    data:"",
    error: ""
}


const breedingreducer = (state=initialState,action) => {
    switch(action.type){
        case POST_BREEDING_REQUEST: 
            return {
                ...state,
                loading:true,
          
            }
        case POST_BREEDING_SUCCESS:
            return {
                loading:false,
                data: action.payload.centerName,
                error: ''
            }
        case POST_BREEDING_FAILURE:
            return {
                loading:false,
                data: null,
                error: action.payload
            }


        case GET_BREEDING_REQUEST: 
            return {
                ...state,
                loading:true,
          
            }
        case GET_BREEDING_SUCCESS:
            return {
                loading:false,
                data: action.payload,
                error: ''
            }
        case GET_BREEDING_FAILURE:
            return {
                loading:false,
                data: null,
                error: action.payload.error
            }

        case GET_BREEDING_REQUEST_BY_ID: 
            return {
                ...state,
                loading:true,
          
            }
        case GET_BREEDING_SUCCESS_BY_ID:
            return {
                loading:false,
                data: action.payload,
                error: ''
            }
        case GET_BREEDING_FAILURE_BY_ID:
            return {
                loading:false,
                data: null,
                error: action.payload.error
            }
            
            
        case UPDATE_BREEDING_REQUEST: 
            return {
                ...state,
                loading:true,
          
            }
        case UPDATE_BREEDING_SUCCESS:
            return {
                loading:false,
                data: action.payload.data,
                error: ''
            }
        case UPDATE_BREEDING_FAILURE:
            return {
                loading:false,
                data: null,
                error: action.payload.error
            }

        case DELETE_BREEDING_REQUEST: 
            return {
                ...state,
                loading:true,
          
            }
        case DELETE_BREEDING_SUCCESS:
            return {
                loading:false,
                data: action.payload.data,
                error: ''
            }
        case DELETE_BREEDING_FAILURE:
            return {
                loading:false,
                data: null,
                error: action.payload.error
            }

        default:
            return state;
    }
  }



  export default breedingreducer;