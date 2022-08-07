import axios from "axios";
import {setAlert} from "../alert/alert.action";
import * as userUtil from "../../util/userUtil";
import * as tokenUtil from "../../util/tokenUtil";


export  const ORDER_ADD_TO_CART_SUCCESS = 'ORDER_ADD_TO_CART_SUCCESS';
export  const ORDER_ADD_TO_CART_FAILURE = 'ORDER_ADD_TO_CART_FAILURE';

export const DELETE_CART_ITEM_SUCCESS= "DELETE_CART_ITEM_SUCCESS"
export const DELETE_CART_ITEM_FAILURE= "DELETE_CART_ITEM_FAILURE"


export const INCREASE_ITEM_SUCCESS= "INCREASE_ITEM_SUCCESS"
export const INCREASE_ITEM_FAILURE= "INCREASE_ITEM_FAILURE"

export const DECREASE_ITEM_SUCCESS= "DECREASE_ITEM_SUCCESS"
export const DECREASE_ITEM_FAILURE= "DECREASE_ITEM_FAILURE"

export const STRIPE_PAYMENT_REQUEST = 'STRIPE_PAYMENT_REQUEST'
export const STRIPE_PAYMENT_SUCCESS = 'STRIPE_PAYMENT_SUCCESS'
export const STRIPE_PAYMENT_FAILURE = 'STRIPE_PAYMENT_FAILURE'









export const addToCart = (selectedProduct, navigate) => {
    return async (dispatch) => {
       try {
           dispatch({type: ORDER_ADD_TO_CART_SUCCESS , payload :selectedProduct} );
           navigate('/orders/cart')

       }
       catch (error) {
           dispatch({type : ORDER_ADD_TO_CART_FAILURE , payload : error})
       }

    }
};

export const deleteCartItem = (itemId) => {
    return async (dispatch) => {
        try {
            dispatch({type:DELETE_CART_ITEM_SUCCESS , payload: itemId})
        }
        catch (error) {
            console.log(error);
            dispatch({type:DELETE_CART_ITEM_FAILURE , payload : error})
        }
    }
}


export const incrItem = (productId) => {
    return async (dispatch) => {
        try{
            dispatch({type: INCREASE_ITEM_SUCCESS, payload : productId});
        }
        catch (error) {
            console.error(error);
            dispatch({type :INCREASE_ITEM_FAILURE})
        }

    }
};


// qty decrease
export const decrItem = (productId) => {
    return async (dispatch) => {
        try{
            dispatch({type: DECREASE_ITEM_SUCCESS, payload : productId});
        }
        catch (error) {
            console.error(error);
            dispatch({type :DECREASE_ITEM_FAILURE})
        }

    }
}

// making payments action

export const stripePaymentRequest = (body , navigate) => {
    return  async (dispatch) => {
        if (userUtil.getToken()){
            tokenUtil.isAuthenticate(userUtil.getToken())
        }
        try {
            dispatch({type : STRIPE_PAYMENT_REQUEST});
            let dataUrl = `${process.env.REACT_APP_EXPRESS_SERVER}/api/payment/pay`
            let response = await axios.post(dataUrl,body);
            dispatch({type : STRIPE_PAYMENT_SUCCESS , payload: response.data})
            dispatch(setAlert('Payment Success ' , 'success'));
        }
        catch (error) {
            console.log(error);
            dispatch({type :STRIPE_PAYMENT_FAILURE , payload : error.response.data})

        }
    }
}



