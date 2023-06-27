import axios from "axios";
import variables from "../variables";

export const postHorse = async (horseDetails,token) => {
    const headers = {
        Authorization: "Bearer " + token.replace(/"/g, ""),
      };
  
  
    return axios
    .post(
      `${variables.BASE_URL}/horse/add`,
      horseDetails,
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

  export const updateHorse = async (id,horseDetails,token) => {
    const headers = {
        Authorization: "Bearer " + token.replace(/"/g, ""),
      };
  
  
    return axios
    .put(
      `${variables.BASE_URL}/horse/update/${id}`,
      
      horseDetails,
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

export const getHorse = async (token) => {
    const headers = {
        Authorization: "Bearer " + token.replace(/"/g, ""),
      };


    return axios
    .get(
      `${variables.BASE_URL}/horse/list`,
      
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

export const getHorseById = async (id,token) => {
  const headers = {
      Authorization: "Bearer " + token.replace(/"/g, ""),
    };

  return axios
  .get(
    `${variables.BASE_URL}/horse/${id}`,
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



export const deleteHorse = async (id,token) => {
  const headers = {
      Authorization: "Bearer " + token.replace(/"/g, ""),
    };


  return axios
  .delete(
    `${variables.BASE_URL}/horse/delete/${id}`,
    
    {
      headers: headers,
    }
  )
    .then(function (res) {
      return {
        status: 204,
      };
    })
    .catch(function (error) {
      if(error.request.readyState == 4 && error.request.response !== "" ){
        return error.response;
      } else {
        return { status: 999 };
      }
    });
  
}

export const getHorseColors = async (token) => {
  const headers = {
    Authorization: "Bearer " + token.replace(/"/g, ""),
  };

  return axios
    .get(`${variables.BASE_URL}/horse/colors`, {
      headers: headers,
    })
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      if (error.request.readyState == 4 && error.request.response !== "") {
        return error.response;
      } else {
        return { status: 999 };
      }
    });
};

export const getHorseGenders = async (token) => {
  const headers = {
    Authorization: "Bearer " + token.replace(/"/g, ""),
  };

  return axios
    .get(`${variables.BASE_URL}/horse/genders`, {
      headers: headers,
    })
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      if (error.request.readyState == 4 && error.request.response !== "") {
        return error.response;
      } else {
        return { status: 999 };
      }
    });
};

export const getHorseBreeds = async (token) => {
  const headers = {
    Authorization: "Bearer " + token.replace(/"/g, ""),
  };

  return axios
    .get(`${variables.BASE_URL}/horse/breeds`, {
      headers: headers,
    })
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      if (error.request.readyState == 4 && error.request.response !== "") {
        return error.response;
      } else {
        return { status: 999 };
      }
    });
};

export const getHorseDiscipline = async (token) => {
  const headers = {
    Authorization: "Bearer " + token.replace(/"/g, ""),
  };

  return axios
    .get(`${variables.BASE_URL}/horse/disciplines`, {
      headers: headers,
    })
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      if (error.request.readyState == 4 && error.request.response !== "") {
        return error.response;
      } else {
        return { status: 999 };
      }
    });
};