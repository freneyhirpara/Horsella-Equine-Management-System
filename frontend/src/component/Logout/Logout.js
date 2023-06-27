import React, { useEffect } from "react";
import { setClient, unsetClient } from "../../Redux/Index";
import { connect } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function Logout({ unsetClient, history }) {
  const logout = () => {
    unsetClient();
    history.push('/');
  };

  useEffect(() => {
    logout();
    const notify200 = () => toast.success("Logout Successful.");
    notify200();
  }, []);

  return <div></div>;
}

const mapDispatchToProps = (dispatch) => {
  return {
    unsetClient: () => dispatch(unsetClient()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
