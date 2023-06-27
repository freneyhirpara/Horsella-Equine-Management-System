import axios from "axios";
import variables from "../variables";

export const postRace = async (raceDetails,token) => {
  const headers = {
      Authorization: "Bearer " + token.replace(/"/g, ""),
      //'content-type':'multipart/form-data'
    };


  return axios
  .post(
    `${variables.BASE_URL}/race/add`,
    raceDetails,
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
export const updateRace = async (raceDetails,id, token) => {
  const headers = {
    Authorization: "Bearer " + token.replace(/"/g, ""),
  };
  return axios
    .put(`${variables.BASE_URL}/race/update/${id}`, raceDetails, {
      headers: headers,
    })
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
};

export const getRace = async (token) => {
  const headers = {
    Authorization: "Bearer " + token.replace(/"/g, ""),
  };

  return axios
    .get(
      `${variables.BASE_URL}/race/all`,

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
};

export const getRaceById = async (id, token) => {
  const headers = {
    Authorization: "Bearer " + token.replace(/"/g, ""),
  };

  return axios
    .get(
      `${variables.BASE_URL}/race/${id}`,

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
};

export const deleteRace = async (id, token) => {
  const headers = {
    Authorization: "Bearer " + token.replace(/"/g, ""),
  };

  return axios
    .delete(
      `${variables.BASE_URL}/race/delete/${id}`,

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
};
