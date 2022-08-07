import axios from "axios";
import * as alertAction from '../alert/alert.action'
import * as userUtil from '../../util/userUtil'
import * as tokenUtil from '../../util/tokenUtil'
export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';


export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LoGIN_SUCCESS = 'USER_LoGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const  GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST'
export const  GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS'
export const  GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE'


export const  UPDATE_USER_ADDRESS_REQUEST = 'UPDATE_USER_ADDRESS_REQUEST'
export const  UPDATE_USER_ADDRESS_SUCCESS= 'UPDATE_USER_ADDRESS_SUCCESS'
export const  UPDATE_USER_ADDRESS_FAILURE = 'UPDATE_USER_ADDRESS_FAILURE'

export const LOGOUT = "LOGOUT"





export const updateUserAddress = (address) => {
     return async (dispatch) => {
         if (userUtil.getToken()){
             tokenUtil.isAuthenticate(userUtil.getToken())
         }
         try {

             dispatch({type:UPDATE_USER_ADDRESS_REQUEST});
             let  dataUrl = `${process.env.REACT_APP_EXPRESS_SERVER}/api/users/address`
             let response = await axios.post(dataUrl,address);
             dispatch({type:UPDATE_USER_ADDRESS_SUCCESS, payload: response.data});
             dispatch(alertAction.setAlert(response.data.message, 'success'));


         }
         catch (error) {
             console.log(error)
             dispatch({type: UPDATE_USER_ADDRESS_FAILURE , padding : error.response.data()})

         }
     }
}


export const logOut = (navigate) => {
    return (dispatch) => {
        dispatch({type:LOGOUT})
        dispatch(alertAction.setAlert('Logout successfully ' , 'success'))
        navigate("/")
    }
}

export const userRegister = (userInfo , navigate) => {
    return async (dispatch) => {

        try {
           dispatch({type : USER_REGISTER_REQUEST }) ;
           let URL = `${process.env.REACT_APP_EXPRESS_SERVER}/api/users/register`
           let response = await axios.post(URL,userInfo);
           dispatch({type:USER_REGISTER_SUCCESS, payload : response.data});
           dispatch(alertAction.setAlert(response.data.message , 'success'))
            navigate('/users/login')

        }
        catch (error) {
           console.error(error);
           dispatch({type : USER_REGISTER_FAILURE , payload : error});
            let errorList = error.response.data.errors;
            for (let error of errorList){
                dispatch(alertAction.setAlert(error.message , 'danger'))
            }
        }
    }
};


export const userLogin = (userInfo,navigate) => {
    return async (dispatch) => {
        try{
            dispatch({type:USER_LOGIN_REQUEST});
            let url = `${process.env.REACT_APP_EXPRESS_SERVER }/api/users/login`
            let response = await axios.post(url,userInfo);
            dispatch({type: USER_LoGIN_SUCCESS , payload:response.data});
            dispatch(alertAction.setAlert(response.data.message , 'success'));
            dispatch(getUserInfo())
            navigate('/')
        }
        catch (error) {
            console.error(error)
            dispatch({type:USER_LOGIN_FAILURE, payload : error});
            let errorList = error.response.data.errors;
            for (let error of errorList){
                console.log(error.msg)
                dispatch(alertAction.setAlert(error.msg , 'danger'))
            }
        }
    }
};

export  const getUserInfo = () =>{
    return async (dispatch) => {
        if (userUtil.getToken()){
          tokenUtil.isAuthenticate(userUtil.getToken())
        }

        try {
            dispatch({type:GET_USER_INFO_REQUEST});
            let url = `${process.env.REACT_APP_EXPRESS_SERVER }/api/users/`
            let response = await axios.get(url);
            dispatch({type : GET_USER_INFO_SUCCESS, payload: response.data.user})
        }
        catch (error) {
            console.error(error)
            dispatch({type:USER_LOGIN_FAILURE, payload : error.response.data})

        }
    }
}
