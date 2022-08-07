import React, {useState} from 'react'
import '../../../App.css'




let Tracker = _ => {

    return (
        <React.Fragment>
            <div className='flex container mt-3 justify-content-centre '>
                <div className='row'>
                    <div className="track">
                        <div className="step active"><span className="icon"> <i className="fa fa-check"/> </span>
                            <span className="text">Order confirmed</span></div>
                        <div className="step active"><span className="icon"> <i className="fa fa-user"/> </span>
                            <span className="text"> Picked by courier</span></div>
                        <div className="step"><span className="icon"> <i className="fa fa-truck"/>  </span> <span
                            className="text"> On the way </span></div>
                        <div className="step"><span className="icon"> <i className="fa fa-box"/> </span> <span
                            className="text">Ready for pickup</span></div>
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
};

export default Tracker;