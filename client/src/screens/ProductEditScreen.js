import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button,FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {listProductDetails,editProduct} from "../redux/actions/productActions";
import {PRODUCT_UPDATE_RESET} from "../redux/types";
import FormContainer from "../components/FormContainer";


import { getBrands } from "../redux/actions/brandActions";
import { getCategories } from "../redux/actions/categoryActions";
import { getColors } from "../redux/actions/colorActions";
import { getSizes } from "../redux/actions/sizeActions";


const ProductEditScreen = ({ match, history }) => {

  const productID = match.params.id

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState({});
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);

  const [message,setMessage] = useState("")

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);

  const { loading, error , product } = productDetails;


  const updateProduct = useSelector((state) => state.productUpdateReducer);

  const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = updateProduct;


  
  const brandsList = useSelector((state) => state.brandsListReducer);
  const { brands, loading: brandsLoading } = brandsList;

  const categoriesList = useSelector((state) => state.categoryListReducer);
  const { categories, loading: categoriesLoading } = categoriesList;

  const colorsList = useSelector((state) => state.colorListReducer);
  const { colors, loading: colorsLoading } = colorsList;

  const sizesList = useSelector((state) => state.sizeListReducer);
  const { sizes, loading: sizesLoading } = sizesList;
  
    useEffect(() =>{

      //checks if update product success
      if(successUpdate){
    
        setMessage("Product updated successfully")
        setTimeout(()=>{
          dispatch({type:PRODUCT_UPDATE_RESET})
          history.push('/admin/products')
        },1500)
    
        
    }else{
      if(!product || product._id!==productID){
        dispatch(listProductDetails(productID))
      }
      setTitle(product.title)
      setPrice(product.price)
      setQuantity(product.quantity)
      setImage(product.image)
      setDescription(product.description)
     

    }
    
    },[dispatch,productID,history,successUpdate,error,errorUpdate])

    useEffect(() => {
      dispatch(getBrands());
      dispatch(getColors());
      dispatch(getCategories());
      dispatch(getSizes());
    }, []);
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(editProduct(
      {
        _id:productID,
        title,
        price,
        quantity,
        description,
        colors: [color],
        brand,
        sizes: [size],
        categories: category,
        image,
      
      }
    ))
   
};

  return (
    <>
    <Link to='/admin/products' className='btn btn-light my-3'>
      Go Back
    </Link>

    {}
  
 
      <h1>Edit Product</h1>
      {loadingUpdate && <Loader/>}
      {loading && <Loader/>}
      {error && <Message variant="danger" text={error}></Message>}
      {message && <Message variant={successUpdate ? 'success' : 'danger'} text={message}></Message>}
      {errorUpdate && <Message variant="danger" text={errorUpdate}></Message>}
  
      <FormContainer>
      <Form onSubmit={submitHandler} noValidate>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Control>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="quantity" className="mt-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Product Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            ></Form.Control>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="brand" className="mt-3" custom>
            <Form.Label>Select brand</Form.Label>
            <Form.Control
              required
              as="select"
              onChange={(e) => {
                setBrand(e.target.value);
              }}
          
            >
              <option value="">select brand</option>
              {brands.map((item) => (
                <>
                  <option key={item._id} value={item.brandName}>
                    {item.brandName}
                  </option>
                </>
              ))}
            
            </Form.Control>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="color" className="mt-3">
            <Form.Label>Select color</Form.Label>
            <Form.Control
              required
              as="select"
              onChange={(e) => {
                setColor(e.target.value);
              }}
            >
              <option value="">select color</option>
              {colors.map((col) => (
                <>
                  <option key={col._id} value={col.colorName}>
                    {col.colorName}
                  </option>
                </>
              ))}
            </Form.Control>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="sizes" className="mt-3">
            <Form.Label>Select sizes</Form.Label>
            <Form.Control
              required
              as="select"
              onChange={(e) => setSize(e.target.value)}
              
            >
              <option value="">select size</option>
              {sizes.map((s) => (
                <option key={s.size} value={s.size}>
                  {s.size}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="category" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              required
              as="select"
              onChange={(e) =>
                setCategory((prevState) => ({
                  ...prevState,
                  categoryName: e.target.value,
                }))
              }
            >
              <option value="">Select type of clothes</option>
              {Array.from(new Set(categories.map((a) => a.categoryName)))
                .map((cat) => categories.find((a) => a.categoryName === cat))
                .map((cat) => (
                  <option key={cat._id} value={cat.categoryName}>
                    {cat.categoryName}
                  </option>
                ))}
           
            </Form.Control>

            <Form.Control
              required
              as="select"
              onChange={(e) =>
                setCategory((prevState) => ({
                  ...prevState,
                  department: e.target.value,
                }))
              }
            >
              <option value="">Select department of clothes</option>
              {Array.from(new Set(categories.map((a) => a.department)))
                .map((cat) => categories.find((a) => a.department === cat))
                .map((cat) => (
                  <option key={cat._id} value={cat.department}>
                  {cat.department}
                </option>
                ))}
             
            </Form.Control>

            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="description" className="mt-3">
            <Form.Label>Description</Form.Label>
            <FloatingLabel controlId="description" label="description">
              <Form.Control
                required
                as="textarea"
                value={description}
                style={{ height: "100px" }}
                onChange={(e) => setDescription(e.target.value)}
              />
               <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </FloatingLabel>
           
          </Form.Group>

          <Form.Group controlId="img" className="mt-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Product Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
         
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Update
          </Button>
        </Form>
    </FormContainer>
    </>
  );
};

export default ProductEditScreen;
