import { v4 as uuidv4 } from 'uuid';




export  const SET_ALERT = 'SER_ALERT'
export  const REMOVE_ALERT = 'REMOVE_ALERT'


export const setAlert = (message , color) => {
    return  (dispatch) => {
            let id = uuidv4();
            dispatch({type : SET_ALERT , payload : {message , color , id}});
            setTimeout(() => {dispatch(removeAlert(id))} , 3000)
    }
}

 const removeAlert = (id) => {
    return  (dispatch) => {
            dispatch({type: REMOVE_ALERT, payload: {id}})

    }
}