import React from 'react';
import spin from '../../../assets/spinner/ConventionalOblongFairybluebird-size_restricted.gif'


let Spinner = () => {
    return(
        <React.Fragment>
            <section>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col text-center">
                            <img src={spin}  width="100px" height="100px" alt=""/>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};
export default Spinner;