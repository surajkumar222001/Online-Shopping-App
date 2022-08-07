import * as alertAction from './alert.action'

export const alertFeatureKey = 'alert';

let initialState = {
    alertMessage : []
};

export const reducer = (state=initialState , action) =>{
    let {type , payload} = action
    switch (type) {
        case alertAction.SET_ALERT :
            return {
               ...state,
                alertMessage: [...state.alertMessage , payload]
            };

        case alertAction.REMOVE_ALERT :
            return {
                ...state,
                alertMessage : state.alertMessage.filter((alert) => {
                    return alert.id !== payload.id
                })
            }
        default : return state
    }
}