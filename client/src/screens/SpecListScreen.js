import React, { useEffect} from "react";
import {

  Button,
  Row,
  Col
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { LinkContainer } from "react-router-bootstrap";

import { getBrands ,deleteBrand} from "../redux/actions/brandActions";
import { getCategories,deleteCategory} from "../redux/actions/categoryActions";
import { getColors,deleteColor} from "../redux/actions/colorActions";
import { getSizes,deleteSize} from "../redux/actions/sizeActions";
import TableData from "../components/Table";



const SpecListScreen = () => {

  const dispatch = useDispatch();


  const brandsList = useSelector((state) => state.brandsListReducer);
  const { brands, loading: brandsLoading,error:errorBrands } = brandsList;

  const categoriesList = useSelector((state) => state.categoryListReducer);
  const { categories, loading: categoriesLoading ,error:errorCategories} = categoriesList;

  const colorsList = useSelector((state) => state.colorListReducer);
  const { colors, loading: colorsLoading,error:errorColors } = colorsList;

  const sizesList = useSelector((state) => state.sizeListReducer);
  const { sizes, loading: sizesLoading,error:errorSizes } = sizesList;

  const colorDelete = useSelector((state) => state.colorDeleteReducer);
  const { success: successDeleteColor, error: errorDeleteColor } = colorDelete;

  const sizeDelete = useSelector((state) => state.sizeDeleteReducer);
  const { success: successDeleteSize, error: errorDeleteSize} = sizeDelete;

  const brandDelete = useSelector((state) => state.brandDeleteReducer);
  const { success: successDeleteBrand, error: errorDeleteBrand } = brandDelete;

  const categoryDelete = useSelector((state) => state.categoryDeleteReducer);
  const { success: successDeleteCategory, error: errorDeleteCategory } = categoryDelete;
  


  useEffect(() => {
    dispatch(getBrands());
    dispatch(getColors());
    dispatch(getCategories());
    dispatch(getSizes());
  }, [dispatch,successDeleteBrand,successDeleteCategory,successDeleteColor,successDeleteSize]);

  const deleteColorHandler = (id) => {

    dispatch(deleteColor(id));
  };

  const deleteSizeHandler = (id) => {
    dispatch(deleteSize(id));
  };

  const deleteCategoryHandler = (id) => {
    dispatch(deleteCategory(id));
  };

  const deleteBrandHandler = (id) => {
    dispatch(deleteBrand(id));
  };

    
  // const filterColorsHandler = (keyword) => {
 
  //   if (keyword !== "") {
  //     let filteredColors = array?.filter((item) =>(item.colorName.toLowerCase().includes(name.toLowerCase())));
  //     setColors(filteredColors);
  //   } else {
  //     setColors(colorsList);
   
  //   }
  // };

  return (
    <>
      <h1>ALL API DATA</h1>
      <Row className="d-flex justify-content-center mb-4" md='auto'>
       
        <Col className="text-right" >
          <LinkContainer to={`/admin/api/post`}>
            <Button >
              <i className="fas fa-plus"></i> Create new specifications
            </Button>
          </LinkContainer>
        </Col>
       
      </Row>

      {colorsLoading || sizesLoading || brandsLoading || categoriesLoading ? (
        <Loader />
      ) : errorColors || errorSizes || errorCategories || errorBrands ? (
        <Message variant="danger" text={errorCategories ? errorCategories : errorColors ? errorColors : errorSizes ? errorSizes : errorBrands} />
      ) : (
        <>
        <TableData array={colors} deleteHandler={deleteColorHandler} name="colors"/>
        <TableData array={sizes} deleteHandler={deleteSizeHandler} name="sizes"/>
        <TableData array={brands} deleteHandler={deleteBrandHandler} name="brands"/>
        <TableData array={categories} deleteHandler={deleteCategoryHandler} name="categories"/>
       </>
      )}
    </>
  );
};

export default SpecListScreen;


