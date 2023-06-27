import axios from "axios";
import variables from "../variables";

export const loginUser = async (credentials) => {
  return axios
    .post(`${variables.BASE_URL}/user/login`, credentials)
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

export const registerUser = async (userDetails, token) => {
  const headers = {
    Authorization: "Bearer " + token.replace(/"/g, ""),
  };
  return axios
    .post(`${variables.BASE_URL}/user/register`, userDetails, {
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

export const getHorses = (token) => {
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
      if (error.request.readyState == 4 && error.request.response !== "") {
        return error.response;
      } else {
        return { status: 999 };
      }
    });
};
export const postParticipate = async (postDetails, token, id) => {
  const headers = {
    Authorization: "Bearer " + token.replace(/"/g, ""),
  };
  return axios
    .post(`${variables.BASE_URL}/race/${id}/participate`, postDetails, {
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

export const getParticipates = async (token, id) => {
  const headers = {
    Authorization: "Bearer " + token.replace(/"/g, ""),
  };

  return axios
    .get(`${variables.BASE_URL}/race/${id}/participants`, {
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

//-------------------------
export const getUsers = async (token, id) => {
  const headers = {
    Authorization: "Bearer " + token.replace(/"/g, ""),
  };

  return axios
    .get(`${variables.BASE_URL}/user/all`, {
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

export const updateUser = async (id, userDetails, token) => {
  const headers = {
    Authorization: "Bearer " + token.replace(/"/g, ""),
  };

  return axios
    .put(`${variables.BASE_URL}/user/update/${id}`, userDetails, {
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

export const getUserById = async (id, token) => {
  const headers = {
    Authorization: "Bearer " + token.replace(/"/g, ""),
  };

  return axios
    .get(
      `${variables.BASE_URL}/user/${id}`,

      {
        headers: headers,
      }
    )
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

export const deleteUser = async (id, token) => {
  const headers = {
    Authorization: "Bearer " + token.replace(/"/g, ""),
  };

  return axios
    .delete(
      `${variables.BASE_URL}/user/delete/${id}`,

      {
        headers: headers,
      }
    )
    .then(function (res) {
      return { status: 204 };
    })
    .catch(function (error) {
      if (error.request.readyState == 4 && error.request.response !== "") {
        return error.response;
      } else {
        return { status: 999 };
      }
    });
};

export const changePassword = async (token, payload) => {
  const headers = {
    Authorization: "Bearer " + token.replace(/"/g, ""),
  };

  return axios
    .put(`${variables.BASE_URL}/user/changePassword`, payload, {
      headers: headers,
    })
    .then(function (res) {
      return { status: 204 };
    })
    .catch(function (error) {
      if (error.request.readyState == 4 && error.request.response !== "") {
        return error.response;
      } else {
        return { status: 999 };
      }
    });
};

export const applyReset = async (email) => {

  return axios
    .post(`${variables.BASE_URL}/user/applyreset`, { email })
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

export const resetPassword = async (token, { newPass }) => {
  return axios
    .post(`${variables.BASE_URL}/user/resetpassword`, { newPass }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(function (res) {
      return { status: 204 };
    })
    .catch(function (error) {
      if (error.request.readyState == 4 && error.request.response !== "") {
        return error.response;
      } else {
        return { status: 999 };
      }
    });
};
