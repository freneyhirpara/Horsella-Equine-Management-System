import React,{useState,useEffect} from 'react'
import { connect } from "react-redux";
import { updateRace} from "../../../../api/RaceApi";
import { updateRaceRequest,
    updateRaceSuccess,
    updateRaceFailure } from "../../../../Redux/Admin/Trotting/RaceActions";
    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.min.css';

function EditRaces({updateRaceRequest,
    updateRaceSuccess,
    updateRaceFailure,token,history,data}) {



  const [race_id,setId] = useState(data ? data.id : null);
  const [race_name,setRaceName] = useState(data?data.race_name:null);
  const [race_course,setRaceCourse] = useState(data?data.race_course:null);
  const [race_date,setRaceDate] = useState(data?data.race_date.slice(0,10):null);
  const [race_length,setRaceLength] = useState(data?data.race_length:null);
  const [race_horse_age_criteria,setRaceHorseAgeCriteria] = useState(data?data.racehorse_age_criteria:null);
  const [race_horse_weight_criteria,setRaceHorseWeightCrieria] = useState(data?data.racehorse_weight_criteria:null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if ( new Date(race_date) <= new Date() ) {
      toast.warning('Please enter a valid date');
      return;
    }
      
    updateRaceRequest();
    const res = await updateRace(
      {
        raceName : race_name,
        raceCourse:race_course,
        raceDate:race_date,
        raceLength : race_length,
        raceHorseAgeCriteria:race_horse_age_criteria,
        raceHorseWeightCriteria:race_horse_weight_criteria,
        isCompleted: false,
      },race_id,token
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
      updateRaceFailure(res.data);
      history.push("/dashboard/races");
    } else {
      const notify200 = () => toast.success("Updation Successful.");
      notify200();
      updateRaceSuccess(res.data);
      history.push('/dashboard/races');
    }
}

  useEffect(() => {
    window.scrollTo(0, 0);

    if (sessionStorage.getItem('raceDetails') != null) {
      let raceDetails = JSON.parse(sessionStorage.getItem('raceDetails'));
      setId(parseInt(raceDetails.id));
      setRaceName(raceDetails.raceName);
      setRaceCourse(raceDetails.raceCourse);
      setRaceDate(raceDetails.raceDate);
      setRaceHorseAgeCriteria(raceDetails.raceHorseAgeCriteria);
      setRaceHorseWeightCrieria(raceDetails.raceHorseWeightCriteria);
      setRaceLength(raceDetails.raceLength);
    } else {
      sessionStorage.setItem('raceDetails', JSON.stringify({
        id: data.id,
        raceName : race_name,
        raceCourse:race_course,
        raceDate:race_date,
        raceLength : race_length,
        raceHorseAgeCriteria:race_horse_age_criteria,
        raceHorseWeightCriteria:race_horse_weight_criteria,
        isCompleted: false,
      }));
    }
  }, []);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem('raceDetails');
    };
  }, []);


    return (
        <div>
          <h2 className="w-100 text-center mt-5 mb-3">Edit a Race</h2>
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
            value={race_name}
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
            value={race_course}
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
            dateformat= "yyyy:mm:dd"
            id="RaceDate"
            value={race_date}
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
            min="100"
            max="10000"
            id="RaceLength"
            value={race_length}
            onChange={(e) => setRaceLength(e.target.value)}
          />
        </div>

        <div className="col-lg-6 col-md-6 px-lg-5 px-md-3 pt-3">
          <label htmlFor="RaceHorseAgeCriteria" className="form-label">
            Age Criteria
          </label>
          <input
            type="text"
            className="form-control"
            required
            min="1"
            max="15"
            id="RaceHorseAgeCriteria"
            value={race_horse_age_criteria}
            onChange={(e) => setRaceHorseAgeCriteria(e.target.value)}
          />
        </div>

        

        <div className="col-lg-6 col-md-6 px-lg-5 px-md-3 pt-3">
          <label htmlFor="RaceHorseWeightCriteria" className="form-label">
          Weight Criteria
          </label>
          <input
            type="text"
            className="form-control"
            required
            min="200"
            max="700"
            id="RaceHorseWeightCriteria"
            value={race_horse_weight_criteria}
            onChange={(e) => setRaceHorseWeightCrieria(e.target.value)}
          />
        </div>

        
        

        <div className="col-12 mt-5">
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
    token: state.user.token,
    data: state.racereducer.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateRaceRequest: () => dispatch(updateRaceRequest()),
    updateRaceSuccess: (data) => dispatch(updateRaceSuccess(data)),
    updateRaceFailure: (error) => dispatch(updateRaceFailure(error)),

   
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(EditRaces)
