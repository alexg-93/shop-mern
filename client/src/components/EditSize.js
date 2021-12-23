import React, { useState,useEffect } from "react";
import {

  Button,
  Form,
  Modal,
} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {editSize, getSizeDetails} from '../redux/actions/sizeActions';
import { SIZE_UPDATE_RESET } from "../redux/types";
const EditSize = ({id,history}) => {

  const dispatch = useDispatch();
  const sizeDetails = useSelector((state) => state.sizeDetailsReducer);
  const { size, loading, error } = sizeDetails;


  const sizeUpdate = useSelector((state) => state.sizeUpdateReducer);
  const { success:successUpdate, error: errorUpdate } = sizeUpdate;

  const [sizeInput, setSizeInput] = useState({size:''});

  const [message, setMessage] = useState("")



useEffect(() =>{

    //checks if update product success
    if(successUpdate){
  
     
        setMessage("size updated successfully")
        setTimeout(()=>{
          dispatch({type:SIZE_UPDATE_RESET})
          history.push('/admin/api/get')
        },3000)

  
      
  }else{
    if(!size || size._id!==id){
      dispatch(getSizeDetails(id))
    }
    setSizeInput({size:size.size})
  
   

  }
  
  },[dispatch,id,history,successUpdate,error,errorUpdate])



  return (
    <>
    {successUpdate && <Message 
                variant={successUpdate ? "success" : "danger"}
                text={message}
                 />}
    {loading ? <Loader/> : (
        <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Update API specifications</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormContainer>
            <Form>
              <Form.Group controlId="size" className="mt-3">
                <Form.Label>Size</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="size e.g S/M/L.."
                  value={sizeInput.size}
                  onChange={(e) =>(setSizeInput({size:e.target.value}))}
                ></Form.Control>
              </Form.Group>
            </Form>
          </FormContainer>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={()=>history.push('/admin/api/get')}>Go Back</Button>
          <Button variant="primary" onClick={()=>dispatch(editSize(sizeInput,id))}>Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    )}
      
    </>
  );
};

export default EditSize;
