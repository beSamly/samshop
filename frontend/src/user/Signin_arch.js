import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect,withRouter } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from '../auth/index'
import Loader from "../core/Loader";
import signupcss from '../css/signup.scss';

const { user } = isAuthenticated()
const Signin = ({history}) => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: false,
        loading: false,
    })

    const { email, password, loading, error } = values;

    useEffect(() => {

    }, [])

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            if (ValidateEmail(email)) {
                handleSubmit(e)
            } else {
                setValues({ ...values, error: true })
            }
        }
    }

    const ValidateEmail = (mail) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }

  


    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        signin({ email, password }).then(
            data => {
                if (data.error) {
                    setValues({ ...values, error: true, errorMessage:data.error })
                }
                else {

                    authenticate(data, () => {
                        setValues({
                            ...values,
                            error: false,
                        });
                        // history.push('/')
                        window.location.reload()
                    });
                }
            })
    }

    const showError = () => {
        if (error) {
            return <div className="position-absolute showError">please check your email and password</div>
        }
    }

    const showForm = () => {
        return (
            <div className="signin-cont">
                <Loader loading={loading} />

                <div class="modal fade" onKeyPress={handleEnter} id="elegantModalForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                    aria-hidden="true">

                    <div class="modal-dialog" role="document">
                        <div class="modal-content form-elegant">
                            <div class="modal-header text-center">
                                <h3 class="modal-title w-100 dark-grey-text font-weight-bold my-3" id="myModalLabel" ><strong>Sign in</strong></h3>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body mx-4">
                                <div class="md-form mb-5">
                                    <input type="email" id="Form-email1" class="form-control " onChange={handleChange('email')} />
                                    <label data-error="wrong" for="Form-email1">Your email</label>
                                    {showError()}
                                </div>

                                <div class="md-form pb-3">
                                    <input type="password" id="Form-pass1" class="form-control " onChange={handleChange('password')} />
                                    <label data-error="wrong" for="Form-pass1">Your password</label>
                                    <p class="font-small blue-text d-flex justify-content-end">Forgot <a href="#" class="blue-text ml-1">
                                        Password?</a></p>
                                </div>

                                <div class="text-center mb-3">
                                    <button type="button" class="btn blue-gradient btn-block btn-rounded z-depth-1a" onClick={handleSubmit}>Sign in</button>
                                </div>
                                <p class="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2"> or Sign in
          with:</p>

                                <div class="row my-3 d-flex justify-content-center">
                                    <button type="button" class="btn btn-white btn-rounded mr-md-3 z-depth-1a"><i class="fab fa-facebook-f text-center"></i></button>
                                    <button type="button" class="btn btn-white btn-rounded mr-md-3 z-depth-1a"><i class="fab fa-twitter"></i></button>
                                    <button type="button" class="btn btn-white btn-rounded z-depth-1a"><i class="fab fa-google-plus-g"></i></button>
                                </div>
                            </div>
                            <div class="modal-footer mx-5 pt-3 mb-1">
                                <p class="font-small grey-text d-flex justify-content-end">Not a member? <a href="#" class="blue-text ml-1 signup-link close" data-dismiss="modal" aria-label="Close" style={{ fontSize: 14, fontWeight: 0 }} data-toggle="modal" data-target="#elegantModalForm-signup">
                                    Sign Up</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {showForm()}
            {/* {redirectUser()} */}
        </div>
    )
}

export default withRouter(Signin)