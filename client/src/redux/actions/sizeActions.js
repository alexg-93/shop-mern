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
  
    SIZE_UPDATE_REQUEST,
    SIZE_UPDATE_SUCCESS,
    SIZE_UPDATE_FAIL,
  
  } from "../types";
  import axios from "axios";
  
  
  
  export const getSizes = () => async (dispatch,getState) => {
    
      try {
         
              dispatch({type: SIZE_LIST_REQUEST})
              const { data } = await axios.get(`/api/sizes`);
              const {sizes} = data
           
             
              dispatch({
                type: SIZE_LIST_SUCCESS,
                payload: sizes
               
              });
           
            
      
    } catch (error) {
        dispatch({
            type:SIZE_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
  };
  
  export const getSizeDetails = (id) => async(dispatch)=>{
      dispatch({type: SIZE_DETAILS_REQUEST})
      try {
  
          const { data } = await axios.get(`/api/sizes/${id}`);
          const {size} = data
          if(size){

              dispatch({
                  type: SIZE_DETAILS_SUCCESS,
                  payload: size
                });
              
          }else{
              dispatch({
                  type:SIZE_DETAILS_FAIL,
                  payload:`Error : ${data.message} statusCode ${data.statusCode}`
              })
          }
        } catch (error) {
            dispatch({
                type:SIZE_DETAILS_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
  }
  
  export const deleteSize = (id) => async (dispatch,getState) => {
      try {
        dispatch({
          type: SIZE_DELETE_REQUEST
        });
    
        const config = {
            headers: {
              Authorization:""
            },
          };
      
          await axios.delete(`/api/sizes/${id}`,config);
        
            dispatch({
              type: SIZE_DELETE_SUCCESS
            });
    
           
      } catch (error) {
        dispatch({
            type: SIZE_DELETE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
      }
    };
  
  
    export const createSize = (newSize) => async (dispatch,getState) => {
      try {
        dispatch({
          type: SIZE_CREATE_REQUEST
        });
    
      
        const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization:""
            },
          };
    
          const { data } = await axios.post(
            `/api/sizes`,newSize,
            config
          );
          
            dispatch({
              type: SIZE_CREATE_SUCCESS,
              payload: data,
            });
     
      } catch (error) {
        dispatch({
            type: SIZE_CREATE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
      }
    };
  
  
  export const editSize = (currentSize,id) => async (dispatch,getState) => {

    console.log(currentSize)
    try {
      dispatch({
        type: SIZE_UPDATE_REQUEST
      });
  
  
      const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization:""
          },
        };
  
      const {data} = await axios.put(`/api/sizes/${id}`,currentSize,config);
   
        if(data){
          dispatch({
            type: SIZE_UPDATE_SUCCESS,
          });
          dispatch({
            type: SIZE_DETAILS_SUCCESS,
            payload:data
          });
   
        }
  
    } catch (error) {
      dispatch({
          type: SIZE_UPDATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
    }
  };
  