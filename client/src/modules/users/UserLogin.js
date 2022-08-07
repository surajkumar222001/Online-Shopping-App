import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import * as userAction from "../../redux/user/user.action"
import * as alertAction from "../../redux/alert/alert.action";
import {isLoggedIn} from "../../util/userUtil";



let UserLogin = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate()

    let [userInfo , setUserInfo] = useState({
        email : '' ,
        password : ''

    });
    let {email, password} =userInfo

    let [userInfoError , setUserInfoError] = useState({
        emailError : '' ,
        passwordError : ''
    });

    let validateEmail = (e) => {
        setUserInfo({...userInfo, email:e.target.value });
        let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        (!regExp.test(e.target.value)) ? setUserInfoError({...userInfoError,emailError: 'Enter a Valid Email'}) :setUserInfoError({...userInfoError,emailError: ''})

    }

    // validate UserPassword

    let validatePassword = (e) => {
        setUserInfo({...userInfo, password: e.target.value});
        let regExp = /^[A-za-z]\w{7,14}$/;
        (!regExp.test(e.target.value)) ? setUserInfoError({...userInfoError,passwordError: 'Enter a valid Password'}) :setUserInfoError({...userInfoError,passwordError: ''})

    };

    // login user

    let loginUser = (e) => {
         e.preventDefault()
        if ( email !== '' && password !== '' ){
            dispatch(userAction.userLogin(userInfo,navigate))
        }
        else {
            dispatch(alertAction.setAlert('Fill the Field' , 'danger'))
        }

    }
    return(
        <React.Fragment>
            <section className="p-3 mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 m-auto">
                            <div className="card animated zoomIn" >
                                <div className="card-header bg-dark text-white text-center">
                                    <p className="h3">Login Here</p>
                                </div>
                                <div className="card-body bg-light">
                                    <form action="" onSubmit={loginUser}>
                                        <div className="form-group">
                                            <input
                                                name="email"
                                                value={userInfo.email}
                                                onChange={validateEmail}
                                                type="email" className={`form-control className={\`form-control ${userInfoError.emailError.length > 0 ? 'is-invalid' : ''} `} placeholder="Email"/>
                                            {userInfoError.emailError.length>0 ? <small className="text-danger">{userInfoError.emailError}</small>  :''}

                                        </div>

                                        <div className="form-group">
                                            <input
                                                name="password"
                                                value={userInfo.password}
                                                onChange={validatePassword}
                                                type="password" className={`form-control className={\`form-control ${userInfoError.passwordError.length > 0 ? 'is-invalid' : ''} `} placeholder="Password"/>
                                            {userInfoError.passwordError.length>0 ? <small className="text-danger">{userInfoError.passwordError}</small>  :''}

                                        </div>

                                        <div>
                                            <input type="submit" className="btn btn-secondary btn-sm" value="Login"/>
                                        </div>
                                        <small>
                                            Don't have an Account?  <Link to="/users/register">Register</Link>
                                        </small>
                                    </form>
                                </div>
                                <div className="card-footer  blue-gradient-rgba text-center">
                                    <h5 className="icon_register"> <i className="fa fa-shopping-basket"/>BRAINSKART</h5>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};

export default UserLogin;