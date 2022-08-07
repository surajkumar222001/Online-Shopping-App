import * as userAction from './user.action'


export const userFeatureKey = 'user'

let initialState = {
    errorMessage : [],
    userInfo : {},
    loading : false,
    token : '',
    isAuthenticate : false
};

export const reducer = (state=initialState , action) => {
    let {type, payload} = action;
    switch (type) {
        case userAction.USER_REGISTER_REQUEST :
            return {
                ...state,
                loading: true
            };

        case userAction.USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case userAction.USER_REGISTER_FAILURE :
            return {
                ...state,
                loading: false,
                errorMessage: payload
            };

        case userAction.USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }

        case userAction.USER_LoGIN_SUCCESS :
            localStorage.setItem(`${process.env.REACT_APP_LOGIN_TOKEN}` ,payload.token)
            return {
                ...state,
                loading: false,
                token: payload.token,
                isAuthenticate : true

            }

        case userAction.USER_LOGIN_FAILURE :
            localStorage.removeItem(`${process.env.REACT_APP_LOGIN_TOKEN}`)
            return {
                ...state,
                loading: false,
                token: '' ,
                isAuthenticate: false,
                errorMessage: payload

            };
        case userAction.GET_USER_INFO_REQUEST :
            return {
                ...state,
                loading: true,
            };

        case userAction.GET_USER_INFO_SUCCESS :
            return {
                ...state,
                loading: false,
                userInfo: payload,
                isAuthenticate: true
            };

        case userAction.GET_USER_INFO_FAILURE :
            return {
                ...state,
                loading: false,
                userInfo: {},
                errorMessage: payload
            };

        case userAction.LOGOUT :
            localStorage.removeItem(`${process.env.REACT_APP_LOGIN_TOKEN}`)
            return {
                ...state,
                loading: false,
                token: '' ,
                isAuthenticate: false,
                userInfo: {},
                errorMessage: payload

            };

        case userAction.UPDATE_USER_ADDRESS_REQUEST :
            return {
                ...state,
                loading: true
            };

        case userAction.UPDATE_USER_ADDRESS_SUCCESS :
            return {
                ...state,
                loading: false,
                userInfo:payload.userInfo

            };

        case userAction.UPDATE_USER_ADDRESS_FAILURE :
            return {
                ...state,
                loading: false,
                errorMessage: payload
            };

        default : return state
    }
}