import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as uploadAction from '../../redux/products/upload.action'
import spinner from "../../layout/util/spinner/Spinner";
import * as uploadReducer from '../../redux/products/uploa.reducer'
import {Link, useNavigate} from 'react-router-dom'
import * as orderAction from "../../redux/orders/order.action";



let WomensCollection = () => {
    let dispatch = useDispatch()
    let navigate = useNavigate();

    let womenWear = useSelector((state) => {
        return state[uploadReducer.productFeatureKeys]
    });

    let {loading , product} = womenWear



    useEffect(() => {
        dispatch(uploadAction.getWomenProductAction());
    },[]);




    let AddToCart = (element) => {
        // dispatch action
         element.qty = 1
        dispatch(orderAction.addToCart(element , navigate))
    }



    return(
        <React.Fragment>
            <section className="bg-info text-dark p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3> Women's Collection</h3>
                        </div>
                    </div>
                </div>
            </section>
            {
               ! loading ?
                    <React.Fragment >
                        <section>
                            <div className="container mt-3">
                                <div className="row ">

                                        {
                                            product.map((element) => {
                                                return(
                                                    <div className="col-md-3 mt-5}"  key={element._id} >
                                                    <div className="flex-center card "  >
                                                        <div className=" card-header Cardheader ">

                                                            <Link to={`/products/${element._id}`}>
                                                                <img  className="fix_image_size_card" src={element.image}  alt=""/>
                                                            </Link>

                                                        </div>

                                                        <div className=" card-body text-center ">
                                                            <small className="lead font-weight-bold">{element.name}</small><br/>
                                                            <small className="font-weight-bold">&#8377; : {element.price} </small><br/>
                                                            <button className="btn btn-info btn-sm" onClick={AddToCart.bind(this, element)}>Add to Card </button>
                                                        </div>
                                                    </div>
                                                    </div>
                                                )
                                            })

                                        }

                                </div>
                            </div>
                        </section>
                    </React.Fragment>: spinner()
            }
        </React.Fragment>
    )
};

export default WomensCollection;