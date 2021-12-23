import {
    COLOR_LIST_REQUEST,
    COLOR_LIST_SUCCESS,
    COLOR_LIST_FAIL,
  
    COLOR_DETAILS_REQUEST,
    COLOR_DETAILS_SUCCESS,
    COLOR_DETAILS_FAIL,
  
    COLOR_DELETE_REQUEST,
    COLOR_DELETE_SUCCESS,
    COLOR_DELETE_FAIL,
  
    COLOR_CREATE_REQUEST,
    COLOR_CREATE_SUCCESS,
    COLOR_CREATE_FAIL,
  
    COLOR_UPDATE_REQUEST,
    COLOR_UPDATE_SUCCESS,
    COLOR_UPDATE_FAIL,
  
  } from "../types";
  import axios from "axios";
  
  
  
  export const getColors = () => async (dispatch,getState) => {
    
      try {
         
              dispatch({type: COLOR_LIST_REQUEST})
              const { data } = await axios.get(`/api/colors`);
              const {colors} = data
           
             
              dispatch({
                type: COLOR_LIST_SUCCESS,
                payload: colors
               
              });
           
            
      
    } catch (error) {
        dispatch({
            type:COLOR_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
  };
  
  export const getColorDetails = (id) => async(dispatch)=>{
      dispatch({type: COLOR_DETAILS_REQUEST})
      try {
  
          const { data } = await axios.get(`/api/colors/${id}`);
          const {color} = data
          if(color){

              dispatch({
                  type: COLOR_DETAILS_SUCCESS,
                  payload: color
                });
              
          }else{
              dispatch({
                  type:COLOR_DETAILS_FAIL,
                  payload:`Error : ${data.message} statusCode ${data.statusCode}`
              })
          }
        } catch (error) {
            dispatch({
                type:COLOR_DETAILS_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
  }
  
  export const deleteColor = (id) => async (dispatch,getState) => {
      try {
        dispatch({
          type: COLOR_DELETE_REQUEST
        });
    
        const config = {
            headers: {
              Authorization:""
            },
          };
      
          await axios.delete(`/api/colors/${id}`,config);
        
            dispatch({
              type: COLOR_DELETE_SUCCESS
            });
    
           
      } catch (error) {
        dispatch({
            type: COLOR_DELETE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
      }
    };
  
  
    export const createColor = (newColor) => async (dispatch,getState) => {
      try {
        dispatch({
          type: COLOR_CREATE_REQUEST
        });
    
      
        const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization:""
            },
          };
    
          const { data } = await axios.post(
            `/api/colors`,newColor,
            config
          );
          
            dispatch({
              type: COLOR_CREATE_SUCCESS,
              payload: data,
            });
     
      } catch (error) {
        dispatch({
            type: COLOR_CREATE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
      }
    };
  
  
  export const editColor = (currentColor,id) => async (dispatch,getState) => {

    try {
      dispatch({
        type: COLOR_UPDATE_REQUEST
      });
  
  
      const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization:""
          },
        };
  
      const {data} = await axios.put(`/api/colors/${id}`,currentColor,config);
   
        if(data){
          dispatch({
            type: COLOR_UPDATE_SUCCESS,
          });
          dispatch({
            type: COLOR_DETAILS_SUCCESS,
            payload:data
          });
   
        }
  
    } catch (error) {
      dispatch({
          type: COLOR_UPDATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
    }
  };
  