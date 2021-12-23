import {
    SIZE_LIST_REQUEST,
    SIZE_LIST_SUCCESS,
    SIZE_LIST_FAIL,
    SIZE_DETAILS_REQUEST,
    SIZE_DETAILS_SUCCESS,
    SIZE_DETAILS_FAIL,
    SIZE_DELETE_REQUEST,
    SIZE_DELETE_SUCCESS,
    SIZE_DELETE_FAIL,
    SIZE_CREATE_REQUEST,
    SIZE_CREATE_SUCCESS,
    SIZE_CREATE_FAIL,
    SIZE_CREATE_RESET,
    SIZE_UPDATE_REQUEST,
    SIZE_UPDATE_SUCCESS,
    SIZE_UPDATE_FAIL,
    SIZE_UPDATE_RESET,

  } from "../types";
  
  
  
  export const sizeListReducer = (
    state = { sizes: [], loading: null, error: null},
    action
  ) => {
    switch (action.type) {
      case SIZE_LIST_REQUEST:
        return {
          loading: true,
          sizes: [],
          error: null,
        };
      case SIZE_LIST_SUCCESS:
  
        return {
          loading: false,
          sizes: action.payload
       
        };
  
      case SIZE_LIST_FAIL:
        return { loading: false, error: action.payload };
      
     
      default:
        return state;
    }
  };
  
  export const sizeDetailsReducer = (state, action) => {
    state = {
      size: {},
      loading: null,
      error: null,
    };
    switch (action.type) {
      case SIZE_DETAILS_REQUEST:
        return {
          loading: true,
          size: {},
          error: null,
        };
      case SIZE_DETAILS_SUCCESS:
        return { loading: false, size: action.payload };
  
      case SIZE_DETAILS_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const sizeDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case SIZE_DELETE_REQUEST:
        return {
          loading: true,
        };
      case SIZE_DELETE_SUCCESS:
        return { loading: false, success: true };
  
      case SIZE_DELETE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const sizeCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case SIZE_CREATE_REQUEST:
        return {
          loading: true,
        };
      case SIZE_CREATE_SUCCESS:
        return { loading: false, success: true, size: action.payload };
  
      case SIZE_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case SIZE_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const sizeUpdateReducer = (state = { size: {} }, action) => {
    switch (action.type) {
      case SIZE_UPDATE_REQUEST:
        return {
          loading: true,
        };
      case SIZE_UPDATE_SUCCESS:
        return { loading: false, success: true };
  
      case SIZE_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case SIZE_UPDATE_RESET:
        return {
          size: {},
        };
      default:
        return state;
    }
  };
 