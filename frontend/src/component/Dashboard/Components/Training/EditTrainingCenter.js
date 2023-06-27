import React,{useState, useEffect} from 'react';
import { connect } from "react-redux";
import { updateTrainer } from "../../../../api/TrainingApi";
import { updateTrainingRequest,
  updateTrainingSuccess,
  updateTrainingFailure } from "../../../../Redux/Admin/Training/TrainingActions";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.min.css';

  import { setClient, unsetClient, setToken } from "../../../../Redux/Index";


function EditTrainingCenter({
  updateTrainingRequest,
  updateTrainingSuccess,
  updateTrainingFailure,
  token,
  history,data
}) {

  const [center_id,setId] = useState(data ? data.id : null);
  const [previous_token,setpreviousToken] = useState();
  const [center_name,setCenterName] = useState(data?data.center_name:null);
  const [description,setDescription] = useState(data?data.description:null);
  const [owner_name,setOwnerName] = useState(data?data.owner_name:null);
  const [experience,setExperience] = useState(data?data.experience:null);
  const [address,setAddress] = useState(data?data.address:null);
  const [email,setEmail] = useState(data?data.email:null);
  const [website,setWebsite] = useState(data?data.website:null);
  const [contact,setContact] = useState(data?data.contact:null);
  const [working_hours,setWorkingHours] = useState(data?data.working_hours:null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    updateTrainingRequest();
    const res = await updateTrainer(
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
      updateTrainingFailure(res.data);
    } else {
      const notify200 = () => toast.info("Updation Successful");
      notify200();
      updateTrainingSuccess(res.data);
      history.push("/dashboard/training");
    }
  };

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

    if (sessionStorage.getItem('trainingCenterDetail') != null) {
      let trainingCenterDetail = JSON.parse(sessionStorage.getItem('trainingCenterDetail'));
      setId(parseInt(trainingCenterDetail.id));
      setCenterName(trainingCenterDetail.centerName);
      setDescription(trainingCenterDetail.description);
      setOwnerName(trainingCenterDetail.ownerName);
      setExperience(trainingCenterDetail.experience);
      setAddress(trainingCenterDetail.address);
      setEmail(trainingCenterDetail.email);
      setWebsite(trainingCenterDetail.website);
      setContact(trainingCenterDetail.contact);
      setWorkingHours(trainingCenterDetail.workingHours);
    } else {
      sessionStorage.setItem('trainingCenterDetail', JSON.stringify({
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
      sessionStorage.removeItem('trainingCenterDetail');
    };
  }, []);

    return (
        <div>
          <h2 className="w-100 text-center mt-5 mb-3">Edit Training Center</h2>
      <form className="row g-3 w-75 m-auto" onSubmit={handleSubmit}>
        <div className="col-lg-6 col-md-6 px-lg-5 px-md-3 pt-3">
          <label htmlFor="CenterName" className="form-label">
          Training Center Name
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
            type="email"
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
            type="text"
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
            type="tel"
            className="form-control"
            required
            id="Contact"
            pattern="[0-9]{10}"
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
            className="form-control"
            required
            id="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="col-12 pt-3 mt-5">
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
    data: state.trainingreducer.data,
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTrainingRequest: () => dispatch(updateTrainingRequest()),
    updateTrainingSuccess: (data) => dispatch(updateTrainingSuccess(data)),
    updateTrainingFailure: (error) => dispatch(updateTrainingFailure(error)),
    setToken: (token, role, email) => dispatch(setToken(token, role, email)),
   
  };
};




export default connect(mapStateToProps,mapDispatchToProps)(EditTrainingCenter)
