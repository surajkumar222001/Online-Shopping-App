import * as orderAction from './order.action'

export const OrderFeatureKey = 'orderInfo'

let initialState = {

    errorMessage : '',
    cartItems : [],
    loading : false,
    amount : '',
}

export  const reducer = (state=initialState , action) => {

    let {type , payload } = action
    switch (type) {
        case orderAction.ORDER_ADD_TO_CART_SUCCESS :

           let existItem = state.cartItems.find(cartItem => cartItem._id === payload._id);
           if (!existItem){
               return {
                   ...state,
                   cartItems: [...state.cartItems , payload]
               }
           }
            return {
                    ...state,
                    cartItems: [...state.cartItems, ]
                };



        case orderAction.ORDER_ADD_TO_CART_FAILURE :
            return {
                ...state,
                cartItems: [],
                errorMessage: payload
            };

        case orderAction.DELETE_CART_ITEM_SUCCESS :
            let cartItem = state.cartItems.filter(cartItem => cartItem._id !== payload);
            return {
                ...state,
                cartItems: [...cartItem],
                loading: false
            };

        case orderAction.DELETE_CART_ITEM_FAILURE :
            return {
                ...state,
                cartItems: [...state.cartItems]
            }



         // increase Qty

        case orderAction.INCREASE_ITEM_SUCCESS :
            let increaseItem = state.cartItems.map(cartItem => {
                if (cartItem._id === payload){
                    return {
                        ...cartItem,
                        qty : cartItem.qty + 1
                    }
                }
                return cartItem
            })
            return {
                ...state,
                cartItems: [...increaseItem]

            };
        case orderAction.INCREASE_ITEM_FAILURE :
            return {
                ...state,
                cartItems: [...state.cartItems]
            }


          // Decrease item


        case orderAction.DECREASE_ITEM_SUCCESS :
            let decreaseItem = state.cartItems.map(cartItem => {
                if (cartItem._id === payload){
                    return {
                        ...cartItem,
                        qty : cartItem.qty - 1 > 0 ? cartItem.qty - 1 : 1
                    }
                }
                return cartItem
            })

            return {
                ...state,
                cartItems: [...decreaseItem]

            };

        case orderAction.DECREASE_ITEM_FAILURE :
            return {
                ...state,
                cartItems: [...state.cartItems]
            };
            // making Payment
        case orderAction.STRIPE_PAYMENT_REQUEST :
            return {
                ...state,
                loading: true
            };

        case orderAction.STRIPE_PAYMENT_SUCCESS :
            return {
                ...state,
                loading: false,
                amount : payload
            };

        case orderAction.STRIPE_PAYMENT_FAILURE :
            return {
                ...state,
                loading: false,
                errorMessage: payload
            };


        default : return state
    }
}