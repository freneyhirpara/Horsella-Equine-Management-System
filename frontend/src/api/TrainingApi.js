import axios from "axios";
import variables from "../variables";

export const postTrainer = async (trainingDetails,token) => {
    const headers = {
        Authorization: "Bearer " + token.replace(/"/g, ""),
      };


    return axios
    .post(
      `${variables.BASE_URL}/training-center/add`,
      trainingDetails,
      {
        headers: headers,
      }
    )
      .then(function (res) {
        return res.data;
      })
      .catch(function (error) {;
        if(error.request.readyState == 4 && error.request.response !== "" ){
        return error.response;
      } else {
        return { status: 999 };
      }
      });
    
}

export const updateTrainer = async (id,trainingDetails,token) => {
  const headers = {
      Authorization: "Bearer " + token.replace(/"/g, ""),
    };


  return axios
  .put(
    `${variables.BASE_URL}/training-center/update/${id}`,
    trainingDetails,
    {
      headers: headers,
    }
  )
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      if(error.request.readyState == 4 && error.request.response !== "" ){
        return error.response;
      } else {
        return { status: 999 };
      }
    });
  
}






export const getTrainer = async (token) => {
    const headers = {
        Authorization: "Bearer " + token.replace(/"/g, ""),
      };


    return axios
    .get(
      `${variables.BASE_URL}/training-center/all`,
      
      {
        headers: headers,
      }
    )
      .then(function (res) {
        return res.data;
      })
      .catch(function (error) {
        if(error.request.readyState == 4 && error.request.response !== "" ){
          return error.response;
        } else {
          return { status: 999 };
        }
      });
    
}

export const getTrainerById = async (id,token) => {
  const headers = {
      Authorization: "Bearer " + token.replace(/"/g, ""),
    };


  return axios
  .get(
    `${variables.BASE_URL}/training-center/${id}`,
    
    {
      headers: headers,
    }
  )
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      if(error.request.readyState == 4 && error.request.response !== "" ){
        return error.response;
      } else {
        return { status: 999 };
      }
    });
  
}



export const deleteTrainer = async (id,token) => {
  const headers = {
      Authorization: "Bearer " + token.replace(/"/g, ""),
    };


  return axios
  .delete(
    `${variables.BASE_URL}/training-center/delete/${id}`,
    
    {
      headers: headers,
    }
  )
    .then(function (res) {
      return { status: 204 };
    })
    .catch(function (error) {
      if(error.request.readyState == 4 && error.request.response !== "" ){
        return error.response;
      } else {
        return { status: 999 };
      }
    });
  
}
