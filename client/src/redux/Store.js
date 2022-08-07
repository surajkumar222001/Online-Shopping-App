import {rootReducer} from "./rootReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware, createStore} from "redux";
import {logger} from "redux-logger/src";
import thunk from 'redux-thunk'


let middleWares = [logger,thunk ]

const  store =createStore(rootReducer , composeWithDevTools(applyMiddleware(...middleWares)));
export {store}