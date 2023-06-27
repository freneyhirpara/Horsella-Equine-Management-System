import axios from "axios";
import variables from "../variables";

export const postBreeder = async (breedingDetails,token) => {
  const headers = { Authorization: "Bearer " + token.replace(/"/g, ""), };

  return axios.post(`${variables.BASE_URL}/breeding-center/add`,
    breedingDetails,
    { headers: headers, }
  ).then(function (res) {
    return res.data;
  }).catch(function (error) {
    if(error.request.readyState == 4 && error.request.response !== "" ){
        return error.response;
      } else {
        return { status: 999 };
      }
  });
}

export const updateBreeder = async (id,breedingDetails,token) => {
  const headers = { Authorization: "Bearer " + token.replace(/"/g, ""), };

  return axios.put(`${variables.BASE_URL}/breeding-center/update/${id}`,
    breedingDetails,
    { headers: headers, }
  ).then(function (res) {
    return res.data;
  }).catch(function (error) {
    if(error.request.readyState == 4 && error.request.response !== "" ){
        return error.response;
      } else {
        return { status: 999 };
      }
  });
}

export const getBreeder = async (token) => {
  const headers = { Authorization: "Bearer " + token.replace(/"/g, ""), };
  
  return axios.get(`${variables.BASE_URL}/breeding-center/all`,
    { headers: headers, }
  ).then(function (res) {
    return res.data;
  }).catch(function (error) {
    if(error.request.readyState == 4 && error.request.response !== "" ){
        return error.response;
      } else {
        return { status: 999 };
      }
  });
}

export const getBreederById = async (id,token) => {
  const headers = { Authorization: "Bearer " + token.replace(/"/g, ""), };

  return axios.get(`${variables.BASE_URL}/breeding-center/${id}`,
    { headers: headers, }
  ).then(function (res) {
    return res.data;
  }).catch(function (error) {
    if(error.request.readyState == 4 && error.request.response !== "" ){
        return error.response;
      } else {
        return { status: 999 };
      }
  });
}



export const deleteBreeder = async (id,token) => {
  const headers = { Authorization: "Bearer " + token.replace(/"/g, ""), };

  return axios.delete(`${variables.BASE_URL}/breeding-center/delete/${id}`,
    { headers: headers, }
  ).then(function (res) {   
    return { status: 204 };
  }).catch(function (error) {
    if(error.request.readyState == 4 && error.request.response !== "" ){
        return error.response;
      } else {
        return { status: 999 };
      }
  });
}
