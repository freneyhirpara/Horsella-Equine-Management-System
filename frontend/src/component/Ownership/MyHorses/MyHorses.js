import React,{useState,useEffect} from 'react';
import "../../Dashboard/css/loader.css";
import "../Ownership.css";
import { connect } from "react-redux";
import { getHorse,getHorseById,deleteHorse } from '../../../api/HorseApi';
import { getHorseRequest,
    getHorseSuccess,
    getHorseFailure,getHorseFailureById,getHorseSuccessById,getHorseRequestById, deleteHorseRequest,deleteHorseSuccess } from "../../../Redux/Horse/HorseActions.js";
    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.min.css';
import { setToken } from '../../../Redux/Index';
import { withRouter } from 'react-router-dom';
  

function Horse({token,history,getHorseFailure,getHorseRequest,getHorseSuccess,getHorseFailureById,getHorseSuccessById,getHorseRequestById,deleteHorseRequest,deleteHorseSuccess}) {


    const [record,setRecord] = useState({
        data:[]
    })

    useEffect(async() => {
        window.scrollTo(0, 0);
        if(token) {
            await getData();
            $(document).ready( function () {
                $('#ownershipTable').DataTable();
            } );
            $('.loader').addClass('invisible');
        }        
    }, [token]);

    async function updateCenter(id){
        getHorseRequestById();
        const res = await getHorseById(id,token);
        if(res.status != 200){
            const notify400 = () => toast.error("There is some error in your request. Please try again, if error persists submit your query through our query form.");
            const notify401 = () => toast.info(res.data.error.message);
            const notify500 = () => toast.error(res.data.error.message);
            res.status == 400 ? notify400() : res.status == 401 ? notify401() : notify500();
            history.push("/myhorses")
        } else {
            getHorseSuccessById(res.data);
            history.push("/edithorse");
        }
    }
    

    async function deleteCenter(id){
        deleteHorseRequest();
        const res = await deleteHorse(id,token);
        if(res.status != 204){
            const notify400 = () => toast.error("There is some error in your request. Please try again, if error persists submit your query through our query form.");
            const notify401 = () => toast.info(res.data.error.message);
            const notify500 = () => toast.error(res.data.error.message);
            res.status == 400 ? notify400() : res.status == 401 ? notify401() : notify500();
            history.push("/myhorses")
        } else {
            deleteHorseSuccess(true);
            const notify204 = () => toast.error("Horse deleted successfully.");
            notify204();
            history.push("/deletehorse");
        }
    }

    async function getData(){
        getHorseRequest();
        const res=await getHorse(token);
        if(res.status != 200){
            const notify400 = () => toast.error("There is some error in your request. Please try again, if error persists submit your query through our query form.");
            const notify401 = () => toast.info(res.data.error.message);
            const notify500 = () => toast.error(res.data.error.message);
            res.status == 400 ? notify400() : res.status == 401 ? notify401() : notify500();
            history.push("/myhorses")
        } else {
            getHorseSuccess(res.data);
            setRecord({data:res.data.map((r,index)=>{return (<tr key={index}><th  scope="row">{index+1}</th><td>{r.horse_name}</td><td>{r.show_name}</td><td>{r.color}</td><td>{r.gender}</td><td>{r.breed}</td><td>{r.discipline}</td><td className="symbol-col actions"><i onClick={updateCenter.bind(this,r.id)}  className="fas fa-edit ml-2 mr-2 form-edit"></i>   <i onClick={deleteCenter.bind(this,r.id)} className="fas fa-trash-alt mr-2 form-delete"></i></td></tr>)})})
          }
    }
    
     
    return (
        <div className="content ownershipStatic container mb-5 px-4 pt-5">
               
                <div className="loader">
                  Loading ...
                </div>
                <h2 className="w-100 text-center mt-4 mb-4">My Horses</h2>
                    <table id="ownershipTable" className="table table-responsive table-hover tablehorse m-auto pt-3" >
                    <thead>
                    <tr>
                        <th  scope="col">#</th>
                        <th scope="col">Horse Name</th>
                        <th scope="col">Show Name</th>
                        <th scope="col">Color</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Breed</th>
                        <th scope="col">Discipline</th>
                        <th scope="col symbol-col" className="actions"><i onClick={()=>{
                            history.push("/addhorse")
                            }} className="fas fa-plus form-add"></i></th>
                        </tr>
                    </thead>
                        <tbody>{record.data}</tbody>
                    </table>
                    
               
            </div>
      
    )
}

const mapStateToProps = (state) => {
    return{
    token: state.user.token
    }
  }
  

const mapDispatchToProps = (dispatch) => {
    return {
        getHorseRequest: () => dispatch(getHorseRequest()),
        getHorseSuccess: (data) => dispatch(getHorseSuccess(data)),
        getHorseFailure: (error) => dispatch(getHorseFailure(error)),

        getHorseRequestById: () => dispatch(getHorseRequestById()),
        getHorseSuccessById: (data) => dispatch(getHorseSuccessById(data)),
        getHorseFailureById: (error) => dispatch(getHorseFailureById(error)),

        deleteHorseRequest: () => dispatch(deleteHorseRequest()),
        deleteHorseSuccess: (data) => dispatch(deleteHorseSuccess(data)),
        deleteHorseFailure: (error) => dispatch(deleteHorseFailure(error)),
    }
}

export default withRouter( connect(mapStateToProps,mapDispatchToProps)(Horse) )
