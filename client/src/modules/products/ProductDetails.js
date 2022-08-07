import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as uploadAction from '../../redux/products/upload.action'
import * as uploadReducer from '../../redux/products/uploa.reducer'
import * as orderAction from '../../redux/orders/order.action'
import spinner from "../../layout/util/spinner/Spinner";



let ProductDetails = () => {

    let dispatch = useDispatch()
    let navigate = useNavigate();

     let [qty , setQty] = useState('')
    let productId = useParams().productId

   let product = useSelector((state) => {
       return state[uploadReducer.productFeatureKeys]
    });

    let {loading , selectedProduct} = product


    useEffect(() => {
        dispatch(uploadAction.getSingleProduct(productId));
    },[productId])

    // add to cart

    let submitAddToCart = () => {
        // dispatch action
        selectedProduct.qty = Number(qty)
        dispatch(orderAction.addToCart(selectedProduct , navigate))
    }

    return(
        <React.Fragment>
            <section className="bg-info text-dark p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3>Selected Product</h3>
                        </div>
                    </div>
                </div>
            </section>
            {
                !loading ?
                    <section className=" sec mt-2">
                        <div className="container">
                            <div className="row">
                                {
                                    Object.keys(selectedProduct).length > 0 &&
                                    <React.Fragment>
                                        <div className="col-md-4">
                                            <img src={selectedProduct.image} alt="" className='img-fluid'/>
                                        </div>
                                        <div className="col-md-8 ">
                                            <p className="h3">{selectedProduct.brand}</p>
                                            <p className="h5"> {selectedProduct.name}</p>
                                            <p className="h5">Price : <small className="font-weight-bold"> &#8377;{selectedProduct.price.toFixed(2)}</small></p>
                                            <div>
                                                <form action="" className="form-inline" onSubmit={submitAddToCart}>
                                                    <div className="form-group">
                                                        <select className="form-control" value={qty} onChange={(e) => {setQty(e.target.value)}}>
                                                            <option value="">Select Qty</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>

                                                        </select>
                                                    </div>
                                                    <div>
                                                        <input type="submit" className="form-control btn btn-sm btn-lg bg-info" value="Add to Cart"/>
                                                    </div>
                                                </form>
                                            </div>
                                            <p className="">{selectedProduct.description}</p>
                                            <p>{selectedProduct.usage}</p>




                                        </div>

                                    </React.Fragment>
                                }
                            </div>
                        </div>
                    </section> : spinner()
            }

        </React.Fragment>
    )
};

export default ProductDetails;