import React, {useEffect} from 'react'
import {BrowserRouter as Router , Route , Routes} from 'react-router-dom'
import Navbar from "./layout/component/navbar/Navbar";
import Home from "./layout/component/home/Home";
import UserLogin from "./modules/users/UserLogin";
import UserRegister from "./modules/users/UserRegister";
import UserProfile from "./modules/users/UserProfile";
import MensCollection from "./modules/products/MensCollection";
import WomensCollection from "./modules/products/womensCollection";
import KidsCollection from "./modules/products/KidsCollection";
import UploadProduct from "./modules/products/UploadProduct";
import Cart from "./modules/orders/Cart";
import Alert from "./layout/util/alert/Alert";
import * as userUtil from './util/userUtil'
import {useDispatch} from "react-redux";
import * as userAction from './redux/user/user.action'
import ProductDetails from "./modules/products/ProductDetails";
import CheckOut from "./modules/orders/CheckOut";
import OrderSuccess from "./modules/orders/OrderSuccess";



function App() {

    let dispatch = useDispatch()
    useEffect(() => {
        if (userUtil.getToken()){
            dispatch(userAction.getUserInfo());
        }
    },[])
  return (
    <React.Fragment>
      <Router>
          <Alert/>
          <Navbar/>
          <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/users/login" element={<UserLogin/>}/>
              <Route exact path="/users/register" element={<UserRegister/>}/>
              <Route exact path="/users/profile" element={<UserProfile/>}/>
              <Route exact path="/products/men" element={<MensCollection/>}/>
              <Route exact path="/products/women" element={<WomensCollection/>}/>
              <Route exact path="/products/kids" element={<KidsCollection/>}/>
              <Route exact path="/products/upload" element={<UploadProduct/>}/>
              <Route exact path="/orders/cart" element={<Cart/>}/>
              <Route exact path="/products/:productId" element={<ProductDetails/>}/>
              <Route exact path="/order/checkout" element={<CheckOut/>}/>
              <Route exact path="/order/checkout/order-success" element={<OrderSuccess/>}/>
          </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
