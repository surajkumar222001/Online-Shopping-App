import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import * as uploadAction from  '../../redux/products/upload.action'



let UploadProduct = () => {

    let dispatch = useDispatch();
    let navigate = useNavigate();

    // submit product from

    let clickSubmit = (e) => {
        e.preventDefault();
        dispatch(uploadAction.uploadProductAction(product,navigate));

    }



    let [product , setProduct] = useState({
        name : '',
        brand : '',
        price : '' ,
        qty : '',
        image : '',
        category : '',
        description : '',
        usage : ''
    });
    let createProduct = (event) =>{
        setProduct({
            ...product,
            [event.target.name] : event.target.value
        })
    };

    let updateImage = async (event) => {
        let imageFile = event.target.files[0];
        let base64Image = await convertBase64String(imageFile)
        setProduct({
            ...product ,
            image : base64Image

        })
    };

    let convertBase64String = (imageFile) => {
        return new Promise((resolve , reject) => {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.addEventListener('load' , () => {
                if (fileReader.result){
                    resolve(fileReader.result);
                }
                else
                {
                    reject('Error Occurred')
                }
            })
        })
    };









    return(
        <React.Fragment>
            <section className="bg-info text-dark p-3">
                <div className="container">

                    <div className="row">
                        <div className="col">
                            <h4> <i className="fa fa-file-upload"/>Upload Product</h4>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-3">
                {/*<pre>{JSON.stringify(product)}</pre>*/}
                <div className="container ">
                    <div className="row">
                        <div className="col-md-8">
                            <form action="" onSubmit={clickSubmit}>
                                <div className="form-group">
                                    <input
                                        name="name"
                                        onChange={createProduct}
                                        value={product.name}
                                        type="text" className="form-control" placeholder="Name" required/>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Upload</span>
                                    </div>
                                    <div className="custom-file">
                                        <input
                                            name="files"
                                            onChange={updateImage}
                                            type="file" className="form-control" id="inputGroupFile01" required/>
                                            <label className="custom-file-label" htmlFor="inputGroupFile01">Choose
                                                file</label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <select className="form-control" required
                                            name="category"
                                            onChange={createProduct}
                                            value={product.category}>

                                        <option value="">Select Category</option>
                                        <option value="MEN">Men's Wear</option>
                                        <option value="WOMEN">Women's Wear</option>
                                        <option value="KIDS">Kid's Wear</option>

                                    </select>
                                </div>



                                <div className="form-group">
                                    <input
                                        name="brand"
                                        onChange={createProduct}
                                        value={product.brand}
                                        type="text" className="form-control" placeholder="Brand" required/>
                                </div>

                                <div className="form-group">
                                    <input
                                        name="price"
                                        onChange={createProduct}
                                        value={product.price}

                                        type="number" className="form-control" placeholder="Price" required/>
                                </div>

                                <div className="form-group">
                                    <input
                                        name="qty"
                                        onChange={createProduct}
                                        value={product.qty}

                                         type="number" className="form-control" placeholder="Qty" required/>
                                </div>

                                <div className="form-group">
                                    <textarea
                                        name="description"
                                        onChange={createProduct}
                                        value={product.description}

                                     rows="2" className="form-control" placeholder="Description" required/>
                                </div>

                                <div className="form-group">
                                    <textarea
                                        name="usage"
                                        onChange={createProduct}
                                        value={product.usage}

                                     rows="2" className="form-control" placeholder="Usage" required/>
                                </div>



                                <div>
                                    <input type="submit" className="btn btn-teal btn-sm" value="Upload"/>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};

export default UploadProduct;