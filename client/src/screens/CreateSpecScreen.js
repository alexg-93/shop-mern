import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

import { createColor } from "../redux/actions/colorActions";
import { createSize } from "../redux/actions/sizeActions";
import { createBrand } from "../redux/actions/brandActions";
import { createCategory } from "../redux/actions/categoryActions";

export const CreateSpecs = () => {
  const dispatch = useDispatch();

  const colorCreate = useSelector((state) => state.colorCreateReducer);

  const {
    error: errorColor,
    success: successColor,
    loading: loadingColor,
  } = colorCreate;


  const categoryCreate = useSelector((state) => state.categoryCreateReducer);

  const {
    error: errorCategory,
    success: successCategory,
    loading: loadingCategory,
  } = categoryCreate;

  const sizeCreate = useSelector((state) => state.sizeCreateReducer);

  const {
    error: errorSize,
    success: successSize,
    loading: loadingSize,
  } = sizeCreate;

  const brandCreate = useSelector((state) => state.brandCreateReducer);

  const {
    error: errorBrand,
    success: successBrand,
    loading: loadingBrand,
  } = brandCreate;

  const [color, setColor] = useState({
    colorName: "",
    colorHex: "",
  });
  const [size, setSize] = useState({
    size:""
  });
  const [brand, setBrand] = useState({
    brandName: "",
  });
  const [category, setCategory] = useState({
    department: "",
    categoryName: "",
  });


  const [message, setMessage] = useState("");


  useEffect(() =>{
    if(successCategory||successColor||successSize||successBrand){
      setMessage("Successfully created");
      setTimeout(() => {
        setMessage("");
      } , 5000);
    }else if(errorCategory||errorColor||errorSize||errorBrand){
      setMessage(errorCategory ? errorCategory : errorColor ? errorColor : errorSize ? errorSize : errorBrand);
      setTimeout(() => {
        setMessage("");
      } , 5000);
    }
  },[successCategory,successBrand,successColor,successSize,errorCategory,errorColor,errorSize,errorBrand] )

  const colorHandler = (e) => {
    e.preventDefault();
    dispatch(createColor(color));
    setColor({
      colorName: "",
      colorHex: "",
    })
  };

  const sizeHandler = (e) => {
    e.preventDefault();
    dispatch(createSize(size));
    setSize({size:""});
  };

  const brandHandler = (e) => {
    e.preventDefault();
    dispatch(createBrand(brand));
    setBrand({brandName:""});
  };

  const categoryHandler = (e) => {
    e.preventDefault();
    dispatch(createCategory(category));

    setCategory({
      department: "",
      categoryName: "",
    });
  };


  return (
    <FormContainer>
      <h1>Create new specifications</h1>
      {loadingColor && <Loader />}
      {loadingSize && <Loader />}
      {loadingCategory && <Loader />}
      {loadingBrand && <Loader />}
      {message && (
        <Message
          variant={successColor || successCategory || successBrand || successSize ? "success" : "danger"}
          text={message}
        ></Message>
      )}
      
      <Form>
        <Form.Group controlId="color" className="mt-3">
          <Form.Label>Color name</Form.Label>
          <Form.Control
        
            type="text"
            placeholder="Enter color name"
            value={color.colorName}
            onChange={(e) => setColor({colorName:e.target.value,colorHex:color.colorHex})}
          ></Form.Control>

          <Form.Label>Color Hex value</Form.Label>
          <Form.Control
           
            type="text"
            placeholder="Enter color hex"
            value={color.colorHex}
            onChange={(e) => setColor({colorName:color.colorName,colorHex:e.target.value})}
          ></Form.Control>

          <Button
            type="submit"
            variant="primary"
            className="mt-3"
            onClick={colorHandler}
          >
            Create color
          </Button>
        </Form.Group>

        <Form.Group controlId="brand" className="mt-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Brand"
            value={brand.brandName}
            onChange={(e) => setBrand({brandName:e.target.value})}
          ></Form.Control>
          <Button
            type="submit"
            variant="primary"
            className="mt-3"
            onClick={brandHandler}
          >
            Create Brand
          </Button>
        </Form.Group>

        <Form.Group controlId="size" className="mt-3">
          <Form.Label>Size</Form.Label>
          <Form.Control
            type="text"
            placeholder="size e.g S/M/L.."
            value={size.size}
            onChange={(e) => setSize({size:e.target.value})}
          ></Form.Control>
          <Button
            type="submit"
            variant="primary"
            className="mt-3"
            onClick={sizeHandler}
          >
            Create size
          </Button>
        </Form.Group>

        <Form.Group controlId="category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="department e.g Mens/Womens"
            value={category.department}
            onChange={(e) => setCategory({department:e.target.value,categoryName:category.categoryName})}
          ></Form.Control>

          <Form.Control
            required
            type="text"
            placeholder="category name e.g Jackets"
            value={category.categoryName}
            onChange={(e) => setCategory({categoryName:e.target.value,department:category.department})}
          ></Form.Control>

          <Button
            type="submit"
            variant="primary"
            className="mt-3"
            onClick={categoryHandler}
          >
            Create category
          </Button>
        </Form.Group>
      </Form>
    </FormContainer>
  );
};
