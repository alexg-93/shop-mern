import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  editCategory,
  getCategoryDetails,
} from "../redux/actions/categoryActions";
import { CATEGORY_UPDATE_RESET } from "../redux/types";

const EditCategory = ({ id, history }) => {
  const dispatch = useDispatch();
  const categoryDetails = useSelector((state) => state.categoryDetailsReducer);
  const { category, loading, error } = categoryDetails;

  const categoryUpdate = useSelector((state) => state.categoryUpdateReducer);
  const { success: successUpdate, error: errorUpdate } = categoryUpdate;

  const [categoryInput, setCategoryInput] = useState({
    department: "",
    categoryName: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    //checks if update product success
    if (successUpdate) {
      setMessage("category updated successfully");
      setTimeout(() => {
        dispatch({ type: CATEGORY_UPDATE_RESET });
        history.push("/admin/api/get");
      }, 3000);
    } else {
      if (!category || category._id !== id) {
        dispatch(getCategoryDetails(id));
      }
      setCategoryInput({
        categoryName: category.categoryName,
        department: category.department,
      });
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
                <Form.Group controlId="category" className="mt-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="department e.g Mens/Womens"
                    value={categoryInput.department}
                    onChange={(e) =>
                      setCategoryInput({
                        department: e.target.value,
                        categoryName: categoryInput.categoryName,
                      })
                    }
                  ></Form.Control>

                  <Form.Control
                    required
                    type="text"
                    placeholder="category name e.g Jackets"
                    value={categoryInput.categoryName}
                    onChange={(e) =>
                      setCategoryInput({
                        categoryName: e.target.value,
                        department: categoryInput.department,
                      })
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
              onClick={() => dispatch(editCategory(categoryInput, id))}
            >
              Save changes
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      )}
    </>
  );
};

export default EditCategory;
