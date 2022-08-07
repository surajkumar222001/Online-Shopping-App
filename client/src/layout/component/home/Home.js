import React from "react";




let Home = () => {
    return(
        <React.Fragment>
         <section className="landing-page">
             <div className="wrapper">
                 <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">

                     <h3 className="display-4 text-white"> Welcome to Online Shopping</h3>
                     <p className="lead px-4 text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dignissimos non quasi? Accusamus alias aspernatur assumenda, culpa dolore doloremque eligendi enim itaque iusto, modi nisi perferendis porro quo rem repudiandae totam voluptate voluptatem! Ab deleniti dicta enim nulla vel voluptas.</p>
                     <button className="btn btn-light btn-sm">Shop Now</button>

                 </div>
             </div>
         </section>
        </React.Fragment>
    )
};

export default Home;