import {combineReducers} from "redux";
import * as alertReducer from './alert/alert.reducer'
import * as userReducer from './user/user.reducer'
import * as productReducer from './products/uploa.reducer'
import * as orderAction from './orders/order.reducer'

const rootReducer = combineReducers({
    [alertReducer.alertFeatureKey] : alertReducer.reducer,
    [userReducer.userFeatureKey] : userReducer.reducer,
    [productReducer.productFeatureKeys] : productReducer.reducer,
    [orderAction.OrderFeatureKey] : orderAction.reducer
});
export {rootReducer}