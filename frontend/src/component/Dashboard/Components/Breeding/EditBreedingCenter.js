import React,{useState, useEffect} from 'react';
import { connect } from "react-redux";
import { updateBreeder } from "../../../../api/BreedingApi";
import { updateBreedingRequest,
  updateBreedingSuccess,
  updateBreedingFailure } from "../../../../Redux/Admin/Breeding/BreedingActions";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.min.css';

  import { setClient, unsetClient, setToken } from "../../../../Redux/Index";


  function EditBreedingCenter({
    updateBreedingRequest,
    updateBreedingSuccess,
    updateBreedingFailure,
    token,
    history,data
  }) {

    let previousToken;
  const dt = data
  const [center_id,setId] = useState(-1);
  const [center_name,setCenterName] = useState(dt?dt.center_name:null);
  const [description,setDescription] = useState(dt?dt.description:null);
  const [owner_name,setOwnerName] = useState(dt?dt.owner_name:null);
  const [experience,setExperience] = useState(dt?dt.experience:null);
  const [address,setAddress] = useState(dt?dt.address:null);
  const [email,setEmail] = useState(dt?dt.email:null);
  const [website,setWebsite] = useState(dt?dt.website:null);
  const [contact,setContact] = useState(dt?dt.contact:null);
  const [working_hours,setWorkingHours] = useState(dt?dt.working_hours:null);
  

  useEffect(async () => {

    let previousToken = sessionStorage.getItem("token");
    const userRole = sessionStorage.getItem("role");
    const userEmail = sessionStorage.getItem("email");
    const userPageFlag = parseInt(sessionStorage.getItem("pageFlag"));
    if (previousToken) {
      await setToken(previousToken, userRole, userEmail, userPageFlag);
    }

    window.scrollTo(0, 0);
    if (sessionStorage.getItem('breedingCenterDetails') != null) {
      let breedingCenterDetail = JSON.parse(sessionStorage.getItem('breedingCenterDetails'));
      setId(parseInt(breedingCenterDetail.id));
      setCenterName(breedingCenterDetail.centerName);
      setDescription(breedingCenterDetail.description);
      setOwnerName(breedingCenterDetail.ownerName);
      setExperience(breedingCenterDetail.experience);
      setAddress(breedingCenterDetail.address);
      setEmail(breedingCenterDetail.email);
      setWebsite(breedingCenterDetail.website);
      setContact(breedingCenterDetail.contact);
      setWorkingHours(breedingCenterDetail.workingHours);
    } else {
      setId(data.id);
      sessionStorage.setItem('breedingCenterDetails', JSON.stringify({
        id: data.id,
        centerName : center_name,
        description:description,
        ownerName:owner_name,
        experience : experience,
        address:address,
        email:email,
        website:website,
        contact:contact,
        workingHours:working_hours,
      }));
    }
  }, []);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem('breedingCenterDetails');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateBreedingRequest();
    const res = await updateBreeder(
        center_id,{
        centerName : center_name,
        description:description,
        ownerName:owner_name,
        experience : experience,
        address:address,
        email:email,
        website:website,
        contact:contact,
        workingHours:working_hours,
        
      },token || previousToken
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
      updateBreedingFailure(res.data);
      history.push("/dashboard/editbreedingcenter");
    } else {
      const notify200 = () => toast.info("Updation Successful.");
      notify200();
      updateBreedingSuccess(res.data);
      history.push("/dashboard/breeding");
    }
  };


    return (
        <div>
          <h2 className="w-100 text-center mt-5 mb-3">Edit Breeding Center</h2>
      <form className="row g-3 w-75 m-auto" onSubmit={handleSubmit}>
        <div className="col-lg-6 col-md-6 px-lg-5 px-md-3 pt-3">
          <label htmlFor="CenterName" className="form-label">
          Breeding Center Name
          </label>
          <input
            type="text"
            className="form-control"
            required
            id="CenterName"
            value={center_name}
            onChange={(e) => {
                setCenterName(e.target.value)}}
          />
        </div>

        <div className="col-lg-6 col-md-6 px-lg-5 px-md-3 pt-3">
          <label htmlFor="OwnerName" className="form-label">
          Owner Name
          </label>
          <input
            type="text"
            className="form-control"
            required
            id="OwnerName"
            value={owner_name}
            onChange={(e) => setOwnerName(e.target.value)}
          />
        </div>

        <div className="col-lg-6 col-md-6 px-lg-5 px-md-3 pt-3">
          <label htmlFor="Email" className="form-label">
          Email
          </label>
          <input
            type="text"
            className="form-control"
            required
            id="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-lg-6 col-md-6 px-lg-5 px-md-3 pt-3">
          <label htmlFor="Website" className="form-label">
         Website
          </label>
          <input
            type="text"
            className="form-control"
            required
            id="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        

        

        <div className="col-lg-6 col-md-6 px-lg-5 px-md-3 pt-3">
          <label htmlFor="Experience" className="form-label">
            Experience(in years)
          </label>
          <input
            type="number"
            className="form-control"
            required
            id="Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>


        <div className="col-lg-6 col-md-6 px-lg-5 px-md-3 pt-3">
          <label htmlFor="WorkingHours" className="form-label">
          Working Hours
          </label>
          <input
            type="text"
            className="form-control"
            required
            id="WorkingHours"
            value={working_hours}
            onChange={(e) => setWorkingHours(e.target.value)}
          />
        </div>

        <div className="col-lg-6 col-md-6 px-lg-5 px-md-3 pt-3">
          <label htmlFor="Contact" className="form-label">
            Contact
          </label>
          <input
            type="text"
            className="form-control"
            required
            id="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>

        <div className="col-lg-6 col-md-6 px-lg-5 px-md-3 pt-3">
          <label htmlFor="Address" className="form-label">
          Address
          </label>
          <input
            type="text"
            className="form-control"
            required
            id="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="col-lg-12 mt-5">
          <label htmlFor="Description" className="form-label">
          Description
          </label>
          <textarea
            type="text"
            className="form-control"
            required
            id="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        

        <div className="col-12 mt-3">
          <button type="submit" className="btn form-buttons">
           Save
          </button>
        </div>
      </form>
    </div>
    )
}

const mapStateToProps = (state) => {
  return {
    data: state.breedingreducer.data,
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateBreedingRequest: () => dispatch(updateBreedingRequest()),
    updateBreedingSuccess: (data) => dispatch(updateBreedingSuccess(data)),
    updateBreedingFailure: (error) => dispatch(updateBreedingFailure(error)),

    setToken: (token, role, email) => dispatch(setToken(token, role, email)),
  };
};




export default connect(mapStateToProps,mapDispatchToProps)(EditBreedingCenter)
