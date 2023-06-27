import React,{useState,useEffect} from 'react'
import { connect } from "react-redux";
import { postRace} from "../../../../api/RaceApi";
import { postRaceRequest,
  postRaceSuccess,
  postRaceFailure } from "../../../../Redux/Admin/Trotting/RaceActions";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.min.css';

function AddRaces({postRaceRequest,
  postRaceSuccess,
  postRaceFailure,token,history}) {



  
  const [race_name,setRaceName] = useState();
  const [race_course,setRaceCourse] = useState();
  const [race_date,setRaceDate] = useState();
  const [race_length,setRaceLength] = useState();
  const [race_horse_age_criteria,setRaceHorseAgeCriteria] = useState();
  const [race_horse_weight_criteria,setRaceHorseWeightCrieria] = useState();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ( new Date(race_date) <= new Date() ) {
      toast.warning('Please enter a valid date');
      return;
    }
      
    postRaceRequest();
    const res = await postRace(
      {
        raceName : race_name,
        raceCourse:race_course,
        raceDate:race_date,
        raceLength : race_length,
        raceHorseAgeCriteria:race_horse_age_criteria,
        raceHorseWeightCriteria:race_horse_weight_criteria,
        
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
      postRaceFailure(res.data);
      history.push("/dashboard/addraces");
    } else {
      const notify201 = () => toast.success("Race added Successfully.");
      notify201();
      postRaceSuccess(res.data);
      history.push('/dashboard/races');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


    return (
        <div>
          <h2 className="w-100 text-center mt-5 mb-3">Add a Race</h2>
      <form className="row g-3 w-75 m-auto" onSubmit={handleSubmit}>
 
        <div className="col-lg-6 col-md-6 px-lg-5 px-md-3 pt-3">
          <label htmlFor="RaceName" className="form-label">
            Race Name
          </label>
          <input
            type="text"
            className="form-control" 
            required
            id="RaceName"
            onChange={(e) => setRaceName(e.target.value)}
          />
        </div>

        <div className="col-lg-6 col-md-6 px-lg-5 px-md-3 pt-3">
          <label htmlFor="RaceCourse" className="form-label">
            Race Course
          </label>
          <input
            type="text"
            className="form-control" 
            required
            id="RaceCourse"
            onChange={(e) => setRaceCourse(e.target.value)}
          />
        </div>


        <div className="col-lg-6 col-md-6 px-lg-5 px-md-3 pt-3">
          <label htmlFor="RaceDate" className="form-label">
          Race Date
          </label>
          <input
            type="date"
            className="form-control" 
            required
            id="RaceDate"
            onChange={(e) => setRaceDate(e.target.value)}
          />
        </div>

        

        <div className="col-lg-6 col-md-6 px-lg-5 px-md-3 pt-3">
          <label htmlFor="RaceLength" className="form-label">
          Race Length
          </label>
          <input
            type="number"
            className="form-control" 
            required
            id="RaceLength"
            min="100"
            max="10000"
            onChange={(e) => setRaceLength(e.target.value)}
          />
        </div>

        <div className="col-lg-6 col-md-6 px-lg-5 px-md-3 pt-3">
          <label htmlFor="RaceHorseAgeCriteria" className="form-label">
            Age Criteria
          </label>
          <input
            type="number"
            className="form-control" 
            required
            min="1"
            max="15"
            id="RaceHorseAgeCriteria"
            onChange={(e) => setRaceHorseAgeCriteria(e.target.value)}
          />
        </div>

        

        <div className="col-lg-6 col-md-6 px-lg-5 px-md-3 pt-3">
          <label htmlFor="RaceHorseWeightCriteria" className="form-label">
          Weight Criteria
          </label>
          <input
            type="number"
            className="form-control" 
            required
            min="200"
            max="1000"
            id="RaceHorseWeightCriteria"
            onChange={(e) => setRaceHorseWeightCrieria(e.target.value)}
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
    postRaceRequest: () => dispatch(postRaceRequest()),
    postRaceSuccess: (data) => dispatch(postRaceSuccess(data)),
    postRaceFailure: (error) => dispatch(postRaceFailure(error)),

   
  };
};




export default connect(mapStateToProps,mapDispatchToProps)(AddRaces)
