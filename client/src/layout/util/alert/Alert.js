import React from "react";
import {useSelector} from "react-redux";
import * as alertReducer from '../../../redux/alert/alert.reducer'


let Alert = () => {

    let alertType = useSelector((state) => {
        return state[alertReducer.alertFeatureKey]

    })
    let {alertMessage} = alertType

    return(
        <React.Fragment>
            {

                alertMessage.length > 0 ?
                    <React.Fragment>
                        <div className={`alert alert-${alertMessage.map((alert) => {return alert.color})} alert-dismissible fade show fixed-top`} role="alert">
                            {
                                alertMessage.map((alert) => {
                                    return <div key={alert.id}>
                                        <small>{alert.message}</small>
                                    </div>
                                } )
                            }
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </React.Fragment> : null
            }
        </React.Fragment>
    )
};

export default Alert;