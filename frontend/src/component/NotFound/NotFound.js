import React, { useEffect } from 'react';
import './NotFound.css';
import backdrop from '../../assets/img/selfie-min.png';

const NotFound = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="not-found-content">
      <img className="backdrop" src={backdrop} alt=""/>
      <div className="vignette"></div>
      <div className="error-code">
        {props.errorCode}
      </div>
      <div className="error-message">
        {props.errorMessage}
      </div>
    </div>
  )
}

NotFound.defaultProps = {
  errorCode: 404,
  errorMessage: "Looks like you got the url wrong."
}

export default NotFound;