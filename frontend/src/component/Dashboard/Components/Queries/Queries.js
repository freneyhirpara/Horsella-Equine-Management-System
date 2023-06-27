import React,{useState,useEffect} from 'react'
import "../../css/loader.css";
import { connect } from "react-redux";
import {getContact} from "../../../../api/ContactApi";
import {getContactRequest,getContactSuccess,getContactFailure} from "../../../../Redux/Contact/ContactActions"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.min.css';
  
  import { setClient, unsetClient, setToken } from "../../../../Redux/Index";

function Queries({
  getContactRequest,
  getContactSuccess,
  getContactFailure,history, token}) {

    const [records, setRecords] = useState({ data: [] });
    let previousToken;

  useEffect(async() => {

    let previousToken = sessionStorage.getItem("token");
    const userRole = sessionStorage.getItem("role");
    const userEmail = sessionStorage.getItem("email");
    const userPageFlag = parseInt(sessionStorage.getItem("pageFlag"));
    if (previousToken) {
      await setToken(previousToken, userRole, userEmail, userPageFlag);
    }

    window.scrollTo(0, 0);
    await getData(previousToken);
    $(document).ready( function () {
        $('#myTable').DataTable();
        $('#myTable_wrapper').addClass('container');
    } );
    $('.loader').addClass('invisible');
    
  }, []);



  async function getData(previousToken) {
      getContactRequest();
      const res = await getContact(token || previousToken);
      
      if(res.status != 200){
        const notify400 = () => toast.error("There is some error in your request. Please try again, if error persists submit your query through our query form.");
        const notify401 = () => toast.info(res.data.error.message);
        const notify500 = () => toast.error(res.data.error.message);
        res.status == 400 ? notify400() : res.status == 401 ? notify401() : notify500();
        getContactFailure(res.data);
        history.push("/dashboard");
      } else {
        getContactSuccess(res.data);
        setRecords({
          data: res.data.map((r,index) => {
            return (
              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{r.user_name}</td>
                <td>{r.email}</td>
                <td>{r.subject}</td>
                <td className="message-col"><div>{r.message}</div></td>
              </tr>
            );
          }),
        });
      }
    }
        
    return (
      <>
      <h2 className="mb-5 mt-4 text-center">Contact Us Queries</h2>
      <div className="content">
        <div className="loader">
          Loading ...
        </div>

        <table id="myTable" className="table table-responsive table-hover pt-3">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email id</th>
              <th scope="col" className="subject-col">Subject</th>
              <th scope="col" className="message-col">Message</th>
              
            </tr>
          </thead>

          <tbody>{records.data}</tbody>
        </table>
    </div>
    </>
    )
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token
  };
}

const mapDispatchToProps = (dispatch) => {
    return {
      getContactRequest: () => dispatch(getContactRequest()),
      getContactSuccess: (data) => dispatch(getContactSuccess(data)),
      getContactFailure: (error) => dispatch(getContactFailure(error)),
      setToken: (token, role, email) => dispatch(setToken(token, role, email)),
     
    };
  };
  
  
  
  
export default connect(mapStateToProps,mapDispatchToProps)(Queries)
