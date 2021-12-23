import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productCreateReviewReducer,
} from "../redux/reducers/productReducers.js";

import {
  colorListReducer,
  colorDetailsReducer,
  colorDeleteReducer,
  colorCreateReducer,
  colorUpdateReducer,
} from "../redux/reducers/colorReducers.js";

import {
  sizeListReducer,
  sizeDetailsReducer,
  sizeDeleteReducer,
  sizeCreateReducer,
  sizeUpdateReducer,
} from "../redux/reducers/sizeReducers.js";

import {
  brandsListReducer,
  brandDetailsReducer,
  brandDeleteReducer,
  brandCreateReducer,
  brandUpdateReducer,
} from "../redux/reducers/brandReducers.js";

import {
  categoryListReducer,
  categoryDetailsReducer,
  categoryDeleteReducer,
  categoryCreateReducer,
  categoryUpdateReducer,
} from "../redux/reducers/categoryReducers.js";

import { filterReducer } from "./reducers/filterReducers.js";

const reducer = combineReducers({
  productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdateReducer,
  productCreateReviewReducer,
  filterReducer,

  colorListReducer,
  colorDetailsReducer,
  colorDeleteReducer,
  colorCreateReducer,
  colorUpdateReducer,

  brandsListReducer,
  brandDetailsReducer,
  brandDeleteReducer,
  brandCreateReducer,
  brandUpdateReducer,

  sizeListReducer,
  sizeDetailsReducer,
  sizeDeleteReducer,
  sizeCreateReducer,
  sizeUpdateReducer,

  categoryListReducer,
  categoryDetailsReducer,
  categoryDeleteReducer,
  categoryCreateReducer,
  categoryUpdateReducer,
});

const middleware = [thunk];
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
