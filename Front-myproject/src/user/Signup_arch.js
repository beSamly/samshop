import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Loader from "../core/Loader";
import { signup,  isAuthenticated } from '../auth/index'
import signupcss from '../css/signup.scss';

const Signup = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(e.target)
    }

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        errorMessage: "",
        error: false,
        success: false,
        loading: false,
    });

    const { name, email, password, success, error, loading, errorMessage } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const showErrorMessage = () => {
        if (error) {
            return (
                <div class="signup-error-message">
                    Email is already taken.
                </div>
            )
        }
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            if (ValidateEmail(email)) {
                clickSubmit(e)
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

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: true, errorMessage: data.error, success: false, loading: false });
            } else {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    error: false,
                    success: true,
                    loading: false
                });
            }
        });
    };

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showSuccess = () => (
        <div
            className="alert alert-info "
            style={{ display: success ? "" : "none" }}
        >
            New account is created. Please <a href="#" class="blue-text ml-1" data-dismiss="modal" aria-label="Close" style={{ fontSize: 14, fontWeight: 0 }} data-toggle="modal" data-target="#elegantModalForm">
                Sign In</a>
        </div>
    );

    return !isAuthenticated() && (
        <div className="signup-cont">
            <Loader loading={loading} />
            <form onSubmit={clickSubmit} onKeyPress={handleEnter}>
                <div class="modal fade" id="elegantModalForm-signup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content form-elegant">
                            <div class="modal-header text-center">
                                <h3 class="modal-title w-100 dark-grey-text font-weight-bold my-3" id="myModalLabel"><strong>Sign up</strong></h3>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body mx-4">
                                {showErrorMessage()}

                                <div class="md-form mb-3">
                                    <input type="text" id="Form-name" class="form-control " onChange={handleChange('name')} />
                                    <label data-error="wrong" data-success="right" for="Form-email1" >Your name</label>
                                </div>
                                <div class="md-form mb-3">
                                    <input type="email" id="Form-email1" class="form-control validte" onChange={handleChange('email')} />
                                    <label data-error="wrong" data-success="right" for="Form-email1">Your email</label>
                                </div>

                                <div class="md-form pb-3">
                                    <input type="password" id="Form-pass1" class="form-control " onChange={handleChange('password')} />
                                    <label data-error="wrong" data-success="right" for="Form-pass1">Your password</label>
                                    <p class="font-small blue-text d-flex justify-content-end">Forgot <a href="#" class="blue-text ml-1">
                                        Password?</a></p>
                                </div>

                                <div class="text-center mb-3">
                                    <button type="button" type="submit" class="btn blue-gradient btn-block btn-rounded z-depth-1a">Sign up</button>
                                </div>
                            </div>
                            <div class="modal-footer mx-5 pt-3 mb-1">
                                <p class="font-small grey-text d-flex justify-content-end">Already have account? <a href="#" class="blue-text ml-1" data-dismiss="modal" aria-label="Close" style={{ fontSize: 14, fontWeight: 0 }} data-toggle="modal" data-target="#elegantModalForm">
                                    Sign In</a></p>
                            </div>
                            {showError()}
                            {showSuccess()}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signup