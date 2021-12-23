import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
} from "../redux/actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../redux/types";


const ProductScreen = ({ history, match }) => {

  const productId = match.params.id

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product } = productDetails;



  const productCreateReview = useSelector(
    (state) => state.productCreateReviewReducer
  );

  const { error: errorCreateReview, success: successCreateReview } =
    productCreateReview;

  useEffect(() => {

    if(successCreateReview){
      setRating(0)
      setComment("")
      dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    }

    dispatch(listProductDetails(match.params.id));
    

  }, [dispatch, match,successCreateReview,errorCreateReview]);

  const [Quantity, setQuantity] = useState(1);
  const [color,setColor] = useState("");
  const [size,setSize] = useState("")
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const createReviewHandler = (e) => {
      e.preventDefault();
      dispatch(createProductReview(productId,{rating,comment}))
      dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
  }


  return (
    <>
 

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" text={error} />
      ) : (
        <>
          <Link to="/" className="btn btn-light my-3">
            Go Back
          </Link>
          <Row>
            <Col md={6} style={{display:'flex',justifyContent:'center',justifyItems:'center'}}>
              <Image src={product.image} alt={product.title} fluid  width={400} height='100%'/>
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>{product.title}</ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating ? product.rating : 0}
                    text={`${product.numReviews ? product.numReviews : 0} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
                <ListGroup.Item>
                  Brand : {product.brand}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Price: ${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Status:{" "}
                        {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.quantity > 0 && (
                    <>
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Form.Control
                          as="select"
                          value={Quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        >
                          {[...Array(product.quantity).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Row>
                    </ListGroup.Item>


                    <ListGroup.Item>
                      <Row>
                        <Col>Select Color</Col>
                        <Form.Control
                          as="select"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                        >
                          <option value="">Select color</option>
                          {product.colors.map((col) =>(
                            <option key={col} value={col}>
                                 {col}
                             </option>)
                          )}

        
                        </Form.Control>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Select size</Col>
                        <Form.Control
                          as="select"
                          value={size}
                          onChange={(e) => setSize(e.target.value)}
                        >
                          <option value="">Select size</option>
                          {product.sizes.map((s) =>(
                            <option key={s._id} value={s}>
                                 {s}
                             </option>)
                          )}

        
                        </Form.Control>
                      </Row>
                    </ListGroup.Item>
                    </>

                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn-block w-100"
                      type="button"
                      disabled={product.quantity === 0}
                   
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product?.reviews?.length === 0 && <Message text="No Reviews" />}
              <ListGroup variant="flush">
                {product?.reviews?.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    {review.comment}
                    <p>
                      created at :{" "}
                      {review.createdAt.substring(0, 10).replace("T", " ")}
                    </p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h2>Leave a review</h2>
                  {errorCreateReview && <Message variant='danger' text={errorCreateReview}/>}
                
                    <Form onSubmit={createReviewHandler}>
                    <Form.Label>Rating</Form.Label>
                    <Form.Group controlId="rating">
                       
                          <Form.Control
                          required={true}
                            as='select'
                            value={rating}
                            onChange={(e)=>setRating(e.target.value)}
                          >
                          <option value=''>Select..</option>
                          <option value='1'>1 Star</option>
                          <option value='2'>2 Star</option>
                          <option value='3'>3 Star</option>
                          <option value='4'>4 Star</option>
                          <option value='5'>5 Star</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="comment" className="mt-3">
                        <FloatingLabel
                          controlId="comment"
                          label="comment"
                        >
                          <Form.Control
                            required
                            as="textarea"
                            value={comment || ""}
                            style={{ height: "100px" }}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </FloatingLabel>
                      </Form.Group>
                      <Button type="submit" variant='success' className='mt-2'>Submit</Button>
                    </Form>
                  
              
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
