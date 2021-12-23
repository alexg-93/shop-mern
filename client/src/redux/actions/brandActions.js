import {
    BRAND_LIST_REQUEST,
    BRAND_LIST_SUCCESS,
    BRAND_LIST_FAIL,
  
    BRAND_DETAILS_REQUEST,
    BRAND_DETAILS_SUCCESS,
    BRAND_DETAILS_FAIL,
  
    BRAND_DELETE_REQUEST,
    BRAND_DELETE_SUCCESS,
    BRAND_DELETE_FAIL,
  
    BRAND_CREATE_REQUEST,
    BRAND_CREATE_SUCCESS,
    BRAND_CREATE_FAIL,
  
    BRAND_UPDATE_REQUEST,
    BRAND_UPDATE_SUCCESS,
    BRAND_UPDATE_FAIL,
  
  } from "../types";
  import axios from "axios";
  
  
  
  export const getBrands = () => async (dispatch,getState) => {
    
      try {
         
              dispatch({type: BRAND_LIST_REQUEST})
              const { data } = await axios.get(`/api/brands`);
              const {brands} = data
           
              dispatch({
                type: BRAND_LIST_SUCCESS,
                payload: brands
               
              });
          
    } catch (error) {
        dispatch({
            type:BRAND_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
  };
  
  export const getBrandDetails = (id) => async(dispatch)=>{
      dispatch({type: BRAND_DETAILS_REQUEST})
      try {
  
          const { data } = await axios.get(`/api/brands/${id}`);
          const {brand} = data

      

          if(brand){

              dispatch({
                  type: BRAND_DETAILS_SUCCESS,
                  payload: brand
                });
              
          }else{
              dispatch({
                  type:BRAND_DETAILS_FAIL,
                  payload:`Error : ${data.message} statusCode ${data.statusCode}`
              })
          }
        } catch (error) {
            dispatch({
                type:BRAND_DETAILS_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
  }
  
  export const deleteBrand = (id) => async (dispatch,getState) => {
      try {
        dispatch({
          type: BRAND_DELETE_REQUEST
        });
    
        const config = {
            headers: {
              Authorization:""
            },
          };
      
          await axios.delete(`/api/brands/${id}`,config);
        
            dispatch({
              type: BRAND_DELETE_SUCCESS
            });
    
           
      } catch (error) {
        dispatch({
            type: BRAND_DELETE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
      }
    };
  
  
    export const createBrand = (newBrand) => async (dispatch,getState) => {
      try {
        dispatch({
          type: BRAND_CREATE_REQUEST
        });
    
      
        const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization:""
            },
          };
    
          const { data } = await axios.post(
            `/api/brands`,newBrand,
            config
          );
          
            dispatch({
              type: BRAND_CREATE_SUCCESS,
              payload: data,
            });
     
      } catch (error) {
        dispatch({
            type: BRAND_CREATE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
      }
    };
  
  
  export const editBrand = (currentBrand,id) => async (dispatch,getState) => {

    
    try {
      dispatch({
        type: BRAND_UPDATE_REQUEST
      });
  
  
      const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization:""
          },
        };
  
      const {data} = await axios.put(`/api/brands/${id}`,currentBrand,config);
   
        if(data){
          dispatch({
            type: BRAND_UPDATE_SUCCESS,
          });
          dispatch({
            type: BRAND_DETAILS_SUCCESS,
            payload:data
          });
   
        }
  
    } catch (error) {
      dispatch({
          type: BRAND_UPDATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
    }
  };
  