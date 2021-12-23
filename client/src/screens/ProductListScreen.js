import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Row,
  Col,
  Image,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts, deleteProduct } from "../redux/actions/productActions";
import { LinkContainer } from "react-router-bootstrap";


const ProductListScreen = ({ history , match }) => {

  const dispatch = useDispatch();

  const productListReducer = useSelector((state) => state.productListReducer);

  const { loading, error, products: productList} = productListReducer;

  const [products, setProducts] = useState([]);

  const productDelete = useSelector((state) => state.productDelete);

  const { success: successDelete, error: errorDelete } = productDelete;

  useEffect(() => {
 
      dispatch(listProducts());
  }, [dispatch, history,successDelete]);

  useEffect(() => {
   
    if(productList){
     setProducts(productList);
    }
  }, [productList]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const filterProductsHandler = (name) => {
 
    if (name !== "") {
      let filteredProducts = productList?.filter((prod) =>(prod.title.toLowerCase().includes(name.toLowerCase())));
      setProducts(filteredProducts);
    } else {
      setProducts(productList);
   
    }
  };

  return (
    <>
      <h1>Products</h1>
      <Row className="d-flex justify-content-center mb-4" md='auto'>
        
        <Col>
          <InputGroup >
            <FormControl
              placeholder="Search product"
              onChange={(e) => filterProductsHandler(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col className="text-right" >
          <LinkContainer to={`/admin/product/newproduct`}>
            <Button >
              <i className="fas fa-plus"></i> Create Product
            </Button>
          </LinkContainer>
        </Col>
       
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" text={error} />
      ) : errorDelete ? (
        <Message variant="danger" text={errorDelete} />
      ) : (
        <>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Categories</th>
              <th>Price</th>
              <th>In Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>
                  <LinkContainer to={`/product/${product._id}`} style={{cursor:'pointer'}}>
                    <Image
                      src={product.image}
                       width="100px"
                      thumbnail
                      alt="product-img"
                    />
                    </LinkContainer>
                  </td>

                  <td>{product.title}</td>
                  <td>{product.brand}</td>
                  <td>{product.categories.map(cat=>(<><p>{cat.department}</p><p>{cat.categoryName}</p></>))}</td>
                  <td>${product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <Col style={{ display: "flex" }}>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button className="btn-sm" variant="light">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        className="btn-sm"
                        variant="danger"
                        style={{ marginLeft: "10px" }}
                        onClick={() => deleteProductHandler(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
       
        </>
      )}
    </>
  );
};

export default ProductListScreen;
