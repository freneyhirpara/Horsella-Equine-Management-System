import React, { useState, useEffect } from 'react';
import { changePassword } from '../../api/UserApi';
import { toast } from 'react-toastify';
import './ChangePassword.css';

function ChangePassword({ history }) {

  const token = sessionStorage.getItem('tempToken') ? sessionStorage.getItem('tempToken') : sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null;

  if (token === null) {
    history.replace("/");
  }

  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitbtn = document.getElementById('submitbtn');
    submitbtn.setAttribute('disabled', 'disabled');
    submitbtn.textContent = "Submitting ...";
    const res = await changePassword(token, { oldPass: oldPassword, newPass: newPassword});
    if (res.status != 204) {
      const notify400 = () => toast.error(res.data.error.message);
      const notify401 = () => toast.info(res.data.error.message);
      const notify500 = () => toast.error(res.data.error.message);
      const notify999 = () =>
        toast.error(
          "Sorry but we are unable to process your request. Please contact our Administrator."
        );
      res.status == 401 ? notify401() : null;
      res.status == 500 ? notify500() : null;
      res.status == 999 ? notify999() : null;
      res.status == 400 ? notify400() : null;
    } else {
      toast.success('Password Changed successfully');
      if (sessionStorage.getItem("tempToken")) {
        sessionStorage.removeItem("tempToken");
        history.push('/login?redirect=home');
      } else {
        history.push('/logout');
      }
    }
    submitbtn.removeAttribute("disabled");
    submitbtn.textContent = "Submit";
  };

  useEffect(() => {
    document.getElementById("exampleInputOldPassword").focus();
  }, []);


  return (
    <div className="container change-pass-container p-4 mb-5">
      <div className="row mt-3">
        <h3 className="w-100 text-center heading">Change password</h3>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <form onSubmit={handleSubmit}>
            <div className="form-group text-left p-2">
              <label htmlFor="exampleInputEmail1">Old Password</label>
              <input
                type="password"
                className="form-control"
                required
                id="exampleInputOldPassword"
                placeholder="Old Password"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="form-group text-left p-2">
              <label htmlFor="exampleInputPassword1">New Password</label>
              <input
                type="password"
                className="form-control"
                required
                id="exampleInputNewPassword"
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="form-group text-left p-2">
              <label htmlFor="exampleInputPassword1">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                pattern={`^${newPassword}$`}
                required
                id="exampleInputConfirmNewPassword"
                placeholder="Confirm New Password"
              />
            </div>
            <button type="submit" className="btn submit-btn mt-4 px-3" id="submitbtn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
