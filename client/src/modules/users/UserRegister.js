import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import * as userRegisterAction from '../../redux/user/user.action'
import * as alertAction from "../../redux/alert/alert.action"
import {useDispatch} from "react-redux";



let UserRegister = () => {

    let dispatch = useDispatch();
    let navigate = useNavigate()

    let [userInfo , setUserInfo] = useState({
        name : '',
        email : '' ,
        password : '',
        confirmPassword : ''
    });

    let {name , email , password , confirmPassword} = userInfo

    let [userInfoError , setUserInfoError] = useState({
        nameError : '',
        emailError : '' ,
        passwordError : '',
        confirmPasswordError : ''
    });


    // validate user Name

let validateUserName = (e) => {
    setUserInfo({...userInfo , name: e.target.value});
    let regExp = /^[a-zA-Z0-9]{4,10}$/;
    (!regExp.test(e.target.value)) ? setUserInfoError({...userInfoError,nameError: 'Enter a Proper UserName'}) :setUserInfoError({...userInfoError,nameError: ''})

};


// validate user email

    let validateUserEmail = (e) => {
        setUserInfo({...userInfo, email:e.target.value });
        let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        (!regExp.test(e.target.value)) ? setUserInfoError({...userInfoError,emailError: 'Enter a Valid Email'}) :setUserInfoError({...userInfoError,emailError: ''})

    }

    // validate UserPassword

    let validateUserPassword = (e) => {
        setUserInfo({...userInfo, password: e.target.value});
        let regExp = /^[A-za-z]\w{7,14}$/;
        (!regExp.test(e.target.value)) ? setUserInfoError({...userInfoError,passwordError: 'Enter a valid Password'}) :setUserInfoError({...userInfoError,passwordError: ''})

    };

    // validate Confirm password

    let validateConfirmPassword = (e) => {
        setUserInfo({...userInfo , confirmPassword:e.target.value});
        (userInfo.password !== userInfo.confirmPassword) ? setUserInfoError({...userInfoError , confirmPasswordError:e.target.value}) : setUserInfoError({...userInfoError , confirmPasswordError :''})
        console.log(userInfo.password !== userInfo.confirmPassword)
    };

    // submit Registration from of user;

    let submitRegistration = (e) => {
        e.preventDefault();
        if (name !== '' &&  email !== '' && password !== ''  && confirmPassword !== ''){
            dispatch(userRegisterAction.userRegister(userInfo,navigate))
        }
        else {
            dispatch(alertAction.setAlert('Fill the Field' , 'danger'))
        }


    }




    return(
        <React.Fragment>
            <section className="p-3 mt-5">
                <div className="container">
                    {/*<pre>{JSON.stringify(userInfo)}</pre>
                    <pre>{JSON.stringify(userInfoError)}</pre>*/}
                    <div className="row">
                        <div className="col-md-4 m-auto">
                            <div className="card animated zoomIn">
                                <div className="card-header bg-dark text-white text-center">
                                    <p className="h3">Register Here</p>
                                </div>
                                <div className="card-body bg-light">
                                    <form action="" onSubmit={submitRegistration}>

                                        <div className="form-group">
                                            <input
                                                name="name"
                                                value={userInfo.name}
                                                onChange={validateUserName}
                                                type="Name" className={`form-control ${userInfoError.nameError.length>0 ? 'is-invalid' :''}`} placeholder="Name"/>
                                                {userInfoError.nameError.length>0 ? <small className="text-danger">{userInfoError.nameError}</small>  :''}

                                        </div>

                                        <div className="form-group">
                                            <input
                                                name="email"
                                                value={userInfo.email}
                                                onChange={validateUserEmail}
                                                type="email" className={`form-control ${userInfoError.emailError.length>0 ? 'is-invalid' :''} `} placeholder="Email"/>
                                            {userInfoError.emailError.length>0 ? <small className="text-danger">{userInfoError.emailError}</small>  :''}

                                        </div>

                                        <div className="form-group">
                                            <input
                                                name="password"
                                                value={userInfo.password}
                                                onChange={validateUserPassword}
                                                type="password" className={`form-control ${userInfoError.passwordError.length>0 ? 'is-invalid' :''} `} placeholder="Password"/>
                                            {userInfoError.passwordError.length>0 ? <small className="text-danger">{userInfoError.passwordError}</small>  :''}

                                        </div>

                                        <div className="form-group">
                                            <input
                                                 name="confirmPassword"
                                                 value={userInfo.confirmPassword}
                                                onChange={validateConfirmPassword}
                                                type="password" className={`form-control ${userInfoError.confirmPasswordError.length>0 ? 'is-invalid' :''}`} placeholder="confirm Password"/>
                                            {userInfoError.confirmPasswordError.length>0 ? <small className="text-danger">{userInfoError.confirmPasswordError}</small>  :''}

                                        </div>

                                        <div>
                                            <input type="submit" className="btn btn-secondary btn-sm" value="Register"/>
                                        </div>
                                        <small>
                                            Already have an Account?  <Link to="/users/login">login</Link>
                                        </small>
                                    </form>
                                </div>
                                <div className="card-footer blue-gradient-rgba text-center">
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

export default UserRegister;