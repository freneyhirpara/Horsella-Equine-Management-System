import React, { useEffect } from "react";
import { Redirect } from 'react-router'

import "./App.css";
import Header from "./component/Common/Header/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./component/Common/Footer/Footer";

import AboutUs from "./component/AboutUs/AboutUs";
import ContactUs from "./component/ContactUs/ContactUs";
import Login from "./component/Login/Login";
import Breeding from "./component/Breeding/Breeding";
import Trotting from "./component/Trotting/Trotting";
import Training from "./component/Training/Training";
import Ownership from "./component/Ownership/Ownership";
import MyHorses from "./component/Ownership/MyHorses/MyHorses";
import AddHorse from "./component/Ownership/MyHorses/AddHorse";
import EditHorse from "./component/Ownership/MyHorses/EditHorse";
import DeleteHorse from "./component/Ownership/MyHorses/DeleteHorse";
import Home from "./component/Home/Home";
import ResetPassword from "./component/ResetPassword/ResetPassword";

import { ToastContainer} from 'react-toastify';

import { connect } from "react-redux";
import Logout from "./component/Logout/Logout";
import Dashboard from "./component/Dashboard/Dashboard";
import { setToken } from "./Redux/Index";
import TrainingCenterDetails from "./component/Training/TrainingCenterDetails";
import AddParticipate from "./component/Trotting/AddParticipate";
import RaceDetails from "./component/Trotting/RaceDetails";
import BreedingCenterDetails from "./component/Breeding/BreedingCenterDetails";
import RaceResult from "./component/Trotting/RaceResult";
import NotFound from "./component/NotFound/NotFound";
import ChangePassword from "./component/ChangePassword/ChangePassword";
import ApplyReset from "./component/ResetPassword/ApplyReset";
import AddEvent from "./component/Ownership/Journal/AddEvent";
import Journal from "./component/Ownership/Journal/Journal";
import EditEvent from "./component/Ownership/Journal/EditEvent";
import DeleteEvent from "./component/Ownership/Journal/DeleteEvent";
import JournalDetails from "./component/Ownership/Journal/JournalDetails";

function App({ setToken, pageFlag }) {
  
  const userRole = sessionStorage.getItem("role");
  const sessionToken = sessionStorage.getItem("token");
  useEffect(() => {
    const previousToken = sessionStorage.getItem("token");
    const userRole = sessionStorage.getItem("role");
    const userEmail = sessionStorage.getItem("email");
    const userPageFlag = parseInt(sessionStorage.getItem("pageFlag"));
    if (previousToken) {
      setToken(previousToken, userRole, userEmail, userPageFlag);
    }
    window.addEventListener('click', (e) => {
      if(!window.location.pathname.startsWith('/dashboard') &&  e.srcElement.offsetParent !== null) {
        if(!e.srcElement.offsetParent.classList.contains('navbar')){
          document.getElementById('collapsibleNavbar').classList.remove('show');
        }
      }
    });

  }, []);

  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          width: "500px"
        }}
      />
      {pageFlag==1?null:<Header />}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard">
          {(userRole==="\"Admin\"" || userRole==="Admin")?<Dashboard />:(userRole)?<Redirect to="/" />:<Redirect to="/login?redirect=dashboard"/>}
        </Route>
        <Route path="/changepassword" component={ChangePassword} />
        <Route path="/resetpassword" component={ResetPassword} />
        <Route path="/applyreset" component={ApplyReset} />
        <Route path="/about-us" exact component={AboutUs} />
        <Route path="/contact-us" exact component={ContactUs} />
        <Route path="/breeding" exact component={Breeding} />
        <Route path="/myhorses" exact>
          {(Boolean(sessionToken) && sessionToken !== undefined && sessionToken !== null)?<MyHorses />:<Redirect to="/login?redirect=myhorses"/>}
        </Route>
        <Route path="/journal" exact>
          {(Boolean(sessionToken) && sessionToken !== undefined && sessionToken !== null)?<Journal />:<Redirect to="/login?redirect=journal"/>}
        </Route>
        <Route path="/eventdetails" exact>
          {(Boolean(sessionToken) && sessionToken !== undefined && sessionToken !== null)?<JournalDetails />:<Redirect to="/login?redirect=journal"/>}
        </Route>
        <Route path="/addevent" exact>
          {(Boolean(sessionToken) && sessionToken !== undefined && sessionToken !== null)?<AddEvent />:<Redirect to="/login?redirect=journal"/>}
        </Route>
        <Route path="/editevent" exact>
          {(Boolean(sessionToken) && sessionToken !== undefined && sessionToken !== null)?<EditEvent />:<Redirect to="/login?redirect=journal"/>}
        </Route>
        <Route path="/deleteevent" exact>
          {(Boolean(sessionToken) && sessionToken !== undefined && sessionToken !== null)?<DeleteEvent />:<Redirect to="/login?redirect=journal"/>}
        </Route>
        <Route path="/addhorse" exact>
          {(Boolean(sessionToken) && sessionToken !== undefined && sessionToken !== null)?<AddHorse />:<Redirect to="/login?redirect=myhorses"/>}
        </Route>
        <Route path="/edithorse" exact>
          {(Boolean(sessionToken) && sessionToken !== undefined && sessionToken !== null)?<EditHorse />:<Redirect to="/login?redirect=myhorses"/>}
        </Route>
        <Route path="/deletehorse" exact>
          {(Boolean(sessionToken) && sessionToken !== undefined && sessionToken !== null)?<DeleteHorse />:<Redirect to="/login?redirect=myhorses"/>}
        </Route>
        <Route path="/trotting" exact component={Trotting} />
        <Route path="/training" exact component={Training} />
        <Route path="/ownership" exact component={Ownership} />
        <Route path="/login" exact component={Login}>
          {/* {(Boolean(!sessionToken) && sessionToken == undefined && sessionToken == null)?<Login />:<Redirect to="/"/>} */}
        </Route>
        <Route path="/logout" exact component={Logout} />
        <Route path="/training/:id" exact>
          {(Boolean(sessionToken) && sessionToken !== undefined && sessionToken !== null)?<TrainingCenterDetails />:<Redirect to="/login?redirect=training"/>}
        </Route>
        <Route path="/breeding/:id" exact>
          {(Boolean(sessionToken) && sessionToken !== undefined && sessionToken !== null)?<BreedingCenterDetails />:<Redirect to="/login?redirect=breeding"/>}
        </Route>
        <Route path="/participate/race/:id" exact>
          {(Boolean(sessionToken) && sessionToken !== undefined && sessionToken !== null)?<AddParticipate />:<Redirect to="/login?redirect=trotting"/>}
        </Route>
        <Route path="/race/:id" exact>
          {(Boolean(sessionToken) && sessionToken !== undefined && sessionToken !== null)?<RaceDetails />:<Redirect to="/login?redirect=trotting"/>}
        </Route>
        <Route path="/race/result/:id" exact>
          {(Boolean(sessionToken) && sessionToken !== undefined && sessionToken !== null)?<RaceResult />:<Redirect to="/login?redirect=trotting"/>}
        </Route>
        <Route path='/404' component={NotFound} />
        <Redirect from='*' to='/404' />

      </Switch>
      {pageFlag==1?null:<Footer />}
    </div>
  </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    role: state.user.role,
    email: state.user.email,
    pageFlag: state.user.pageFlag
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token, role, email) => dispatch(setToken(token, role, email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
