import React, { useState ,useEffect} from "react";
import { connect } from "react-redux";
import { registerUser } from "../../../../api/UserApi";
import {
  setClient,
  unsetClient,
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFailure,
} from "../../../../Redux/Index";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.min.css';

function AddUser({
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFailure,
  token,
  history,
}) {
  const [firstName, setFirstName] = useState();
  // const [middleName, setMiddleName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phoneRegion, setPhoneRegion] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [country, setCountry] = useState();
  const [type, setType] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addbtn = document.getElementById('add-btn');
    addbtn.textContent = "Adding ...";
    addbtn.setAttribute('disabled', 'disabled');
    userRegisterRequest();
    const res = await registerUser(
      {
        firstname: firstName,
        // middlename: middleName,
        lastname: lastName,
        email: email,
        phoneRegion: phoneRegion,
        phoneNumber: phoneNumber,
        country: country,
        role: type,
        password: password,
      },
      token
    );

    if(res.status != 201){
      userRegisterFailure(res.data);
      const notify401 = () => toast.info(res.data.error.message);
      const notify500 = () => toast.error(res.data.error.message);
      const notify999 = () => toast.error("Sorry but we are unable to process your request. Please contact our Administrator.");
      res.status == 401 ? notify401() : null;
      res.status == 500 ? notify500() : null;
      res.status == 999 ? notify999() : null;
      if(res.status == 400) {
        toast.error(res.data.error.message);
      }
      // history.push("/dashboard/register");
    } else {
      addbtn.textContent = "Add";
      addbtn.removeAttribute("disabled");
      userRegisterSuccess();
      const notify201 = () => toast.success("User Registration Successful");
      notify201();
      history.push("/dashboard/users");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
      $(document).ready(function(e) {
        $('.selectpicker').selectpicker();
      })
    
    }, []);
    
  return (
    <>
      <h2 className="mb-5 mt-4 text-center"> Register New User</h2>
      <form className="row g-3 mt-3 w-75 m-auto" onSubmit={handleSubmit}>
        <div className="col-lg-6 col-md-6 px-lg-5 px-md-3 mt-3">
          <label htmlFor="FirstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="FirstName"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="col-lg-6 col-md-6 px-lg-5 px-md-3 mt-3">
          <label htmlFor="LastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="LastName"
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="col-md-6 px-lg-5 px-md-3 mt-3">
          <label htmlFor="Email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="col-md-6 px-lg-5 px-md-3 mt-3">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="col-md-6 px-lg-5 px-md-3 mt-3">
          <label htmlFor="PhoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="PhoneNumber"
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="col-md-6 px-lg-5 px-md-3 mt-3">
          <label htmlFor="PhoneRegion" className="form-label">
            Phone Region
          </label>
          <div>
            <select
              id="PhoneRegion"
              className="form-select selectpicker f w-100"
              onChange={(e) => setPhoneRegion(e.target.value)}
              required
              defaultValue="-1"
            >
              <option value="-1" disabled>Phone Region...</option>
              <option value="IN">IN</option>
            </select>
          </div>
        </div>

        <div className="col-md-6 px-lg-5 px-md-3 mt-3">
          <label htmlFor="Country" className="form-label">
            Country
          </label>
          <input
            type="text"
            className="form-control"
            id="Country"
            required
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        
        <div className="col-md-6 px-lg-5 px-md-3 mt-3 select">
        <label htmlFor="UserRole" className="form-label">
            User Type
          </label>
          <div>
            <select className="form-select form-select-lg mb-3 selectpicker f w-100" aria-label=".form-select-lg example"
              id="UserRole"
              required
              onChange={(e) => setType(e.target.value)}
              defaultValue="-1"
            >
              <option value="-1" disabled>User Role</option>
              <option value="1">Admin</option>
              <option value="2">Owner</option>
              <option value="3">Trainer</option>
              <option value="4">Breeder</option>
              <option value="5">Helper</option>
            </select>
          </div>
        </div>
        <div className="col-12 mt-4">
          <button type="submit" id="add-btn" className="btn form-buttons">
            Add
          </button>
        </div>
      </form>
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
    userRegisterRequest: () => dispatch(userRegisterRequest()),
    userRegisterSuccess: () => dispatch(userRegisterSuccess()),
    userRegisterFailure: () => dispatch(userRegisterFailure()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
