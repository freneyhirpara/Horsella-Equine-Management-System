import React, { useState, useEffect } from "react";
import "../../css/table.css";
import "../../css/loader.css";
import { connect } from "react-redux";
import {
  getUsers,
  getUserById,
  deleteUser,
} from "../../../../api/UserApi";
import {
  getUserRequest,
  getUserSuccess,
  getUserFailure,
  getUserFailureById,
  getUserSuccessById,
  getUserRequestById,
  deleteUserRequest,
  deleteUserSuccess,
} from "../../../../Redux/User/UserActions";
// import AddUserCenter from "./AddUserCenter";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.min.css';

  import { setClient, unsetClient, setToken } from "../../../../Redux/Index";

function Users({
  token,
  history,
  getUserRequest,
  getUserSuccess,
  getUserFailure,
  getUserFailureById,
  getUserSuccessById,
  getUserRequestById,
  deleteUserRequest,
  deleteUserSuccess,
}) {
  const [records, setRecords] = useState({
    data: [],
  });
  useEffect(async() => {

    const previousToken = sessionStorage.getItem("token");
    const userRole = sessionStorage.getItem("role");
    const userEmail = sessionStorage.getItem("email");
    const userPageFlag = parseInt(sessionStorage.getItem("pageFlag"));
    if (previousToken) {
      await setToken(previousToken, userRole, userEmail, userPageFlag);
    }

    window.scrollTo(0, 0);
    await getData(previousToken);
    $(document).ready( function () {
        $('#myTable').DataTable();
        $('#myTable_wrapper').addClass('container');
    } );
    $('.loader').addClass('invisible');
    sessionStorage.removeItem('userDetail');  
}, []);


  async function updateCenter(id, previousToken) {
    getUserRequestById();
    const res = await getUserById(id,previousToken);
    if(res.status != 200){
      // const notify400 = () => toast.error("There is some error in your request. Please try again, if error persists submit your query through our query form.");
      const notify401 = () => toast.info(res.data.error.message);
      const notify500 = () => toast.error(res.data.error.message);
      const notify999 = () => toast.error("Sorry but we are unable to process your request. Please contact our Administrator.");
      /* res.status == 400 ? notify400() :  */
      res.status == 401 ? notify401() : null;
      res.status == 500 ? notify500() : null;
      res.status == 999 ? notify999() : null;
      if(res.status == 400) {
        toast.error(res.data.error.message);
      }
      history.push("/dashboard/users");
    } else {
      getUserSuccessById(res.data);
      history.push("/dashboard/edituser");
    }
  }

  async function deleteCenter(id, previousToken) {
    deleteUserRequest();
    const res = await deleteUser(id,previousToken);
    if(res.status != 204){
      // const notify400 = () => toast.error("There is some error in your request. Please try again, if error persists submit your query through our query form.");
      const notify401 = () => toast.info(res.data.error.message);
      const notify500 = () => toast.error(res.data.error.message);
      const notify999 = () => toast.error("Sorry but we are unable to process your request. Please contact our Administrator.");
      /* res.status == 400 ? notify400() :  */
      res.status == 401 ? notify401() : null;
      res.status == 500 ? notify500() : null;
      res.status == 999 ? notify999() : null;
      if(res.status == 400) {
        toast.error(res.data.error.message);
      }
      history.push("/dashboard/users");
    } else {
      const notify204 = () => toast.error("Deletion successful");
      notify204();
      deleteUserSuccess(true);
      history.push("/dashboard/deleteuser");
    }
  }

  async function getData(previousToken) {
    getUserRequest();
    const res = await getUsers(previousToken);
    
    if(res.status != 200){
      // const notify400 = () => toast.error("There is some error in your request. Please try again, if error persists submit your query through our query form.");
      const notify401 = () => toast.info(res.data.error.message);
      const notify500 = () => toast.error(res.data.error.message);
      const notify999 = () => toast.error("Sorry but we are unable to process your request. Please contact our Administrator.");
      /* res.status == 400 ? notify400() :  */
      res.status == 401 ? notify401() : null;
      res.status == 500 ? notify500() : null;
      res.status == 999 ? notify999() : null;
      if(res.status == 400) {
        toast.error(res.data.error.message);
      }
      history.push("/dashboard/users")
    } else {
      getUserSuccess(res.data);
      setRecords({
        data: res.data.map((r, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index+1}</th>
              <td>{r.first_name}</td>
              <td>{r.last_name}</td>
              <td>{r.email}</td>
              <td>{r.role}</td>
              <td className="last-col actions">
                <i
                  onClick={updateCenter.bind(this, r.id, previousToken)}
                  className="fas fa-edit fa-icon mr-3 form-edit"
                ></i>{" "}
                <i
                  onClick={deleteCenter.bind(this, r.id, previousToken)}
                  className="fas fa-trash-alt fa-icon mr-3 form-delete"
                ></i>
              </td>
            </tr>
          );
        }),
      });
    }
  }

  return (
    <>
      <h2 className="mb-5 mt-4 text-center">Users</h2>
      <div className="content">
        <div className="loader">
          Loading ...
        </div>

        <table id="myTable" className="table table-max-content table-responsive table-hover pt-3 user-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col last-col" className="actions">
                <i
                  onClick={() => {
                    history.push("/dashboard/adduser");
                  }}
                  className="fas fa-plus fa-icon form-add"
                ></i>
              </th>
            </tr>
          </thead>

          <tbody>{records.data}</tbody>
        </table>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return{
  token: state.user.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserRequest: () => dispatch(getUserRequest()),
    getUserSuccess: (data) => dispatch(getUserSuccess(data)),
    getUserFailure: (error) => dispatch(getUserFailure(error)),

    getUserRequestById: () => dispatch(getUserRequestById()),
    getUserSuccessById: (data) => dispatch(getUserSuccessById(data)),
    getUserFailureById: (error) => dispatch(getUserFailureById(error)),

    deleteUserRequest: () => dispatch(deleteUserRequest()),
    deleteUserSuccess: (data) => dispatch(deleteUserSuccess(data)),
    deleteUserFailure: (error) => dispatch(deleteUserFailure(error)),

    setToken: (token, role, email) => dispatch(setToken(token, role, email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
