import React, { useState, useEffect } from "react";
import { applyReset } from "../../api/UserApi";
import { toast } from "react-toastify";
import "./ResetPassword.css";

function ApplyReset({ history }) {

  const [email, setEmail] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitbtn = document.getElementById("submitbtn");
    submitbtn.setAttribute("disabled", "disabled");
    submitbtn.textContent = "Submitting ...";
    const res = await applyReset(email);
    if (res.status != 200) {
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
      toast.success(res.data.message);
      history.replace('/');
    }
    submitbtn.removeAttribute("disabled");
    submitbtn.textContent = "Submit";
  };

  useEffect(() => {
    document.getElementById("exampleInputEmail").focus();
  }, []);

  return (
    <div className="container change-pass-container p-4 mb-5">
      <div className="row mt-3">
        <h3 className="w-100 text-center heading">Reset password</h3>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <form onSubmit={handleSubmit}>
            <div className="form-group text-left p-2">
              <label htmlFor="exampleInputConfirmNewPassword">
                Email Id
              </label>
              <input
                type="email"
                className="form-control"
                required
                onChange={e => setEmail(e.target.value)}
                id="exampleInputEmail"
                placeholder="Enter your registered email id"
              />
            </div>
            <button
              type="submit"
              className="btn submit-btn mt-4 px-3"
              id="submitbtn"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ApplyReset;
