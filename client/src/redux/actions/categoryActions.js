import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
  
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,
  
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_FAIL,
  
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
  
    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
  
  } from "../types";
  import axios from "axios";
  
  
  
  export const getCategories = () => async (dispatch,getState) => {
    
      try {
         
              dispatch({type: CATEGORY_LIST_REQUEST})
              const { data } = await axios.get(`/api/category`);
              const {categories} = data
        
              dispatch({
                type: CATEGORY_LIST_SUCCESS,
                payload: categories
               
              });
           
            
      
    } catch (error) {
        dispatch({
            type:CATEGORY_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
  };
  
  export const getCategoryDetails = (id) => async(dispatch)=>{
      dispatch({type: CATEGORY_DETAILS_REQUEST})
      try {
  
          const { data } = await axios.get(`/api/category/${id}`);
          const {category} = data
          if(category){

              dispatch({
                  type: CATEGORY_DETAILS_SUCCESS,
                  payload: category
                });
              
          }else{
              dispatch({
                  type:CATEGORY_DETAILS_FAIL,
                  payload:`Error : ${data.message} statusCode ${data.statusCode}`
              })
          }
        } catch (error) {
            dispatch({
                type:CATEGORY_DETAILS_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
  }
  
  export const deleteCategory = (id) => async (dispatch,getState) => {
      try {
        dispatch({
          type: CATEGORY_DELETE_REQUEST
        });
    
        const config = {
            headers: {
              Authorization:""
            },
          };
      
          await axios.delete(`/api/category/${id}`,config);
        
            dispatch({
              type: CATEGORY_DELETE_SUCCESS
            });
    
           
      } catch (error) {
        dispatch({
            type: CATEGORY_DELETE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
      }
    };
  
  
    export const createCategory = (newCategory) => async (dispatch,getState) => {
      try {
        dispatch({
          type: CATEGORY_CREATE_REQUEST
        });
    
      
        const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization:""
            },
          };
    
          const { data } = await axios.post(
            `/api/category`,newCategory,
            config
          );
          
            dispatch({
              type: CATEGORY_CREATE_SUCCESS,
              payload: data,
            });
     
      } catch (error) {
        dispatch({
            type: CATEGORY_CREATE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
      }
    };
  
  
  export const editCategory = (currentCategory,id) => async (dispatch,getState) => {
    try {
      dispatch({
        type: CATEGORY_UPDATE_REQUEST
      });
  
  
      const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization:""
          },
        };
  
      const {data} = await axios.put(`/api/category/${id}`,currentCategory,config);
   
        if(data){
          dispatch({
            type: CATEGORY_UPDATE_SUCCESS,
          });
          dispatch({
            type: CATEGORY_DETAILS_SUCCESS,
            payload:data
          });
   
        }
  
    } catch (error) {
      dispatch({
          type: CATEGORY_UPDATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
    }
  };
  