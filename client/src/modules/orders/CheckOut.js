import React from "react";
import {useDispatch, useSelector} from "react-redux";
/*
import * as userReducer from '../../redux/user/user.reducer'
*/
import {Link, useNavigate} from "react-router-dom";
import * as orderReducer from '../../redux/orders/order.reducer'
import * as orderAction from '../../redux/orders/order.action'
import StripeCheckout from "react-stripe-checkout";
import payImg from '../../assets/pay.png/Samsung_Pay_icon.svg.png'
import Spinner from "../../layout/util/spinner/Spinner";
import {userFeatureKey} from "../../redux/user/user.reducer";


let CheckOut = () => {

    let dispatch = useDispatch()
    let navigate = useNavigate()

    let user = useSelector((state) => {
        return state[userFeatureKey]
    });

    let orderInfo = useSelector((state) => {
        return state[orderReducer.OrderFeatureKey]
    });

    let {cartItems , loading} = orderInfo

    let {userInfo} = user



    // total Pay

    let totalPay = () => {
        let price = 0
        for (let cartItem of cartItems){
             price = price  + cartItem.qty * cartItem.price
        }
        return price
    }

    let calculateTax = () => {
        let tax = Number(process.env.REACT_APP_TAX );
        return totalPay() * tax / 100

    };

    let grandTotal = () =>{
        return totalPay() + calculateTax()
    }

    // make Payment
    let clickPayment = (token) => {
        let product = {
            price : grandTotal() * 100  ,
            name : 'Product from brains-kart'
        }
        let body = {
            token , product
        }
        // dispatch action
        dispatch(orderAction.stripePaymentRequest(body , navigate))
        console.log(body)

    }


    return(
        <React.Fragment>
            {
                loading ? <Spinner/> :
                    <React.Fragment>
                        <section className="bg-info text-dark p-3">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <h3> <i className="fa fa-check-circle"/>     Check Out</h3>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="mt-2">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="card">
                                            <div className="card-header bg-dark text-white  d-inline-flex">
                                                <h4 className="font-weight-bold ">Address</h4>
                                                <Link to="/users/profile" className="btn btn-md btn-info ml-auto font-weight-bold">
                                                    Edit
                                                </Link>
                                            </div>


                                            {

                                                <div className="card-body">
                                                    <p>Flat :{user.userInfo.address?.flat} </p>
                                                    <p>Street : {userInfo.address?.street}</p>
                                                    <p>Landmark : {userInfo.address?.landmark}</p>
                                                    <p>City :{userInfo.address?.city}</p>
                                                    <p>State : {userInfo.address?.state}</p>
                                                    <p>Pin : {userInfo.address?.pin}</p>
                                                    <p>Mobile No : {userInfo.address?.mobile}</p>
                                                </div>
                                            }

                                        </div>
                                        <div className="card mt-3">
                                            <div className="card-header bg-dark text-white ">
                                                <h5>Payment</h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault"
                                                    />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                        Case on Delivery
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault"
                                                    />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                        Credit Card Payment
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card">
                                            <div className="card-body bg-dark text-white">
                                                <h5>Your Cart</h5>

                                            </div>
                                            <div className="card-body">
                                                {
                                                    cartItems.length > 0 &&
                                                    <React.Fragment>
                                                        <ul className="list-group">
                                                            {
                                                                cartItems.map((cartItem) => {
                                                                    return <li className="list-group-item" key={cartItem._id}>
                                                                        <div className="row  align-items-center">
                                                                            <div className="col-md-2 ">
                                                                                <img src={cartItem.image} className="text-center" width="40px" height="60px" alt=""/>
                                                                            </div>
                                                                            <div className="col-md-10">
                                                                                <small className="font-weight-bold">{cartItem.name}</small><br/>
                                                                                <small  className="font-weight-bold"> &#8377;{cartItem.price.toFixed(2)}</small> <br/>
                                                                                <small className="font-weight-bold" > Qty:{cartItem.qty}</small>
                                                                            </div>

                                                                        </div>
                                                                    </li>
                                                                })
                                                            }

                                                        </ul>

                                                        <ul className="list-group mt-2">
                                                            <li className="list-group-item bg-info">
                                                                Total : <small className="font-weight-bold h6"> &#8377;{totalPay()}</small>
                                                            </li>
                                                            <li className="list-group-item bg-info">
                                                                Tax : <small className="font-weight-bold"> &#8377; {calculateTax()}</small>
                                                            </li>
                                                            <li className="list-group-item bg-info">
                                                                Grand Total  : <small className="font-weight-bold"> &#8377; {grandTotal()}</small>
                                                            </li>

                                                            <StripeCheckout token={clickPayment}
                                                                            stripeKey="pk_test_51LIqJySJMIGKahI61zm69EWbyDUuLY9oO8KC26e5KjkHfpi8Wvm11cQZzY21x73BQ9grGZ5Wg7P9tGYxrdbiIoFE00LPRweYt1"
                                                                            name = "Pay To Brains-kart"
                                                                            amount={grandTotal()*100}
                                                                            description="Payments with Stripe"
                                                                            currency="INR"
                                                                            image={payImg}>
                                                                <button className="btn btn-sm btn-block btn-dark mt-2">PAY &#8377; {grandTotal()}</button>
                                                            </StripeCheckout>

                                                        </ul>

                                                    </React.Fragment>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default CheckOut;


