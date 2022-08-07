import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteCartItem,incrItem,decrItem} from "../../redux/orders/order.action";
import * as orderReducer from "../../redux/orders/order.reducer";
import {Link} from "react-router-dom";


let OrderList = () => {

let dispatch = useDispatch();

let deleteItem = (cartItem) => {
    dispatch(deleteCartItem(cartItem))
    }


// increase Qty
let incrQty = (productId) =>  {
     dispatch(incrItem(productId))
    }

// decrease Item
    let decrQty = (productId) => {
    dispatch(decrItem(productId))
    }


    let orderInfo = useSelector((state) => {
        return state[orderReducer.OrderFeatureKey];
    });

    let {cartItems} = orderInfo

    let totalPay = () => {
        let total = 0
        for (let cartItem of cartItems){
            total = total + (cartItem.price*cartItem.qty)
        }
        return total

    };
  let tot = totalPay()
    console.log(tot)

    let calculateTax = () => {
      let tax= Number(process.env.REACT_APP_TAX);
      return (totalPay()*tax/100)
    };

    let grandTotal = () => {
        return totalPay() + calculateTax()
    }


    return(
        <React.Fragment>
            <section className="bg-info text-dark p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3> <i className="fa fa-cart-shopping"/>  Your Cart</h3>
                        </div>
                    </div>
                </div>
            </section>

            {
                cartItems.length > 0 ?
                    <React.Fragment>
                        <section>
                            <div className="container mt-3">
                                <div className="row">
                                    <div className="col-md-9">
                                        <div className="card">
                                            <div className="card-header bg-dark text-white">
                                                <p className="h4">Your Cart Items</p>
                                            </div>
                                            <div className="card-body">
                                                <table className="table table-hover text-center bg-info table-striped">
                                                    <thead className=" flex-row bg-info text-dark">
                                                    <tr className="">
                                                        <th>SNO</th>
                                                        <th>Image</th>
                                                        <th>Name</th>
                                                        <th>Price</th>
                                                        <th>Qty</th>
                                                        <th>Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        cartItems.map((cartItem , index) => {
                                                            return(
                                                                <tr key={cartItem._id}>
                                                                    <td>{index + 1 }</td>
                                                                    <td><img src={cartItem.image} width='50px' height='60px' alt=""/></td>
                                                                    <td>{cartItem.name}</td>
                                                                    <td> &#8377; <small className="font-weight-bold">{cartItem.price}</small></td>
                                                                    <td>
                                                                        <i className="fa fa-minus-circle" onClick={decrQty.bind(this,cartItem._id)} />
                                                                        {cartItem.qty}
                                                                        <i className="fa fa-plus-circle" onClick={incrQty.bind(this,cartItem._id)}/>
                                                                    </td>
                                                                    <td>
                                                                        <button onClick={deleteItem.bind(this , cartItem._id)} className="btn btn-sm btn-dark">
                                                                            Delete
                                                                        </button>
                                                                    </td>

                                                                </tr>

                                                            )
                                                        })
                                                    }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card">
                                            <div className="card-header bg-dark text-white">
                                                <p className="h4">Your Total</p>
                                            </div>
                                            <div className="card-body">
                                                <ul className="list-group">
                                                    <li className="list-group-item bg-info">
                                                        Total : <small className="font-weight-bold h6"> &#8377;{totalPay()}</small>
                                                    </li>
                                                    <li className="list-group-item bg-info">
                                                        Tax : {calculateTax()}
                                                    </li>
                                                    <li className="list-group-item bg-info">
                                                        Grand Total  : {grandTotal()}
                                                    </li>
                                                </ul>
                                                <div className="mt-2 d-inline-flex">
                                                    <Link to="/" className="btn btn-sm btn-dark text-white"> Shop Now </Link>
                                                    <Link to="/order/checkout" className="btn btn-sm btn-dark text-white"> Check Out </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </React.Fragment> :
                    <React.Fragment>
                     <div className="text-center mt-5">
                         <h4>---------------------------     Cart Empty      ---------------------------</h4>
                         <Link to="/" className="btn btn-md btn-dark text-white">Shop Now</Link>
                     </div>
                    </React.Fragment>
            }
        </React.Fragment>
    )
};

export default OrderList;