import React,{useState, useEffect} from 'react';
import { connect } from "react-redux";
import { postBreeder } from "../../../../api/BreedingApi";
import { postBreedingRequest,
  postBreedingSuccess,
  postBreedingFailure } from "../../../../Redux/Admin/Breeding/BreedingActions";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.min.css';


function AddBreedingCenter({
  postBreedingRequest,
  postBreedingSuccess,
  postBreedingFailure,
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
   
    postBreedingRequest();
    const res = await postBreeder(
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
      postBreedingFailure(res.data);
      // history.push("/dashboard/addbreedingcenter");
    } else {
      const notify201 = () => toast.success("Addition Successful.");
      notify201();
      postBreedingSuccess(res.data);
      history.push('/dashboard/breeding');
    }
  };

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return (
        <div>
          <h2 className="w-100 text-center mt-5 mb-3">Add Breeding Center</h2>
      <form className="row g-3 w-75 m-auto" onSubmit={handleSubmit}>
        <div className="col-lg-6 col-md-6 px-lg-5 px-md-3 pt-3">
          <label htmlFor="CenterName" className="form-label">
          Breeding Center Name
          </label>
          <input
            type="text"
            className="form-control"
            id="CenterName"
            required
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
            id="OwnerName"
            required
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
            id="Email"
            required
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
            id="WorkingHours"
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
            id="Contact"
            placeholder="E.g. 9785686758"
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
            id="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="col-lg-12 col-md-12 mt-5">
          <label htmlFor="Description" className="form-label">
          Description
          </label>
          <textarea
            className="form-control"
            id="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>        

        <div className="col-12 mt-3">
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
    postBreedingRequest: () => dispatch(postBreedingRequest()),
    postBreedingSuccess: (data) => dispatch(postBreedingSuccess(data)),
    postBreedingFailure: (error) => dispatch(postBreedingFailure(error)),

   
  };
};




export default connect(mapStateToProps,mapDispatchToProps)(AddBreedingCenter)
