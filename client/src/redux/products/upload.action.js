import axios from "axios";
import * as userUtil from '../../util/userUtil'
import * as tokenUtil from '../../util/tokenUtil'
import * as alertAction from '../../redux/alert/alert.action'


export const UPLOAD_PRODUCT_REQUEST = 'UPLOAD_PRODUCT_REQUEST'
export const UPLOAD_PRODUCT_SUCCESS = 'UPLOAD_PRODUCT_SUCCESS'
export const UPLOAD_PRODUCT_FAILURE = 'UPLOAD_PRODUCT_FAILURE'


export const WOMEN_GET_PRODUCT_REQUEST = 'WOMEN_GET_PRODUCT_REQUEST'
export const WOMEN_GET_PRODUCT_SUCCESS = 'WOMEN_GET_PRODUCT_SUCCESS'
export const WOMEN_GET_PRODUCT_FAILURE = 'WOMEN_GET_PRODUCT_FAILURE'


export const KIDS_GET_PRODUCT_REQUEST = 'KIDS_GET_PRODUCT_REQUEST'
export const KIDS_GET_PRODUCT_SUCCESS = 'KIDS_GET_PRODUCT_SUCCESS'
export const KIDS_GET_PRODUCT_FAILURE = 'KIDS_GET_PRODUCT_FAILURE'


export const MENS_GET_PRODUCT_REQUEST = 'MENS_GET_PRODUCT_REQUEST'
export const MENS_GET_PRODUCT_SUCCESS = 'MENS_GET_PRODUCT_SUCCESS'
export const MENS_GET_PRODUCT_FAILURE = 'MENS_GET_PRODUCT_FAILURE'


export const GET_SELECTED_PRODUCT_REQUEST = 'GET_SELECTED_PRODUCT_REQUEST'
export const GET_SELECTED_PRODUCT_SUCCESS = 'GET_SELECTED_PRODUCT_SUCCESS'
export const GET_SELECTED_PRODUCT_FAILURE = 'GET_SELECTED_PRODUCT_FAILURE'

// get selected product or by ID

export const getSingleProduct = (productId) => {
    return async (dispatch) => {

        try {
            dispatch({type : GET_SELECTED_PRODUCT_REQUEST});
            let dataUrl = `${process.env.REACT_APP_EXPRESS_SERVER}/api/products/${productId}`
            let response = await axios.get(dataUrl);
            dispatch({type:GET_SELECTED_PRODUCT_SUCCESS , payload : response.data.product})
        }
        catch (error) {
            console.log(error)
            dispatch({type: GET_SELECTED_PRODUCT_FAILURE , payload : error.response.data});
            let errorList = error.response.data.error
            for (let error of errorList){
                dispatch(alertAction.setAlert(error.message , 'danger'))
            }
        }
    }
}




// Upload product

export const uploadProductAction = (product , navigate) => {
    return async (dispatch) => {
        if (userUtil.getToken()){
            tokenUtil.isAuthenticate(userUtil.getToken())
        }
        try{
            dispatch({type:UPLOAD_PRODUCT_REQUEST});
            let dataUrl = `${process.env.REACT_APP_EXPRESS_SERVER}/api/products/upload`
            let response = await axios.post(dataUrl, product);
            dispatch({type:UPLOAD_PRODUCT_SUCCESS, payload:response.data.product});
            dispatch(alertAction.setAlert(response.data.message,'success'));
            if (product.category === 'MEN'){
                navigate('/products/men')
            }
            if (product.category === 'WOMEN'){
                navigate('/products/women')
            }
            if (product.category === 'KIDS'){
                navigate('/products/kids')
            }

        }
        catch (error) {
            console.log(error)
            dispatch({type: UPLOAD_PRODUCT_FAILURE , payload : error.response.data});
            let errorList = error.response.data.error
            for (let error of errorList){
                dispatch(alertAction.setAlert(error.message , 'danger'))
            }

        }
    }
};




// Get Women Product

export const getWomenProductAction = () => {
    return async (dispatch) => {

        try{
            dispatch({type:WOMEN_GET_PRODUCT_REQUEST});
            let dataUrl = `${process.env.REACT_APP_EXPRESS_SERVER}/api/products/women`
            let response = await axios.get(dataUrl);
            dispatch({type:WOMEN_GET_PRODUCT_SUCCESS, payload:response.data.product});

        }
        catch (error) {
            console.log(error)
            dispatch({type: WOMEN_GET_PRODUCT_FAILURE , payload : error.response.data});
            let errorList = error.response.data.error
            for (let error of errorList){
                dispatch(alertAction.setAlert(error.message , 'danger'))
            }

        }
    }
};


// Get kids Product

export const getKidsProductAction = () => {
    return async (dispatch) => {

        try{
            dispatch({type:KIDS_GET_PRODUCT_REQUEST});
            let dataUrl = `${process.env.REACT_APP_EXPRESS_SERVER}/api/products/kids`
            let response = await axios.get(dataUrl);
            dispatch({type:KIDS_GET_PRODUCT_SUCCESS, payload:response.data.product});

        }
        catch (error) {
            console.log(error)
            dispatch({type: KIDS_GET_PRODUCT_FAILURE , payload : error.response.data});
            let errorList = error.response.data.error
            for (let error of errorList){
                dispatch(alertAction.setAlert(error.message , 'danger'))
            }

        }
    }
};




// Get Men Product

export const getMenProductAction = () => {
    return async (dispatch) => {

        try{
            dispatch({type:MENS_GET_PRODUCT_REQUEST});
            let dataUrl = `${process.env.REACT_APP_EXPRESS_SERVER}/api/products/men`
            let response = await axios.get(dataUrl);
            dispatch({type:MENS_GET_PRODUCT_SUCCESS, payload:response.data.product});

        }
        catch (error) {
            console.log(error)
            dispatch({type: MENS_GET_PRODUCT_FAILURE , payload : error.response.data});
            let errorList = error.response.data.error
            for (let error of errorList){
                dispatch(alertAction.setAlert(error.message , 'danger'))
            }

        }
    }
};
