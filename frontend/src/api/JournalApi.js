import axios from 'axios';
import variables from '../variables';

export const postEvent = async (eventObject, token) => {
  const headers = {
    Authorization: 'Bearer ' + token.replace(/"/g, ''),
  };

  return axios
    .post(`${variables.BASE_URL}/journal`, eventObject, {
      headers: headers,
    })
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      if (error.request.readyState == 4 && error.request.response !== '') {
        return error.response;
      } else {
        return { status: 999 };
      }
    });
};

export const updateEvent = async (eventObject, id, token) => {
  const headers = {
    Authorization: 'Bearer ' + token.replace(/"/g, ''),
  };
  return axios
    .put(`${variables.BASE_URL}/journal/${id}`, eventObject, {
      headers: headers,
    })
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      if (error.request.readyState == 4 && error.request.response !== '') {
        return error.response;
      } else {
        return { status: 999 };
      }
    });
};

export const getAllEvents = async (token) => {
  const headers = {
    Authorization: 'Bearer ' + token.replace(/"/g, ''),
  };

  return axios
    .get(`${variables.BASE_URL}/journal/all`, {
      headers: headers,
    })
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      if (error.request.readyState == 4 && error.request.response !== '') {
        return error.response;
      } else {
        return { status: 999 };
      }
    });
};

export const getEventById = async (id, token) => {
  const headers = {
    Authorization: 'Bearer ' + token.replace(/"/g, ''),
  };

  return axios
    .get(`${variables.BASE_URL}/journal/${id}`, {
      headers: headers,
    })
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      if (error.request.readyState == 4 && error.request.response !== '') {
        return error.response;
      } else {
        return { status: 999 };
      }
    });
};

export const getEventType = async (token) => {
  const headers = {
    Authorization: 'Bearer ' + token.replace(/"/g, ''),
  };

  return axios
    .get(`${variables.BASE_URL}/journal/eventtypes`, {
      headers: headers,
    })
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      if (error.request.readyState == 4 && error.request.response !== '') {
        return error.response;
      } else {
        return { status: 999 };
      }
    });
};

export const deleteEvent = async (id, token) => {
  const headers = {
    Authorization: 'Bearer ' + token.replace(/"/g, ''),
  };

  return axios
    .delete(`${variables.BASE_URL}/journal/${id}`, {
      headers: headers,
    })
    .then(function (res) {
      return { status: 204 };
    })
    .catch(function (error) {
      if (error.request.readyState == 4 && error.request.response !== '') {
        return error.response;
      } else {
        return { status: 999 };
      }
    });
};
