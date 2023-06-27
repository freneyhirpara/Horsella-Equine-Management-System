import React,{useState, useEffect} from 'react';
import { connect } from "react-redux";
import { updateUser } from "../../../../api/UserApi";
import { updateUserRequest,
  updateUserSuccess,
  updateUserFailure } from "../../../../Redux/User/UserActions";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.min.css';

  import { setClient, unsetClient, setToken } from "../../../../Redux/Index";


function EditUser({
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  token,
  history,data
}) {
  const [id,setId] = useState(data ? data.id : null);
  const [firstName, setFirstName] = useState(data?data.first_name:null);
  const [lastName, setLastName] = useState(data?data.last_name:null);
  const [email, setEmail] = useState(data?data.email:null);
  const [phoneRegion, setPhoneRegion] = useState(data?data.phone_region:null);
  const [phoneNumber, setPhoneNumber] = useState(data?data.phone_number:null);
  const [country, setCountry] = useState(data?data.country:null);
  const [type, setType] = useState(data?data.role_id:null);
   const [previous_token,setpreviousToken] = useState();


  const handleSubmit = async (e) => {
    e.preventDefault();
    updateUserRequest();
    const res = await updateUser(
      id,{
        firstname: firstName,
        // middlename: middleName,
        lastname: lastName,
        email: email,
        phoneRegion: phoneRegion,
        phoneNumber: phoneNumber,
        country: country,
        role: type,        
      },previous_token
    );
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
      updateUserFailure(res.data);
    } else {
      const notify200 = () => toast.info("Updation Successful");
      notify200();
      updateUserSuccess(res.data);
      history.push("/dashboard/users");
    }
  };

  useEffect(() => {
      $(document).ready(function(e) {
        $('.selectpicker').selectpicker();
      })
    
    }, []);
  useEffect(async () => {

    let previousToken = sessionStorage.getItem("token");
    setpreviousToken(previousToken);
    const userRole = sessionStorage.getItem("role");
    const userEmail = sessionStorage.getItem("email");
    const userPageFlag = parseInt(sessionStorage.getItem("pageFlag"));
    if (previousToken) {
      await setToken(previousToken, userRole, userEmail, userPageFlag);
    }

    window.scrollTo(0, 0);

    if (sessionStorage.getItem('userDetail') != null) {
      let userDetail = JSON.parse(sessionStorage.getItem('userDetail'));
      setId(parseInt(userDetail.id));
      setFirstName(userDetail.first_name);
      setLastName(userDetail.last_name);
      setEmail(userDetail.email);
      setPhoneRegion(userDetail.phone_region);
      setPhoneNumber(userDetail.phone_number);
      setType(userDetail.role_id);
      setCountry(userDetail.country);
      
    } else {
      sessionStorage.setItem('userDetail', JSON.stringify({
        id: data.id,
        first_name : firstName,
        last_name:lastName,
        email:email,
        phone_region : phoneRegion,
        phone_number:phoneNumber,
        role_id:type,
        country:country,
        
      }));
    }
  }, []);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem('userDetail');
    };
  }, []);

    return (
        <div>
          <h2 className="mb-5 mt-4 text-center"> Edit User</h2>
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
            value={firstName}
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
            value={lastName}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={phoneNumber}
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
              value={phoneRegion}
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
            value={country}
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
              value={type}
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
          <button type="submit" className="btn form-buttons">
            Add
          </button>
        </div>
      </form>
    </div>
    )
}

const mapStateToProps = (state) => {
  return {
    data: state.user.data,
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserRequest: () => dispatch(updateUserRequest()),
    updateUserSuccess: (data) => dispatch(updateUserSuccess(data)),
    updateUserFailure: (error) => dispatch(updateUserFailure(error)),
    setToken: (token, role, email) => dispatch(setToken(token, role, email)),
   
  };
};




export default connect(mapStateToProps,mapDispatchToProps)(EditUser)
