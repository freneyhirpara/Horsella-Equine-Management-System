import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import StickyTop from "./StickyTop/StickyTop";
import "./Main.css";

import AddUser from "../Registration/AddUser";
import Users from "../Registration/Users";
import EditUser from "../Registration/EditUser";
import DeleteUser from "../Registration/DeleteUser";



import Training from "../Training/Training";
import AddTrainingCenter from "../Training/AddTrainingCenter";
import EditTrainingCenter from "../Training/EditTrainingCenter";
import DeleteTrainingCenter from "../Training/DeleteTrainingCenter";

import AddRaces from "../Races/AddRaces";
import EditRace from "../Races/EditRaces";
import DeleteRace from "../Races/DeleteRace";

import Welcome from "../Welcome/Welcome";
import Queries from "../Queries/Queries";

import Breeding from "../Breeding/Breeding";
import AddBreedingCenter from "../Breeding/AddBreedingCenter";
import EditBreedingCenter from "../Breeding/EditBreedingCenter";
import DeleteBreedingCenter from "../Breeding/DeleteBreedingCenter";

import Races from "../Races/Races";
//import AddRaces from "../Races/AddRaces";

import NotFound from "../../../NotFound/NotFound";



function Main() {
  return (
    <div id="content">
        <StickyTop />
        <div className="main m-auto">
        <Route path="/dashboard/users" exact component={Users} />
        <Route path="/dashboard/edituser" exact component={EditUser} />
        <Route path="/dashboard/deleteuser" exact component={DeleteUser} />
        <Route path="/dashboard/adduser" exact component={AddUser} />
        <Route path="/dashboard/breeding" exact component={Breeding} />
        <Route path="/dashboard/addbreedingcenter" exact component={AddBreedingCenter} />
        <Route path="/dashboard/editbreedingcenter"  exact component={EditBreedingCenter} />
        <Route path="/dashboard/deletebreedingcenter" exact component={DeleteBreedingCenter} />
        <Route path="/dashboard/training" exact component={Training} />
        <Route path="/dashboard/addtrainingcenter" exact component={AddTrainingCenter} />
        <Route path="/dashboard/edittrainingcenter" exact component={EditTrainingCenter} />
        <Route path="/dashboard/deletetrainingcenter" exact  component={DeleteTrainingCenter} />
        <Route path="/dashboard/editrace" exact component={EditRace} />
        <Route path="/dashboard/deleterace" exact component={DeleteRace} />
        <Route path="/dashboard/races" exact component={Races} />
        <Route path="/dashboard/queries" exact component={Queries} />
        <Route path="/dashboard/addraces" exact component={AddRaces} />
        <Route path="/dashboard" exact component={Welcome} />
        {/* <Route path="*" exact>
          <Redirect to="/404" />
        </Route> */}
      </div>
    </div>
  );
}

export default Main;
