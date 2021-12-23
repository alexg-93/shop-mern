import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { editBrand, getBrandDetails } from "../redux/actions/brandActions";
import { BRAND_UPDATE_RESET } from "../redux/types";
const EditBrand = ({ id, history }) => {
  const dispatch = useDispatch();
  const brandDetails = useSelector((state) => state.brandDetailsReducer);
  const { brand, loading, error } = brandDetails;

  const brandUpdate = useSelector((state) => state.brandUpdateReducer);
  const { success: successUpdate, error: errorUpdate } = brandUpdate;

  const [brandInput, setBrandInput] = useState({ brandName: "" });

  const [message, setMessage] = useState("");

  useEffect(() => {
    //checks if update product success
    if (successUpdate) {
      setMessage("brand updated successfully");
      setTimeout(() => {
        dispatch({ type: BRAND_UPDATE_RESET });
        history.push("/admin/api/get");
      }, 3000);
    } else {
      if (!brand || brand._id !== id) {
        dispatch(getBrandDetails(id));
      }
      setBrandInput({ brandName: brand.brandName });
    }
  }, [dispatch, id, history, successUpdate, error, errorUpdate]);


  return (
    <>
      {successUpdate && (
        <Message
          variant={successUpdate ? "success" : "danger"}
          text={message}
        />
      )}
      {loading ? (
        <Loader />
      ) : (
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Update API specifications</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <FormContainer>
              <Form>
                <Form.Group controlId="brand" className="mt-3">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Brand"
                    value={brandInput.brandName}
                    onChange={(e) =>
                      setBrandInput({ brandName: e.target.value })
                    }
                  ></Form.Control>
                </Form.Group>
              </Form>
            </FormContainer>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => history.push("/admin/api/get")}
            >
              Go Back
            </Button>
            <Button
              variant="primary"
              onClick={() => dispatch(editBrand(brandInput, id))}
            >
              Save changes
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      )}
    </>
  );
};

export default EditBrand;
