import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  updateHorse,
  getHorseColors,
  getHorseBreeds,
  getHorseGenders,
  getHorseDiscipline,
} from "../../../api/HorseApi";
import {
  updateHorseRequest,
  updateHorseSuccess,
  updateHorseFailure,
  getHorseColor,
  getHorseBreed,
  getHorseGender,
  getHorsedisciplines,
} from "../../../Redux/Horse/HorseActions.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { setClient, unsetClient, setToken } from "../../../Redux/Index";
import { withRouter } from "react-router-dom";

function EditHorse({
  updateHorseRequest,
  updateHorseSuccess,
  updateHorseFailure,
  token,
  data,
  history,
  getHorseColor,
  getHorseBreed,
  getHorsedisciplines,
  getHorseGender,
  colors,
  genders,
  disciplines,
  breeds,
}) {
  let previousToken;
  const [horse_id, setId] = useState(data ? data.id : -1);
  const [horse_name, setHorseName] = useState(data ? data.horse_name : null);
  const [show_name, setShowName] = useState(data ? data.show_name : null);
  const [gender, setGender] = useState(data ? data.gender_id : null);
  const [breed, setBreed] = useState(data ? data.breed_id : null);
  const [color, setColor] = useState(data ? data.color_id : null);
  const [discipline, setDiscipline] = useState(
    data ? data.discipline_id : null
  );
  const [microchipNumber, setMicrochipNumber] = useState(
    data ? data.microchip_number : null
  );
  const [horse_weight, setHorseWeight] = useState(
    data ? data.horse_weight : null
  );
  const [horse_height, setHorseHeight] = useState(
    data ? data.horse_height : null
  );
  const [birth_date, setBirthDate] = useState(
    data ? data.birthdate.slice(0, 10) : null
  );
  const [father, setFather] = useState(data ? data.father : null);
  const [mother, setMother] = useState(data ? data.mother : null);

  useEffect(async () => {
    let previousToken = sessionStorage.getItem("token");
    const userRole = sessionStorage.getItem("role");
    const userEmail = sessionStorage.getItem("email");
    const userPageFlag = parseInt(sessionStorage.getItem("pageFlag"));
    if (previousToken) {
      await setToken(previousToken, userRole, userEmail, userPageFlag);
    }
    if (sessionStorage.getItem("horseProfile") != null) {
      let horseProfile = JSON.parse(sessionStorage.getItem("horseProfile"));
      setHorseColors(horseProfile.color);
      setHorseBreeds(horseProfile.breed);
      setHorseDisciplines(horseProfile.discipline);
      setHorseGenders(horseProfile.gender);
    } else {
      let horseProfile;
      const res = await getHorseColors(previousToken);
      if (res.status != 200) {
        history.push("/myhorses");
      } else {
        horseProfile = {
          ...horseProfile,
          color: res.data,
        };
        getHorseColor(res.data);
        setHorseColors(res.data);
      }
      const res1 = await getHorseBreeds(previousToken);
      if (res1.status != 200) {
        history.push("/myhorses");
      } else {
        horseProfile = {
          ...horseProfile,
          breed: res1.data,
        };
        getHorseBreed(res1.data);
        setHorseBreeds(res1.data);
      }
      const res2 = await getHorseDiscipline(previousToken);
      if (res2.status != 200) {
        history.push("/myhorses");
      } else {
        horseProfile = {
          ...horseProfile,
          discipline: res2.data,
        };
        getHorsedisciplines(res2.data);
        setHorseDisciplines(res2.data);
      }
      const res3 = await getHorseGenders(previousToken);
      if (res3.status != 200) {
        history.push("/myhorses");
      } else {
        horseProfile = {
          ...horseProfile,
          gender: res3.data,
        };
        getHorseGender(res3.data);
        setHorseGenders(res3.data);
      }

      sessionStorage.setItem("horseProfile", JSON.stringify(horseProfile));
    }
    //-----------------------------
    if (sessionStorage.getItem("horseDetails") != null) {
      let horseDetails = JSON.parse(sessionStorage.getItem("horseDetails"));
      setId(parseInt(horseDetails.id));
      setHorseName(horseDetails.horseName);
      setShowName(horseDetails.showName);
      setGender(horseDetails.genderId);
      setBreed(horseDetails.breedId);
      setColor(horseDetails.colorId);
      setDiscipline(horseDetails.disciplineId);
      setMicrochipNumber(horseDetails.microchipNumber);
      setHorseHeight(horseDetails.horseHeight);
      setHorseWeight(horseDetails.horseWeight);
      setBirthDate(horseDetails.birthDate);
      setFather(horseDetails.father);
      setMother(horseDetails.mother);
    } else {
      sessionStorage.setItem(
        "horseDetails",
        JSON.stringify({
          id: data.id,
          horseName: horse_name,
          showName: show_name,
          genderId: gender,
          breedId: breed,
          colorId: color,
          disciplineId: discipline,
          microchipNumber: microchipNumber,
          horseWeight: horse_weight,
          horseHeight: horse_height,
          birthDate: birth_date,
          father: father,
          mother: mother,
          isCompleted: false,
        })
      );
    }

    window.scrollTo(0, 0);
    $(document).ready(function (e) {
      $(".selectpicker").selectpicker();
    });
    $(".loader").addClass("invisible");
  }, []);

  //---------------------
  const [horseColors, setHorseColors] = useState(colors ? colors : null);
  const [horseGenders, setHorseGenders] = useState(genders ? genders : null);
  const [horseBreeds, setHorseBreeds] = useState(breeds ? breeds : null);
  const [horseDisciplines, setHorseDisciplines] = useState(
    disciplines ? disciplines : null
  );

  const colorList = horseColors
    ? horseColors.map((h) => {
        return (
          <option key={h.id} value={h.id}>
            {h.color}
          </option>
        );
      })
    : null;

  const genderList = horseGenders
    ? horseGenders.map((h) => {
        return (
          <option key={h.id} value={h.id}>
            {h.gender}
          </option>
        );
      })
    : null;

  const disciplineList = horseDisciplines
    ? horseDisciplines.map((h) => {
        return (
          <option key={h.id} value={h.id}>
            {h.discipline}
          </option>
        );
      })
    : null;

  const breedList = horseBreeds
    ? horseBreeds.map((h) => {
        return (
          <option key={h.id} value={h.id}>
            {h.breed}
          </option>
        );
      })
    : null;

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("horseDetails");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(birth_date) > new Date()) {
      toast.warning("Please enter a valid date");
      return;
    }

    document.getElementById("submit-button").innerHTML = "Updating ...";
    document
      .getElementById("submit-button")
      .setAttribute("disabled", "disabled");

    updateHorseRequest();

    const res = await updateHorse(
      horse_id,
      {
        horseName: horse_name,
        showName: show_name,
        genderId: gender,
        breedId: breed,
        colorId: color,
        disciplineId: discipline,
        microchipNumber: microchipNumber,
        horseWeight: horse_weight,
        horseHeight: horse_height,
        birthDate: birth_date,
        father: father,
        mother: mother,
      },
      token || previousToken
    );
    sessionStorage.removeItem("horseDetails");

    document.getElementById("submit-button").innerHTML = "Update";
    document.getElementById("submit-button").removeAttribute("disabled");

    if (res.status != 200) {
      // const notify400 = () => toast.error("There is some error in your request. Please try again, if error persists submit your query through our query form.");
      const notify401 = () => toast.info(res.data.error.message);
      const notify500 = () => toast.error(res.data.error.message);
      const notify999 = () =>
        toast.error(
          "Sorry but we are unable to process your request. Please contact our Administrator."
        );
      /* res.status == 400 ? notify400() :  */
      res.status == 401 ? notify401() : null;
      res.status == 500 ? notify500() : null;
      res.status == 999 ? notify999() : null;
      if (res.status == 400) {
        toast.error(res.data.error.message);
      }
      updateHorseFailure(res.data);
      history.push("/myhorses");
    } else {
      const notify200 = () => toast.info("Horse updated successfully.");
      notify200();
      updateHorseSuccess(res.data);
      history.push("/myhorses");
    }
  };

  return (
    <div className="ownershipStatic mb-5 px-4 pt-5 ">
      <div className="loader">Loading ...</div>
      <h2 className="mb-4">Edit Horse</h2>
      <form
        className="container w-75 px-3 m-auto row g-3"
        onSubmit={handleSubmit}
      >
        <div className="col-lg-6 col-md-6 mt-3 px-lg-5 px-md-3">
          <label htmlFor="HorseName" className="form-label">
            Horse Name
          </label>
          <input
            type="text"
            className="form-control"
            id="HorseName"
            value={horse_name}
            required
            onChange={(e) => setHorseName(e.target.value)}
          />
        </div>
        <div className="col-lg-6 col-md-6 mt-3 px-lg-5 px-md-3">
          <label htmlFor="ShowName" className="form-label">
            Show Name
          </label>
          <input
            type="text"
            className="form-control"
            id="ShowName"
            value={show_name}
            required
            onChange={(e) => setShowName(e.target.value)}
          />
        </div>

        <div className="col-md-6 mt-3 px-lg-5 px-md-3 select">
          <label htmlFor="Gender" className="form-label">
            Gender
          </label>
          <div>
            <select
              className="form-select form-select-lg mb-3 selectpicker f w-100"
              aria-label=".form-select-lg example"
              id="Gender"
              onChange={(e) => setGender(e.target.value)}
              defaultValue={gender}
              value={gender}
              required
            >
              <option value="-1" disabled hidden>
                Gender
              </option>
              {/* <option value="1">Stallion</option>
              <option value="2">Colt</option>
              <option value="3">Gelding</option>
              <option value="4">Filly</option>
              <option value="5">Mare</option> */}
              {genderList}
            </select>
          </div>
        </div>

        <div className="col-md-6 mt-3 px-lg-5 px-md-3 select">
          <label htmlFor="Color" className="form-label">
            Color
          </label>
          <div>
            <select
              className="form-select form-select-lg mb-3 selectpicker f w-100"
              aria-label=".form-select-lg example"
              id="Color"
              onChange={(e) => setColor(e.target.value)}
              defaultValue={color}
              value={color}
              required
            >
              <option value="-1" disabled hidden>
                Color
              </option>
              {colorList}
            </select>
          </div>
        </div>

        <div className="col-md-6 mt-3 px-lg-5 px-md-3 select">
          <label htmlFor="Breed" className="form-label">
            Breed
          </label>
          <div>
            <select
              className="form-select form-select-lg mb-3 selectpicker f w-100"
              aria-label=".form-select-lg example"
              id="Breed"
              defaultValue={breed}
              value={breed}
              required
              onChange={(e) => setBreed(e.target.value)}
            >
              <option value="-1" disabled hidden>
                Breed
              </option>
              {breedList}
              {/* <option value="1">Thoroughbred</option>
              <option value="2">Arabian</option>
              <option value="3">Standardbred</option>
              <option value="4">Akhal-take</option>
              <option value="5">American Quater Horse</option> */}
            </select>
          </div>
        </div>

        <div className="col-md-6 mt-3 px-lg-5 px-md-3 select">
          <label htmlFor="Discipline" className="form-label">
            Discipline
          </label>
          <div>
            <select
              className="form-select form-select-lg mb-3 selectpicker f w-100"
              aria-label=".form-select-lg example"
              id="Discipline"
              required
              defaultValue={discipline}
              value={discipline}
              onChange={(e) => setDiscipline(e.target.value)}
            >
              <option value="-1" disabled hidden>
                Discipline
              </option>
              {disciplineList}
              {/* <option value="1">Trotting</option>
              <option value="2">Dressage</option>
              <option value="3">Driving</option>
              <option value="4">Endurance</option>
              <option value="5">Eventing</option>
              <option value="6">Hunter</option>
              <option value="7">Flat Racing</option>
              <option value="8">Point-To-Point Racing</option>
              <option value="9">Harness Racing</option> */}
            </select>
          </div>
        </div>

        <div className="col-lg-6 col-md-6 mt-3 px-lg-5 px-md-3">
          <label htmlFor="MicrochipNumber" className="form-label">
            Microchip Number
          </label>
          <input
            type="text"
            className="form-control"
            id="MicrochipNumber"
            value={microchipNumber}
            required
            onChange={(e) => setMicrochipNumber(e.target.value)}
          />
        </div>
        <div className="col-lg-6 col-md-6 mt-3 px-lg-5 px-md-3">
          <label htmlFor="HorseWeight" className="form-label">
            Horse Weight
          </label>
          <input
            type="text"
            className="form-control"
            id="HorseWeight"
            required
            min="200"
            max="1000"
            value={horse_weight}
            onChange={(e) => setHorseWeight(e.target.value)}
          />
        </div>
        <div className="col-lg-6 col-md-6 mt-3 px-lg-5 px-md-3">
          <label htmlFor="HorseHeight" className="form-label">
            Horse Height
          </label>
          <input
            type="text"
            className="form-control"
            id="HorseHeight"
            value={horse_height}
            min="1"
            max="2"
            required
            onChange={(e) => setHorseHeight(e.target.value)}
          />
        </div>
        <div className="col-lg-6 col-md-6 mt-3 px-lg-5 px-md-3">
          <label htmlFor="BirthDate" className="form-label">
            Birth Date
          </label>
          <input
            type="date"
            dateformat="yyyy:mm:dd"
            className="form-control"
            id="BirthDate"
            value={birth_date}
            required
            max={Date.now()}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>
        <div className="col-lg-6 col-md-6 mt-3 px-lg-5 px-md-3">
          <label htmlFor="Father" className="form-label">
            Father
          </label>
          <input
            type="text"
            className="form-control"
            id="Father"
            value={father}
            required
            onChange={(e) => setFather(e.target.value)}
          />
        </div>

        <div className="col-lg-6 col-md-6 mt-3 px-lg-5 px-md-3">
          <label htmlFor="Mother" className="form-label">
            Mother
          </label>
          <input
            type="text"
            className="form-control"
            id="Mother"
            value={mother}
            required
            onChange={(e) => setMother(e.target.value)}
          />
        </div>
        <div className="col-12 mt-5">
          <button type="submit" id="submit-button" className="btn form-buttons">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    email: state.user.email,
    horse: state.user.horses,
    data: state.horsereducer.data,
    colors: state.horsereducer.color,
    breeds: state.horsereducer.breed,
    disciplines: state.horsereducer.disciplines,
    genders: state.horsereducer.gender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateHorseRequest: () => dispatch(updateHorseRequest()),
    updateHorseSuccess: (data) => dispatch(updateHorseSuccess(data)),
    updateHorseFailure: (error) => dispatch(updateHorseFailure(error)),
    getHorseColor: (data) => dispatch(getHorseColor(data)),
    getHorseGender: (data) => dispatch(getHorseGender(data)),
    getHorsedisciplines: (data) => dispatch(getHorsedisciplines(data)),
    getHorseBreed: (data) => dispatch(getHorseBreed()),
    setToken: (token, role, email) => dispatch(setToken(token, role, email)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditHorse)
);
