import React, { useEffect } from 'react'
import { tokenUnset } from '../redux/login/loginActions'
import {connect} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.min.css';

function Logout({tokenUnset,history}) {
    const logout = ()=> {
        tokenUnset();
        history.push("/login")
    }
    
    useEffect(() => {
        logout();
        const notify200 = () => toast.success("Logout Successful");
      notify200();
    }, []);

    return (
        <div></div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
		tokenUnset: () => {
			
			return dispatch(tokenUnset())}
	}
}

export default connect(null,mapDispatchToProps)(Logout);
