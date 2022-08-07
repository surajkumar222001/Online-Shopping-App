import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as userReducer from '../../redux/user/user.reducer'
import {updateUserAddress} from "../../redux/user/user.action";
import Spinner from "../../layout/util/spinner/Spinner";



let UserProfile = () => {
let dispatch = useDispatch()
    let [enable , setEnable] = useState(false);
    let user = useSelector((state) => {
        return state[userReducer.userFeatureKey]
    });

    let {userInfo,loading} = user

    let [address , setAddress] = useState({
        flat : '',
        state : '',
        landmark : '',
        pin : '',
        city : '',
        mobile : '',
        street : '',
    });

    useEffect(() => {
        setAddress({
            flat : userInfo && userInfo.address ? userInfo.address.flat : '',
            state : userInfo && userInfo.address ? userInfo.address.state : '',
            landmark : userInfo && userInfo.address ? userInfo.address.landmark : '',
            pin : userInfo && userInfo.address ? userInfo.address.pin : '',
            city : userInfo && userInfo.address ? userInfo.address.city : '',
            mobile : userInfo && userInfo.address ? userInfo.address.mobile : '',
            street : userInfo && userInfo.address ? userInfo.address.street : '',
        })
    } , [user])

    let updateAddress = (e) => {
        setAddress({
            ...address,
            [e.target.name] : e.target.value
        })
    }


    let submitUpdateAddress = (e) => {
        e.preventDefault();
        // dispatch action
        dispatch(updateUserAddress(address))
        setEnable(false);


    }






    return(
        <React.Fragment>
           <section className="bg-info">
               <div className="container ">
                   <div className="row">
                       <div className="col">
                           <h3><i className="fa fa-user-circle"/> Your Profile </h3>
                       </div>
                   </div>
               </div>
           </section>
            {
                loading ? <Spinner/> :
                    <React.Fragment>
                        {
                            Object.keys(userInfo).length > 0 &&
                            <section>
                                <div className="container mt-5">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <img src="https://media.gettyimages.com/photos/mark-mccormack-a-sports-promoter-and-agent-whose-company-img-many-picture-id2004933?k=20&m=2004933&s=612x612&w=0&h=8icNEBvFWjPPA_QSuQXSoogAylfjvdA3O0us_WNh_hw=" className="img-fluid  rounded-circle profile-img" alt=""/>
                                        </div>
                                        <div className="col-md-9">
                                            <div className="card">
                                                <div className="card-header bg-dark text-info">
                                                    <p className="h4">Your information</p>
                                                </div>
                                                <div className="card-body bg-info">
                                                    <ul className="list-group">
                                                        <li className="list-group-item">
                                                            NAME : <span className='font-weight-bold'>{userInfo.name}</span>
                                                        </li>
                                                        <li className="list-group-item">
                                                            Email : <span className='font-weight-bold'>{userInfo.email}</span>
                                                        </li>

                                                    </ul>
                                                </div>
                                            </div>



                                            <div className="card mt-3">
                                                <div className="card-header bg-dark text-info ">
                                                    <p className="h4">Billing Address
                                                        <div className="custom-control custom-switch  float-right ">
                                                            <input

                                                                onChange={e => setEnable(e.target.checked)}
                                                                type="checkbox" className="custom-control-input " id="customSwitch1"/>
                                                            <label className="custom-control-label" htmlFor="customSwitch1">Edit</label>
                                                        </div>
                                                    </p>
                                                </div>
                                                {
                                                    userInfo.address && !enable ?
                                                        <React.Fragment>
                                                            <div className="card-body bg-info mt-3">
                                                                <ul className="list-group">
                                                                    <li className="list-group-item">
                                                                        Flat : {userInfo.address.flat}
                                                                    </li>
                                                                    <li className="list-group-item">
                                                                        Street : {userInfo.address.street}
                                                                    </li>
                                                                    <li className="list-group-item">
                                                                        Landmark : {userInfo.address.landmark}
                                                                    </li>

                                                                    <li className="list-group-item">
                                                                        City : {userInfo.address.city}
                                                                    </li>

                                                                    <li className="list-group-item">
                                                                        Pin : {userInfo.address.pin}
                                                                    </li>
                                                                    <li className="list-group-item">
                                                                        State : {userInfo.address.state}
                                                                    </li>
                                                                    <li className="list-group-item">
                                                                        Mobile : {userInfo.address.mobile}
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </React.Fragment> :

                                                        <React.Fragment>
                                                            <form onSubmit={submitUpdateAddress} className="mt-3">
                                                                <div className="col-auto">

                                                                    <div className="input-group  mb-2">
                                                                        <div className="input-group-prepend">
                                                                            <div className="input-group-text bg-dark text-white">Flat</div>
                                                                        </div>
                                                                        <input
                                                                            name="flat"
                                                                            value={address.flat}
                                                                            onChange={updateAddress}

                                                                            type="text" className="form-control"
                                                                            id="inlineFormInputGroup" />
                                                                    </div>

                                                                    <div className="input-group  mb-2">
                                                                        <div className="input-group-prepend">
                                                                            <div className="input-group-text bg-dark text-white">Street</div>
                                                                        </div>
                                                                        <input
                                                                            name="street"
                                                                            value={address.street}
                                                                            onChange={updateAddress}
                                                                            type="text" className="form-control"
                                                                            id="inlineFormInputGroup" />
                                                                    </div>

                                                                    <div className="input-group  mb-2">
                                                                        <div className="input-group-prepend">
                                                                            <div className="input-group-text bg-dark text-white">Landmark</div>
                                                                        </div>
                                                                        <input
                                                                            name="landmark"
                                                                            value={address.landmark}
                                                                            onChange={updateAddress}
                                                                            type="text" className="form-control"
                                                                            id="inlineFormInputGroup" />
                                                                    </div>

                                                                    <div className="input-group  mb-2">
                                                                        <div className="input-group-prepend">
                                                                            <div className="input-group-text bg-dark text-white">City</div>
                                                                        </div>
                                                                        <input
                                                                            name="city"
                                                                            value={address.city}
                                                                            onChange={updateAddress}
                                                                            type="text" className="form-control"
                                                                            id="inlineFormInputGroup" />
                                                                    </div>

                                                                    <div className="input-group  mb-2">
                                                                        <div className="input-group-prepend">
                                                                            <div className="input-group-text bg-dark text-white">Pin</div>
                                                                        </div>
                                                                        <input
                                                                            name="pin"
                                                                            value={address.pin}
                                                                            onChange={updateAddress}
                                                                            type="number" className="form-control"
                                                                            id="inlineFormInputGroup" />
                                                                    </div>

                                                                    <div className="input-group  mb-2">
                                                                        <div className="input-group-prepend">
                                                                            <div className="input-group-text bg-dark text-white">State</div>
                                                                        </div>
                                                                        <input
                                                                            name="state"
                                                                            value={address.state}
                                                                            onChange={updateAddress}
                                                                            type="text" className="form-control"
                                                                            id="inlineFormInputGroup" />
                                                                    </div>

                                                                    <div className="input-group  mb-2">
                                                                        <div className="input-group-prepend">
                                                                            <div className="input-group-text bg-dark text-white">Mobile</div>
                                                                        </div>
                                                                        <input
                                                                            name="mobile"
                                                                            value={address.mobile}
                                                                            onChange={updateAddress}
                                                                            type="number" className="form-control"
                                                                            id="inlineFormInputGroup" />
                                                                    </div>

                                                                    <div>
                                                                        <input type="submit" className=" btn btn-danger btn-sm text-white f"
                                                                               value="Update" />
                                                                    </div>
                                                                </div>


                                                            </form>
                                                        </React.Fragment>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        }
                    </React.Fragment>
            }
        </React.Fragment>
    )
};

export default UserProfile;