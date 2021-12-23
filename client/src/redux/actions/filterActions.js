
const FILTER_OPEN = 'FILTER_OPEN'
const FILTER_CLOSE = 'FILTER_CLOSE'

export const openFilter = () => async(dispatch)=>{
    dispatch({
        type:FILTER_OPEN,
        payload: true
    })
   

}

export const closeFilter = () =>async(dispatch)=>{
    dispatch({
        type:FILTER_CLOSE,
        payload:false
    })

}

