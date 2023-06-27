import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  postHorse,
  getHorseColors,
  getHorseBreeds,
  getHorseGenders,
  getHorseDiscipline,
} from "../../../api/HorseApi";
import {
  postHorseRequest,
  postHorseSuccess,
  postHorseFailure,
  getHorseColor,
  getHorseBreed,
  getHorseGender,
  getHorsedisciplines,
} from "../../../Redux/Horse/HorseActions.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { withRouter } from "react-router-dom";
import { setToken } from "../../../Redux/Index";

function AddHorse({
  postHorseRequest,
  postHorseSuccess,
  postHorseFailure,
  token,
  history,
  getHorseColor,
  getHorseBreed,
  getHorsedisciplines,
  getHorseGender,
  colors,
  genders,
  disciplines,
  breeds,
  setToken,
}) {
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

    window.scrollTo(0, 0);
    $(document).ready(function (e) {
      $(".selectpicker").selectpicker();
    });
    $(".loader").addClass("invisible");
  }, []);


  const [horse_name, setHorseName] = useState();
  const [show_name, setShowName] = useState();
  const [gender, setGender] = useState();
  const [breed, setBreed] = useState();
  const [color, setColor] = useState();
  const [discipline, setDiscipline] = useState();
  const [microchipNumber, setMicrochipNumber] = useState();
  const [horse_weight, setHorseWeight] = useState();
  const [horse_height, setHorseHeight] = useState();
  const [birth_date, setBirthDate] = useState();
  const [father, setFather] = useState();
  const [mother, setMother] = useState();
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
  //--------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(birth_date) > new Date()) {
      toast.warning("Please enter a valid date");
      return;
    }

    document.getElementById("submit-button").innerHTML = "Adding ...";
    document
      .getElementById("submit-button")
      .setAttribute("disabled", "disabled");

    postHorseRequest();
    const res = await postHorse(
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
      token
    );

    document.getElementById("submit-button").innerHTML = "Add";
    document.getElementById("submit-button").removeAttribute("disabled");

    if (res.status != 201) {
      const notify400 = () => toast.error("There is some error in your request. Please try again, if error persists submit your query through our query form.");
      const notify401 = () => toast.info(res.data.error.message);
      const notify500 = () => toast.error(res.data.error.message);
      const notify999 = () =>
        toast.error(
          "Sorry but we are unable to process your request. Please contact our Administrator."
        );
      res.status == 400 ? notify400() : null;
      res.status == 401 ? notify401() : null;
      res.status == 500 ? notify500() : null;
      res.status == 999 ? notify999() : null;
      if (res.status == 400) {
        toast.error(res.data.error.message);
      }
      postHorseFailure(res);
      history.push("/myhorses");
    } else {
      const notify201 = () => toast.success("Horse added successfully.");
      notify201();
      postHorseSuccess(res);
      history.push("/myhorses");
    }
  };

  return (
    <div className="ownershipStatic mb-5 pt-5 px-4">
      <div className="loader">Loading ...</div>
      <h2 className="mb-4">Add a Horse</h2>
      <form
        className="container w-75 px-3 m-auto row g-3"
        onSubmit={handleSubmit}
      >
        <div className="col-lg-6 col-md-6 pt-3 px-lg-5 px-md-3">
          <label htmlFor="HorseName" className="form-label">
            Horse Name
          </label>
          <input
            type="text"
            className="form-control"
            required
            id="HorseName"
            onChange={(e) => setHorseName(e.target.value)}
          />
        </div>
        <div className="col-lg-6 col-md-6 pt-3 px-lg-5 px-md-3">
          <label htmlFor="ShowName" className="form-label">
            Show Name
          </label>
          <input
            type="text"
            className="form-control"
            id="ShowName"
            required
            onChange={(e) => setShowName(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6 pt-3 px-lg-5 px-md-3 select">
          <label htmlFor="Gender" className="form-label">
            Gender
          </label>
          <div>
            <select
              className="form-select form-select-lg mb-3 selectpicker f w-100"
              aria-label=".form-select-lg example"
              id="Gender"
              required
              defaultValue="-1"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="-1" disabled>
                Gender
              </option>
              {genderList}
            </select>
          </div>
        </div>

        <div className="col-md-6 pt-3 px-lg-5 px-md-3 select">
          <label htmlFor="Color" className="form-label">
            Color
          </label>
          <div>
            <select
              className="form-select form-select-lg mb-3 selectpicker f w-100"
              aria-label=".form-select-lg example"
              id="UserRole"
              required
              defaultValue="-1"
              onChange={(e) => setColor(e.target.value)}
            >
              <option value="-1" disabled>
                Color
              </option>

              {colorList}
            </select>
          </div>
        </div>

        <div className="col-md-6 pt-3 px-lg-5 px-md-3 select">
          <label htmlFor="Breed" className="form-label">
            Breed
          </label>
          <div>
            <select
              className="form-select form-select-lg mb-3 selectpicker f w-100"
              aria-label=".form-select-lg example"
              id="Breed"
              required
              defaultValue="-1"
              onChange={(e) => setBreed(e.target.value)}
            >
              <option value="-1" disabled>
                Breed
              </option>
              {breedList}
            </select>
          </div>
        </div>

        <div className="col-md-6 pt-3 px-lg-5 px-md-3 select">
          <label htmlFor="Discipline" className="form-label">
            Discipline
          </label>
          <div>
            <select
              className="form-select form-select-lg mb-3 selectpicker f w-100"
              aria-label=".form-select-lg example"
              id="Discipline"
              required
              defaultValue="-1"
              onChange={(e) => setDiscipline(e.target.value)}
            >
              <option value="-1" disabled>
                Discipline
              </option>
              {disciplineList}
            </select>
          </div>
        </div>

        <div className="col-lg-6 col-md-6 pt-3 px-lg-5 px-md-3">
          <label htmlFor="MicrochipNumber" className="form-label">
            Microchip Number
          </label>
          <input
            type="text"
            className="form-control"
            id="MicrochipNumber"
            required
            minLength="15"
            maxLength="15"
            pattern="^[1-9][0-9]{14}"
            placeholder="Enter your 15 digit microchip number"
            onChange={(e) => setMicrochipNumber(e.target.value)}
          />
        </div>
        <div className="col-lg-6 col-md-6 pt-3 px-lg-5 px-md-3">
          <label htmlFor="HorseWeight" className="form-label">
            Horse Weight (in kg)
          </label>
          <input
            type="number"
            className="form-control"
            id="HorseWeight"
            required
            min="200"
            max="1000"
            placeholder="In Kilograms"
            onChange={(e) => setHorseWeight(e.target.value)}
          />
        </div>
        <div className="col-lg-6 col-md-6 pt-3 px-lg-5 px-md-3">
          <label htmlFor="HorseHeight" className="form-label">
            Horse Height (in m)
          </label>
          <input
            type="number"
            className="form-control"
            id="HorseHeight"
            placeholder="In meters"
            required
            min="1"
            max="2"
            step=".01"
            onChange={(e) => setHorseHeight(e.target.value)}
          />
        </div>
        <div className="col-lg-6 col-md-6 pt-3 px-lg-5 px-md-3">
          <label htmlFor="BirthDate" className="form-label">
            Birth Date
          </label>
          <input
            type="date"
            className="form-control"
            id="BirthDate"
            required
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>
        <div className="col-lg-6 col-md-6 pt-3 px-lg-5 px-md-3">
          <label htmlFor="Father" className="form-label">
            Father
          </label>
          <input
            type="text"
            className="form-control"
            id="Father"
            required
            onChange={(e) => setFather(e.target.value)}
          />
        </div>

        <div className="col-lg-6 col-md-6 pt-3 px-lg-5 px-md-3">
          <label htmlFor="Mother" className="form-label">
            Mother
          </label>
          <input
            type="text"
            className="form-control"
            id="Mother"
            required
            onChange={(e) => setMother(e.target.value)}
          />
        </div>

        <div className="col-12 pt-5">
          <button
            type="submit"
            id="submit-button"
            className="btn px-4 form-buttons"
          >
            Add
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

    colors: state.horsereducer.color,
    breeds: state.horsereducer.breed,
    disciplines: state.horsereducer.disciplines,
    genders: state.horsereducer.gender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postHorseRequest: () => dispatch(postHorseRequest()),
    postHorseSuccess: (data) => dispatch(postHorseSuccess(data)),
    postHorseFailure: (error) => dispatch(postHorseFailure(error)),
    getHorseColor: (data) => dispatch(getHorseColor(data)),
    getHorseGender: (data) => dispatch(getHorseGender(data)),
    getHorsedisciplines: (data) => dispatch(getHorsedisciplines(data)),
    getHorseBreed: (data) => dispatch(getHorseBreed()),
    setToken: (token, role, email) => dispatch(setToken(token, role, email)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddHorse)
);
