import React from "react";
import {Link, useNavigate} from 'react-router-dom'
import '../../../App.css'
import {useDispatch, useSelector} from "react-redux";
import * as userAction from "../../../redux/user/user.action";
import {isLoggedIn} from "../../../util/userUtil";
import * as userReducer from '../../../redux/user/user.reducer'
import * as orderReducer from '../../../redux/orders/order.reducer'



let Navbar = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let user = useSelector((state) => {
        return state[userReducer.userFeatureKey];

    });

    let cart = useSelector((state) => {
        return state[orderReducer.OrderFeatureKey]
    });




    let {isAuthenticate , userInfo} = user




    let clickLogOut = (e) => {
        e.preventDefault();
        dispatch(userAction.logOut(navigate))
    };



    let afterLoggedIn = () => {

        return (
            <React.Fragment>
                <li className="nav-item">
                    <Link to="/users/profile" className="nav-link"> <img src={userInfo.avatar}  width='25' height='25' className="rounded-circle" alt="profile"/>   {userInfo.name}</Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link" onClick={clickLogOut}><i className="fa fa-sign-out-alt text-muted"/>Logout</Link>
                </li>
            </React.Fragment>
        )
    }

    let beforeLoggedIn = () => {

        return (
            <React.Fragment>
                <li className="nav-item">
                    <Link to="/users/login" className="nav-link">Login</Link>
                </li>

                <li className="nav-item">
                    <Link to="/users/register" className="nav-link">Register</Link>
                </li>
            </React.Fragment>
        )
    }
    return(
        <React.Fragment>
          <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
              <div className="container">
                <Link to="/" className="navbar-brand">
                    <h4 className="icon"> <i className="fa fa-shopping-basket"/>BRAINSKART</h4>
                </Link>
                  <div className="collapse navbar-collapse">
                      <ul className="navbar-nav">
                          <li className="nav-item">
                              <Link to="/products/men" className="nav-link">Men's Wear</Link>
                          </li>

                          <li className="nav-item">
                              <Link to="/products/women" className="nav-link">Women's Wear</Link>
                          </li>

                          <li className="nav-item">
                              <Link to="/products/kids" className="nav-link">Kid's Wear</Link>
                          </li>

                          <li className="nav-item">
                              <Link to="/products/upload" className="nav-link">Upload</Link>
                          </li>

                          <li className="nav-item">
                              <Link to="/orders/cart" className="nav-link">
                                  <i className="fa fa-shopping-cart"/>
                                  <span className="badge badge-danger ">{cart.cartItems.length}</span>
                              </Link>
                          </li>
                      </ul>



                      <ul className="navbar-nav ml-auto">
                          {

                             isLoggedIn() || isAuthenticate   ?   afterLoggedIn()  : beforeLoggedIn()
                          }
                      </ul>
                  </div>
              </div>
          </nav>
        </React.Fragment>
    )
};

export default Navbar;