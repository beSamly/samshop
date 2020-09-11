import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import { login, authenticate } from '../API/userAPI'
import { signin, authenticate, isAuthenticated } from '../../auth/index'

// import Loader from './Loader'
import './SignIn.scss'
import queryString from 'query-string';

const SignIn = ({ history, visible, flipVisibility, closeForm }) => {
    var jwt = JSON.parse(localStorage.getItem("jwt"));
    if (jwt && jwt.token) {
        // history.push('/dashboard/')
    }

    const [values, setValues] = useState({
        email: "",
        password: "",
        errors: [],
        loading: false,
    })
    const { email, password, loading, errors } = values;

    useEffect(() => {

    }, [])

    const handleChange = name => event => {
        setValues({ ...values, errors: [], [name]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        signin({ email, password }).then(
            data => {
                if (data.error) {
                    setValues({ ...values, error: true, errorMessage: data.error })
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

    const ValidateEmail = (mail) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            if (ValidateEmail(email)) {
                handleSubmit(e)
            } else {
                setValues({ ...values, error: true })
            }
        }
    }

    const isFilled = (option) => {
        if (values[option] !== '') {
            return 'label label-active'
        } else {
            return 'label'
        }
    }

    const showErrors = () => {
        var firstIndex = errors[0]
        var errorMessage = ""
        console.log()
        if (firstIndex.email) {
            errorMessage = firstIndex.email
            console.log("1")

        } else if (firstIndex.password) {
            errorMessage = firstIndex.password
            console.log("2")

        } else if (firstIndex.username) {
            errorMessage = firstIndex.username
            console.log("3")

        }
        console.log("what is errormeeage : ", errorMessage)
        return errorMessage
    }


    const showForm = () => {
        return (
            <form onKeyDown={handleEnter} className={`signin-form `}>
                <div className="close-btn " onClick={closeForm}>x</div>
                <div class="signin-header">
                    <div class="row justify-content-center ">
                        <img src={require('./img/user.png')} className="user-icon" />
                    </div>
                    <div className="">Sign in</div>
                </div>
                <div class="signin-body">
                    <div class="my-form ">
                        <input type="email" class="my-form-input" onChange={handleChange('email')} />
                        <label data-error="wrong" className={isFilled("email")} for="Form-email1">Your email</label>
                    </div>

                    <div class="my-form ">
                        <input type="password" class="my-form-input " onChange={handleChange('password')} />
                        <label className={isFilled("password")} data-error="wrong" for="Form-pass1">Your password</label>
                    </div>
                    {errors.length > 0 && (<div className="position-absolute showError ">{showErrors()}</div>)}
                    <div className="row JCC">
                        <div type="button" class="btn signin-button" onClick={handleSubmit}>Sign in</div>
                    </div>
                </div>
                <div className="signin-footer">
                    <div className="text-center no-have-account">
                        Have not had account yet?
                    </div>
                    <div className="text-center sign-up-link pointer" onClick={flipVisibility}>
                        Sign up
                    </div>
                </div>
            </form>
        )
    }

    return visible === 0 && (
        <div className={`signin-container `}>
            {showForm()}
        </div>
    )
}

export default SignIn