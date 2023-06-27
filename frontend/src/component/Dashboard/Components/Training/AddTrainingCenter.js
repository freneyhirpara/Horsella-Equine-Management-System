import React,{useState, useEffect} from 'react';
import { connect } from "react-redux";
import { postTrainer } from "../../../../api/TrainingApi";
import { postTrainingRequest,
  postTrainingSuccess,
  postTrainingFailure } from "../../../../Redux/Admin/Training/TrainingActions";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.min.css';


function AddTrainingCenter({
  postTrainingRequest,
  postTrainingSuccess,
  postTrainingFailure,
  token,
  history,
}) {
  

  const [center_name,setCenterName] = useState();
  const [description,setDescription] = useState();
  const [owner_name,setOwnerName] = useState();
  const [experience,setExperience] = useState();
  const [address,setAddress] = useState();
  const [email,setEmail] = useState();
  const [website,setWebsite] = useState();
  const [contact,setContact] = useState();
  const [working_hours,setWorkingHours] = useState();


  const handleSubmit = async (e) => {
    e.preventDefault();
    postTrainingRequest();
    const res = await postTrainer(
      {
        centerName : center_name,
        description:description,
        ownerName:owner_name,
        experience : experience,
        address:address,
        email:email,
        website:website,
        contact:contact,
        workingHours:working_hours,
      },token
    );

    if(res.status != 201){
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
      postTrainingFailure(res.data);
      history.push("/dashboard/addtrainingcenter");
    } else {
      const notify201 = () => toast.success("Training center added successfully");
      notify201();
      postTrainingSuccess(res.data);
      history.push('/dashboard/training');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    return (
        <div>
          <h2 className="w-100 text-center mt-5 mb-3">Add Training Center</h2>
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
            onChange={(e) => setCenterName(e.target.value)}
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
            placeholder="E.g. 9897867856"
            pattern="[0-9]{10}"
            id="Contact"
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
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="col-lg-12 px-lg-5 px-md-3 mt-5">
          <label htmlFor="Description" className="form-label">
          Description
          </label>
          <textarea
            className="form-control"
            required
            id="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="col-12 mt-5">
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
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postTrainingRequest: () => dispatch(postTrainingRequest()),
    postTrainingSuccess: (data) => dispatch(postTrainingSuccess(data)),
    postTrainingFailure: (error) => dispatch(postTrainingFailure(error)),

   
  };
};




export default connect(mapStateToProps,mapDispatchToProps)(AddTrainingCenter)
