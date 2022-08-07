import * as uploadAction from './upload.action'


export const productFeatureKeys = 'product';

let initialState = {
     loading : false,
     errorMessage : '',
     product : [],
     selectedProduct: {}
}

export const reducer = ( state=initialState , action) => {
    let {type , payload} = action
     switch (type) {

         // upload product
          case uploadAction.UPLOAD_PRODUCT_REQUEST :
               return {
                    ...state ,
                    loading : true
               };

          case uploadAction.UPLOAD_PRODUCT_SUCCESS :
               return {
                    ...state ,
                    loading : false
               };

          case uploadAction.UPLOAD_PRODUCT_FAILURE :
               return {
                    ...state ,
                    loading : false,
                    errorMessage: payload
               };

               // women Products


          case uploadAction.WOMEN_GET_PRODUCT_REQUEST :
               return {
                    ...state ,
                    loading : true
               };

          case uploadAction.WOMEN_GET_PRODUCT_SUCCESS :
               return {
                    ...state ,
                    loading : false,
                    product: payload
               };

          case uploadAction.WOMEN_GET_PRODUCT_FAILURE :
               return {
                    ...state ,
                    loading : false,
                    product: []
               };

               // kids products

          case uploadAction.KIDS_GET_PRODUCT_REQUEST :
               return {
                    ...state ,
                    loading : true
               };

          case uploadAction.KIDS_GET_PRODUCT_SUCCESS :
               return {
                    ...state ,
                    loading : false,
                    product: payload
               };

          case uploadAction.KIDS_GET_PRODUCT_FAILURE :
               return {
                    ...state ,
                    loading : false,
                    product: []
               };


               // mens product

          case uploadAction.MENS_GET_PRODUCT_REQUEST :
               return {
                    ...state ,
                    loading : true
               };

          case uploadAction.MENS_GET_PRODUCT_SUCCESS:
               return {
                    ...state ,
                    loading : false,
                    product: payload
               };

          case uploadAction.MENS_GET_PRODUCT_FAILURE :
               return {
                    ...state ,
                    loading : false,
                    product: []
               };



         // select product by Id product

          case uploadAction.GET_SELECTED_PRODUCT_REQUEST :
               return {
                    ...state ,
                    loading : true
               };

          case uploadAction.GET_SELECTED_PRODUCT_SUCCESS:
               return {
                    ...state ,
                    loading : false,
                    selectedProduct: payload
               };

          case uploadAction.GET_SELECTED_PRODUCT_FAILURE :
               return {
                    ...state ,
                    loading : false,
                    selectedProduct: {}
               };


          default : return  state

     }

}
