import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { editColor, getColorDetails } from "../redux/actions/colorActions";
import { COLOR_UPDATE_RESET } from "../redux/types";

const EditColor = ({ id, history }) => {
  const dispatch = useDispatch();
  const colorDetails = useSelector((state) => state.colorDetailsReducer);
  const { color, loading, error } = colorDetails;

  const brandUpdate = useSelector((state) => state.colorUpdateReducer);
  const { success: successUpdate, error: errorUpdate } = brandUpdate;

  const [colorInput, setColorInput] = useState({
    colorName: "",
    colorHex: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    //checks if update product success
    if (successUpdate) {
      setMessage("color updated successfully");
      setTimeout(() => {
        dispatch({ type: COLOR_UPDATE_RESET });
        history.push("/admin/api/get");
      }, 3000);
    } else {
      if (!color || color._id !== id) {
        dispatch(getColorDetails(id));
      }
      setColorInput({ colorName: color.colorName, colorHex: color.colorHex });
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
                <Form.Group controlId="color" className="mt-3">
                  <Form.Label>Color name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter color name"
                    value={colorInput.colorName}
                    onChange={(e) =>
                      setColorInput({
                        colorName: e.target.value,
                        colorHex: colorInput.colorHex,
                      })
                    }
                  ></Form.Control>

                  <Form.Label>Color Hex value</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter color hex"
                    value={colorInput.colorHex}
                    onChange={(e) =>
                      setColorInput({
                        colorName: colorInput.colorName,
                        colorHex: e.target.value,
                      })
                    }
                  />
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
              onClick={() => dispatch(editColor(colorInput, id))}
            >
              Save changes
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      )}
    </>
  );
};

export default EditColor;
