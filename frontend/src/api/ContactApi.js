import axios from "axios";
import variables from "../variables";

export const postContact = async (contactDetails) => {
    const headers = {};


    return axios
    .post(
      `${variables.BASE_URL}/contact-us/add`,
      contactDetails,
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


export const getContact = async (token) => {
    const headers = {
        Authorization: "Bearer " + token.replace(/"/g, ""),
      };


    return axios
    .get(
      `${variables.BASE_URL}/contact-us/all`,
      {
        headers: headers,
      },
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

