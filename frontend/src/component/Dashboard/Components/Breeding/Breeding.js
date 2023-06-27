import React, { useState, useEffect } from "react";
import "../../css/table.css";
import "../../css/loader.css";
import { connect } from "react-redux";
import {
  getBreeder,
  getBreederById,
  deleteBreeder,
} from "../../../../api/BreedingApi";
import {
  getBreedingRequest,
  getBreedingSuccess,
  getBreedingFailure,
  getBreedingFailureById,
  getBreedingSuccessById,
  getBreedingRequestById,
  deleteBreedingRequest,
  deleteBreedingSuccess,
} from "../../../../Redux/Admin/Breeding/BreedingActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { setClient, unsetClient, setToken } from "../../../../Redux/Index";

function Breeding({
  token,
  history,
  getBreedingFailure,
  getBreedingRequest,
  getBreedingSuccess,
  getBreedingFailureById,
  getBreedingSuccessById,
  getBreedingRequestById,
  deleteBreedingRequest,
  deleteBreedingSuccess,
}) {
  const [record, setRecord] = useState({
    data: [],
  });
  useEffect(async () => {
    const previousToken = sessionStorage.getItem("token");
    const userRole = sessionStorage.getItem("role");
    const userEmail = sessionStorage.getItem("email");
    const userPageFlag = parseInt(sessionStorage.getItem("pageFlag"));
    if (previousToken) {
      setToken(previousToken, userRole, userEmail, userPageFlag);
    }
    window.scrollTo(0, 0);
    await getData(previousToken);
    $(document).ready(function () {
      $("#myTable").DataTable();
      $("#myTable_wrapper").addClass("container");
    });
    $(".loader").addClass("invisible");

    sessionStorage.removeItem("breedingCenterDetails");
  }, [token]);

  async function updateCenter(id, previousToken) {
    getBreedingRequestById();
    const res = await getBreederById(id, previousToken);

    if (res.status != 200) {
      const notify400 = () =>
        toast.error(
          "There is some error in your request. Please try again, if error persists submit your query through our query form."
        );
      const notify401 = () => toast.info(res.data.error.message);
      const notify500 = () => toast.error(res.data.error.message);
      res.status == 400
        ? notify400()
        : res.status == 401
        ? notify401()
        : notify500();
      getBreedingfailureById(res.data);
      history.push("/dashboard/breeding");
    } else {
      getBreedingSuccessById(res.data);
      history.push("/dashboard/editbreedingcenter");
    }
  }

  async function deleteCenter(id, previousToken) {
    deleteBreedingRequest();
    const res = await deleteBreeder(id, previousToken);
    if (res.status != 204) {
      const notify400 = () =>
        toast.error(
          "There is some error in your request. Please try again, if error persists submit your query through our query form."
        );
      const notify401 = () => toast.info(res.data.error.message);
      const notify500 = () => toast.error(res.data.error.message);
      res.status == 400
        ? notify400()
        : res.status == 401
        ? notify401()
        : notify500();
      deleteBreedingFailure(res.data);
      history.push("/dashboard/breeding");
    } else {
      const notify204 = () => toast.success("Deletion Successful.");
      notify204();
      deleteBreedingSuccess(true);
      history.push("/dashboard/deletebreedingcenter");
    }
  }

  async function getData(previousToken) {
    getBreedingRequest();
    const res = await getBreeder(previousToken);

    if (res.status != 200) {
      const notify400 = () =>
        toast.error(
          "There is some error in your request. Please try again, if error persists submit your query through our query form."
        );
      const notify401 = () => toast.info(res.data.error.message);
      const notify500 = () => toast.error(res.data.error.message);
      res.status == 400
        ? notify400()
        : res.status == 401
        ? notify401()
        : notify500();
      history.push("/dashboard");
    } else {
      getBreedingSuccess(res.data);
      setRecord({
        data: res.data.map((r, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{r.center_name}</td>
              <td>{r.owner_name}</td>
              <td>
                <div className="desc">{r.description}</div>
              </td>
              <td>{r.email}</td>
              <td className="last-col actions d-flex">
                <i
                  onClick={updateCenter.bind(this, r.id, previousToken)}
                  className="fas fa-edit fa-icon mr-3 form-edit"
                ></i>
                <i
                  onClick={deleteCenter.bind(this, r.id, previousToken)}
                  className="fas fa-trash-alt fa-icon mr-3 form-delete"
                ></i>
              </td>
            </tr>
          );
        }),
      });
      history.push("/dashboard/breeding");
    }
  }

  return (
    <>
      <h2 className="mb-5 mt-4 text-center">Breeding Centers</h2>
      <div className="content">
        <div className="loader">Loading ...</div>
        <table id="myTable" className="table table-max-content table-responsive table-hover pt-3">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Center Name</th>
              <th scope="col">Owner Name</th>
              <th scope="col">Description</th>
              <th scope="col">Email</th>
              <th scope="col last-col" className="actions">
                <i
                  onClick={() => {
                    history.push("/dashboard/addbreedingcenter");
                  }}
                  className="fas fa-plus fa-icon form-add"
                ></i>
              </th>
            </tr>
          </thead>

          <tbody>{record.data}</tbody>
        </table>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBreedingRequest: () => dispatch(getBreedingRequest()),
    getBreedingSuccess: (data) => dispatch(getBreedingSuccess(data)),
    getBreedingFailure: (error) => dispatch(getBreedingFailure(error)),

    getBreedingRequestById: () => dispatch(getBreedingRequestById()),
    getBreedingSuccessById: (data) => dispatch(getBreedingSuccessById(data)),
    getBreedingFailureById: (error) => dispatch(getBreedingFailureById(error)),

    deleteBreedingRequest: () => dispatch(deleteBreedingRequest()),
    deleteBreedingSuccess: (data) => dispatch(deleteBreedingSuccess(data)),
    deleteBreedingFailure: (error) => dispatch(deleteBreedingFailure(error)),

    setToken: (token, role, email) => dispatch(setToken(token, role, email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Breeding);
